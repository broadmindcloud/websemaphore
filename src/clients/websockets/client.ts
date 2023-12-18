import { AcquireResponse, LockRequestStatus, ReleaseParams, AcquireParams, CacheItem, LogLevel } from "../../types";
import { DelayedPromise } from "../../utils";
import { WebSemaphoreWebsocketsTransportClient } from "./transport";

type WsAcquireResponse<T> = {
  status: LockRequestStatus;
  payload: T;
  release: (p: ReleaseParams) => void;
};

type ApiConstructorParams = { wsClient: WebSemaphoreWebsocketsTransportClient, logLevel?: LogLevel };

export class WebSemaphoreWebsocketsClient {
  private wsClient: WebSemaphoreWebsocketsTransportClient;
  private cache: {
    inFlight: Record<string, CacheItem>;
    history: string[];
  };
  public logLevel: LogLevel = "";

  constructor(opts: ApiConstructorParams) {
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
      release: () => this.release({ semaphoreId, channelId, messageId }),
    }));
  }

  private log(...args: any) {
    if (this.logLevel)
      console.log("WebSemaphoreWebsocketsClient", ...args);
  }

  private _processIncoming(msg: string) {
    this.log("Got a message from WebSemaphore", msg);
    const o = JSON.parse(msg) as AcquireResponse;
    const event = o.event;
    if (o.type === "lock" && (event == "acquired")) {
      const cached = this.cache.inFlight[o.payload.id];

      cached.promise.resolve({
        ...cached,
        status: o.event as LockRequestStatus,
        payload: o.payload,
      });
    }
  }

  release({ semaphoreId, channelId, messageId }: ReleaseParams) {
    // this.asssertIsConnected();

    this.wsClient.send({
      action: "lock.release",
      semaphoreId,
      channelId,
    });

    this.log("Releasing...")

    delete this.cache.inFlight[messageId];
    this.cache.history.push(messageId);
  }

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
