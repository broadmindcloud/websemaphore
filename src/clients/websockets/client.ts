import EventEmitter from "eventemitter3";
import { AcquireResponse, LockRequestStatus, JobActionParams, AcquireParams, CacheItem, LogLevel } from "../../types";
import { DelayedPromise } from "../../utils";
import { WebSemaphoreWebsocketsTransportClient } from "./transport";

type WsJobActions<T> = {
  release: (p: JobActionParams) => Promise<void>;
  requeue: (p: JobActionParams) => void;
  reschedule: (p: JobActionParams) => void;
  cancel: (p: JobActionParams) => void;
  archive: (p: JobActionParams) => void;
  delete: (p: JobActionParams) => void;
}

type WsAcquireResponse<T> = {
  status: LockRequestStatus;
  payload: T;
  jobCrn: string;
} & WsJobActions<T>;

type ApiConstructorParams = { wsClient: WebSemaphoreWebsocketsTransportClient, logLevel?: LogLevel };

export class WebSemaphoreWebsocketsClient extends EventEmitter {
  private wsClient: WebSemaphoreWebsocketsTransportClient;
  private cache: {
    inFlight: Record<string, CacheItem>;
    history: string[];
  };
  public logLevel: LogLevel = "";

  constructor(opts: ApiConstructorParams) {
    super();

    this.wsClient = opts.wsClient;
    this.logLevel = opts.logLevel || this.logLevel;
    // this.ws = opts?.ws || (typeof globalThis !== "undefined" ? (globalThis as any).WebSocket : null);

    if (!this.wsClient) {
      throw new Error("No websockets implementation available. If using in nodejs try `npm i ws` or equivalent");
    }

    this.cache = {
      inFlight: {},
      history: [],
    };

    this.wsClient.addListener("message", (ev: any) => {
      this.emit("message", ev.data);
      this._processIncoming(ev.data);
    });
  }


  acquire<T>({ semaphoreId, channelId, sync, body }: AcquireParams) {
    // this.asssertIsConnected();

    let counter = 0;

    const messageId = Date.now().toString() + "-" + counter++;

    this.wsClient.send({
      action: sync ? "lock.acquireSync" : "lock.acquire",
      payload: JSON.stringify({
        id: messageId,
        body: body || "{}",
      }),
      semaphoreId,
      channelId,
    });

    const promise = DelayedPromise<WsAcquireResponse<T>>();
    this.cache.inFlight[messageId] = {
      promise,
      status: "waiting",
      release: () => {
        throw new Error("Cannot call release before the lock is acquired or rejected");
      },
    };

    return promise.then((res: WsAcquireResponse<T>) => ({
      status: res.status,
      payload: res.payload,
      jobCrn: res.jobCrn,
      release: () => {
        return this.release({ jobCrn: res.jobCrn })
      },
    }));
  }

  private log(...args: any) {
    if (this.logLevel)
      console.log("WebSemaphoreWebsocketsClient", ...args);
  }

  private _processIncoming(msg: string) {
    // this.log("Got a message from WebSemaphore", msg);
    const o = JSON.parse(msg) as AcquireResponse;
    const event = o.event;
    // console.log(event);

    if (o.type === "lock" && (event == "acquired")) {
      const cached = this.cache.inFlight[o.payload.id];
      cached.promise.resolve({
        ...cached,
        status: o.event as LockRequestStatus,
        payload: o.payload,
        jobCrn: o.jobCrn
      });
    }
  }

  private jobAction<T>({ jobCrn, action }: JobActionParams & { action: string }) {
    const isGenerative = ["requeue", "reschedule", "acquire"].includes(action);

    let counter = 0;

    const messageId = Date.now().toString() + "-" + counter++;

    this.wsClient.send({
      action: `lock.${action}`,
      jobCrn
    });

    const promise = DelayedPromise<WsAcquireResponse<T>>();
    this.cache.inFlight[messageId] = {
      promise,
      status: "waiting",
      release: () => {
        throw new Error("Cannot call release before the lock is acquired or rejected");
      },
    };

    if(!isGenerative)
      return Promise.resolve({
        promise: promise.resolve(),
        status: `${action}ed`,
        jobCrn,
        payload: "",
        release: () => Promise.resolve()
      });

    return promise.then((res: WsAcquireResponse<T>) => ({
      status: res.status,
      payload: res.payload,
      jobCrn: res.jobCrn,
      release: () => this.release({ jobCrn: res.jobCrn })
    }));

    // this.log(`Job action: ${action}...`, jobCrn)

    // delete this.cache.inFlight[jobCrn];
    // this.cache.history.push(jobCrn);
  }

  release({ jobCrn }: { jobCrn: string }) : Promise<any> {
    // this.asssertIsConnected();

    // this.wsClient.send({
    //   action: "lock.release",
    //   jobCrn
    // });

    // this.log("Releasing...", jobCrn)

    const p = this.jobAction({ jobCrn, action: "release" })

    delete this.cache.inFlight[jobCrn];
    this.cache.history.push(jobCrn);

    return p;
  }

  requeue     ({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "requeue"    }); }
  reschedule  ({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "reschedule" }); }
  cancel      ({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "cancel"     }); }
  archive     ({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "archive"    }); }
  delete      ({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "delete"     }); }

  client() {
    return this.wsClient;
  }

  setClient(client: WebSemaphoreWebsocketsTransportClient) {
    this.wsClient = client;
  }

  getCache() {
    return this.cache;
  }
}

export default WebSemaphoreWebsocketsClient;
