
type SemaphoreChannel = { semaphoreId: string, channelId?: string };
export type AcquireParams = SemaphoreChannel & { body?: any, sync?: boolean }
export  type ReleaseParams = SemaphoreChannel & { messageId: string };

export type AcquireResponse<T = any> = {
    type: string,
    event: string,
    payload: {
        id: string,
        body: T
    }
};

export type DelayedPromiseType<T = any> = 
    Promise<T> & { resolve: (val?: T) => void, reject: (val: Error) => void };
export type WebSemaphoreClientOpts = { ws?: any };


export type LockRequestStatus = "waiting" | "acquired" | "rejected";
export type CacheItem = {
    promise: DelayedPromiseType,
    status: LockRequestStatus,
    // processIncoming: <T>(msg) => void
    release: () => void
};

export type Callback = (val: any) => void;


// export type WSImplementation = WebSocket;

export type WebSocketImplementation = {
    new(...args: any[]): WebSocket;
};

export type UpdateClientConfig = (wsServer: string, token: string) => string;

export type LogLevel = "" | "ALL";