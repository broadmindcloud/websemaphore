import { WebSemaphoreWebsocketsTransportClient } from "./transport";
import { WebSemaphoreWebsocketsClient } from "./client";
import { DelayedPromise } from "../../utils";
import { WebSocketImplementation, LogLevel } from "../../types";

export const WebSemaphoreWebsocketsClientManager = (opts?: { websockets?: WebSocketImplementation, logLevel?: LogLevel }) => {
    const wsImpl: WebSocketImplementation = opts?.websockets ? opts.websockets : (globalThis as any).WebSocket;
    const wsClient = new WebSemaphoreWebsocketsTransportClient(
        (wsServer: string, token: string) => `${wsServer}?token=${encodeURIComponent(token)}`,
        { websockets: wsImpl, logLevel: opts?.logLevel }
    );

    let chainstreamWebsocketsClient = new WebSemaphoreWebsocketsClient({ wsClient: wsClient, logLevel: opts?.logLevel })

    const connect = async (token: string) => {
        if (!token || !token.replace(/^ApiKey./, ""))
            throw new Error("Couln't connect (did you pass a token?)");

        const connectPromise = DelayedPromise<WebSemaphoreWebsocketsClient>();

        await wsClient.toggle(token);

        if (!wsClient.socket)
            throw new Error("Websocket was not created, the provided implementation might be incompatible.")

        wsClient.socket.addEventListener &&
            wsClient.socket
                .addEventListener("error", (ev: any) => {
                    // debugger;
                    opts?.logLevel && console.log("Couldn't connect, aborted...", ev);
                    // chainstreamWebsocketsClient.setClient(chainstreamWebsocketsClient);
                    connectPromise.reject(ev)
                });
        wsClient.socket
            .addEventListener("open", (ev: any) => {
                opts?.logLevel && console.log("Connected...");
                // chainstreamWebsocketsClient.setClient(chainstreamWebsocketsClient);
                connectPromise.resolve(chainstreamWebsocketsClient)
            });

        return connectPromise;
    }

    const disconnect = () => {
        return wsClient.toggle();
    }

    return {
        connect,
        disconnect,
        wsClient,
        client: chainstreamWebsocketsClient
    }

}