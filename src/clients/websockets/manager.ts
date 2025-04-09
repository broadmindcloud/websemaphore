import { WebSemaphoreWebsocketsTransportClient } from "./transport";
import { WebSemaphoreWebsocketsClient } from "./client";
import { DelayedPromise } from "../../utils";
import { WebSocketImplementation, LogLevel } from "../../types";

type ClientManagerParams = { websockets?: WebSocketImplementation, logLevel?: LogLevel, baseUrl?: string };

export class WebsocketsClientManager {
    private _wsClient: WebSemaphoreWebsocketsTransportClient;
    private _client: WebSemaphoreWebsocketsClient;
    opts: ClientManagerParams;

    constructor(opts: ClientManagerParams) {
        const wsImpl: WebSocketImplementation = opts?.websockets ? opts.websockets : (globalThis as any).WebSocket;
        this.opts = opts;

        this._wsClient = new WebSemaphoreWebsocketsTransportClient(
            (wsServer: string, token: string) => `${wsServer}?token=${encodeURIComponent(token)}`,
            { websockets: wsImpl, logLevel: opts?.logLevel, url: opts?.baseUrl }
        );

        this._client = new WebSemaphoreWebsocketsClient({ wsClient: this.wsClient, logLevel: opts?.logLevel });
    }

    async connect(token: string): Promise<WebSemaphoreWebsocketsClient> {
        if (!token || !token.replace(/^ApiKey./, ""))
            throw new Error("Couldn't connect (did you pass a token?)");

        const connectPromise = DelayedPromise<WebSemaphoreWebsocketsClient>();

        await this.wsClient.toggle(token);

        if (!this.wsClient.socket)
            throw new Error("Websocket was not created, the provided implementation might be incompatible.");

        this.wsClient.socket.addEventListener &&
            this.wsClient.socket
                .addEventListener("error", (ev: any) => {
                    this.opts?.logLevel && console.log("Couldn't connect, aborted...", ev);
                    connectPromise.reject(ev);
                });

        this.wsClient.socket
            .addEventListener("open", (ev: any) => {
                this.opts?.logLevel && console.log("Connected...");
                connectPromise.resolve(this.client);
            });

        return connectPromise;
    }

    disconnect(): Promise<void> {
        return this.wsClient.toggle();
    }

    get wsClient(): WebSemaphoreWebsocketsTransportClient {
        return this._wsClient;
    }

    get client(): WebSemaphoreWebsocketsClient {
        return this._client;
    }
}

const WebSemaphoreWebsocketsClientManager = (opts: ClientManagerParams) => {
    return new WebsocketsClientManager(opts);
};
export { WebSemaphoreWebsocketsClientManager };


// export const WebSemaphoreWebsocketsClientManager: WebSemaphoreClientManager =
//     (opts) => {
//         const wsImpl: WebSocketImplementation = opts?.websockets ? opts.websockets : (globalThis as any).WebSocket;

//         const wsClient = new WebSemaphoreWebsocketsTransportClient(
//             (wsServer: string, token: string) => `${wsServer}?token=${encodeURIComponent(token)}`,
//             { websockets: wsImpl, logLevel: opts?.logLevel, url: opts?.baseUrl }
//         );

//         let chainstreamWebsocketsClient = new WebSemaphoreWebsocketsClient({ wsClient: wsClient, logLevel: opts?.logLevel })

//         const connect = async (token: string) => {
//             if (!token || !token.replace(/^ApiKey./, ""))
//                 throw new Error("Couln't connect (did you pass a token?)");

//             const connectPromise = DelayedPromise<WebSemaphoreWebsocketsClient>();

//             await wsClient.toggle(token);

//             if (!wsClient.socket)
//                 throw new Error("Websocket was not created, the provided implementation might be incompatible.")

//             wsClient.socket.addEventListener &&
//                 wsClient.socket
//                     .addEventListener("error", (ev: any) => {
//                         // debugger;
//                         opts?.logLevel && console.log("Couldn't connect, aborted...", ev);
//                         // chainstreamWebsocketsClient.setClient(chainstreamWebsocketsClient);
//                         connectPromise.reject(ev)
//                     });
//             wsClient.socket
//                 .addEventListener("open", (ev: any) => {
//                     opts?.logLevel && console.log("Connected...");
//                     // chainstreamWebsocketsClient.setClient(chainstreamWebsocketsClient);
//                     connectPromise.resolve(chainstreamWebsocketsClient)
//                 });

//             return connectPromise;
//         }

//         const disconnect = () => {
//             return wsClient.toggle();
//         }

//         return {
//             connect,
//             disconnect,
//             wsClient,
//             client: chainstreamWebsocketsClient
//         }

//     }