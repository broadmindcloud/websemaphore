import { SemaphoreJob, SemaphoreChannel, SemaphoreJobTimer } from "../../chainstream-domain-model/lib/semaphore";

export { SemaphoreJob, SemaphoreChannel, SemaphoreJobTimer };

// type SemaphoreChannel = { semaphoreId: string, channelId?: string };
export type AcquireParams = { semaphoreId: string, channelId?: string, body?: any, sync?: boolean }
export  type JobActionParams = { jobCrn: string };

export type AcquireResponse<T = any> = {
    type: string,
    event: string,
    jobCrn: string,
    job: SemaphoreJob
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