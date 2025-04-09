import EventEmitter from "eventemitter3";
import { AcquireResponse, LockRequestStatus, JobActionParams, AcquireParams, CacheItem, LogLevel } from "../../types";
import { DelayedPromise } from "../../utils";
import { WebSemaphoreWebsocketsTransportClient } from "./transport";
import { SemaphoreJob } from "../../";

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
    historyIndex: Record<string, CacheItem>;
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
      historyIndex: {}
    };

    this.wsClient.addListener("message", (ev: any) => {
      this.emit("message", ev.data);
      this._processIncoming(ev.data);
    });
  }


  acquire<T>({ semaphoreId, channelId, sync, body }: AcquireParams) {
    // this.asssertIsConnected();

    let counter = 0;

    const id = Date.now().toString() + "-" + counter++;

    this.wsClient.send({
      action: sync ? "lock.acquireSync" : "lock.acquire",
      payload: JSON.stringify({
        id: id,
        body: body || "{}",
      }),
      semaphoreId,
      channelId
    });

    const promise = DelayedPromise<WsAcquireResponse<T>>();
    this.cache.inFlight[id] = {
      id,
      jobCrn: "",
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
      console.log("WebSemaphoreWebsocketsClient", new Date().toISOString(), ...args);
  }

  private _processIncoming(msg: string) {
    // this.log("Got a message from WebSemaphore", msg);
    const o = JSON.parse(msg) as AcquireResponse;
    const event = o.event;
    // this.log(event, o.payload ? "" : "no payload", o.jobCrn);

    if ((o.type === "lock" && (event == "acquired"))) {
      const cached = this.cache.inFlight[o.payload.id];
      this.cache.historyIndex[o.jobCrn] = cached;

      this.log("Acquired job ", o.jobCrn)
      this.log("Payload ", o.payload)
      this.log("Correlation id ", o.payload.id)

      if (!cached) {
        debugger;
        console.warn("Unexpected lock message", o);
        return;
        // process.exit();
      }

      cached.jobCrn = o.jobCrn;

      cached.promise.resolve({
        ...(cached || {}),
        status: o.event as LockRequestStatus,
        payload: o.payload,
        jobCrn: o.jobCrn
      });
    }
  }

  private jobAction<T>({ jobCrn, action }: JobActionParams & { action: string }) {
    const isGenerative = ["requeue", "reschedule", "acquire"].includes(action);
    // this.log(`+++ ${isGenerative ? "" : "Non-"}Generative job update: `, action)

    let counter = 0;


    this.wsClient.send({
      action: `lock.${action}`,
      jobCrn
    });

    const promise = DelayedPromise<WsAcquireResponse<T>>();

    // this.log({ action, jobCrn })

    if (!isGenerative) {
      return Promise.resolve({
        promise: promise.resolve(),
        status: `${action}ed`,
        jobCrn,
        payload: "",
        release: () => Promise.resolve()
      });
    }


    const isReschedule = action == "reschedule"; // this.cache.historyIndex[id]; // reschedule special since it keeps the crn, so 
    const isRequeue = action == "requeue"; // this.cache.historyIndex[id]; // reschedule special since it keeps the crn, so 

    if (isReschedule)
      debugger;

    const inFlightJobCrn = SemaphoreJob.fromCrn(jobCrn).clone("inflight").crn; // 
    const id = isReschedule || isRequeue ? // if a reschedule we recall it from local memory - temporary solution
      this.cache.historyIndex[`bycrn:${inFlightJobCrn}`]?.id : 
      Date.now().toString() + "-" + counter++; 

    this.log(`Caching job with id ${id}`)

    // if(!isReschedule)
    this.cache.inFlight[id] = {
      id,
      jobCrn: isReschedule ? inFlightJobCrn : "",
      promise,
      status: "waiting",
      release: () => {
        throw new Error("Cannot call release before the lock is acquired or rejected");
      }
    };

    this.log(`+++ End ${isGenerative ? "" : "Non-"}Generative job update: `, action)

    return promise.then((res: WsAcquireResponse<T>) => {
      this.log(`Acquired job by ${action}`, res.jobCrn)
      return ({
        status: res.status,
        payload: res.payload,
        jobCrn: res.jobCrn,
        release: () => this.release({ jobCrn: res.jobCrn })
      })
    });

    // this.log(`Job action: ${action}...`, jobCrn)

    // delete this.cache.inFlight[jobCrn];
    // this.cache.history.push(jobCrn);
  }

  release({ jobCrn }: { jobCrn: string }): Promise<any> {
    const p = this.jobAction({ jobCrn, action: "release" })

    debugger;

    const jobDataFromCacheByCrn = Object.values(this.cache.inFlight).find(j => j.jobCrn == jobCrn)!
    this.cache.historyIndex[`bycrn:${jobCrn}`] = this.cache.inFlight[jobDataFromCacheByCrn.id];
    this.cache.historyIndex[`byCorrelationId:${jobDataFromCacheByCrn.id}`] = this.cache.inFlight[jobDataFromCacheByCrn.id];
    delete this.cache.inFlight[jobDataFromCacheByCrn.id];
    this.cache.history.push(jobCrn);

    return p;
  }

  requeue({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "requeue" }); }
  reschedule({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "reschedule" }); }
  cancel({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "cancel" }); }
  archive({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "archive" }); }
  delete({ jobCrn }: JobActionParams) { return this.jobAction({ jobCrn, action: "delete" }); }

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
