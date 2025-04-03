import { EventEmitter } from "eventemitter3";
import { LogLevel, UpdateClientConfig, WebSocketImplementation } from "../../types";
import { DelayedPromise } from "../../utils";
import { WebSemaphoreWebsocketsUrl } from "../shared";
// impoer { WebSocket}


export class WebSemaphoreWebsocketsTransportClient extends EventEmitter {
    socket: WebSocket | null;
    private pingInterval?: ReturnType<typeof setInterval>;
    private pingCounter: number = 0;
    private outboundQueue: any[] = [];
    private token: string = "";
    private url: string = "";
    private noReconnect: boolean = false;
    private upd: UpdateClientConfig;
    private WSImplementation: WebSocketImplementation;
    public logLevel: LogLevel = "";

    constructor(
        upd: UpdateClientConfig,
        opts?: { websockets?: WebSocketImplementation, url?: string, env?: string, logLevel?: LogLevel }
    ) {
        super();

        const websockets = opts?.websockets ? opts.websockets : (globalThis as any).WebSocket;
        this.WSImplementation = websockets;

        // const env = opts?.env || "prod";

        this.url = opts?.url ? (WebSemaphoreWebsocketsUrl(opts?.url) || opts.url) : (WebSemaphoreWebsocketsUrl("prod") as string);

        this.socket = null; //new websockets();

        this.upd = upd;

        this.toggle = this.toggle.bind(this);
        this.send = this.send.bind(this);

        this.logLevel = this.logLevel

        if (!websockets) {
            throw new Error("No websockets implementation provided or available natively");
        }
    }

    private log(...args: any) {
        if (this.logLevel)
            console.log("WebSemaphoreWebsocketsTransportClient", ...args);
    }

    isConnected() {
        // debugger;
        this.log("Ready state: ", this.socket?.readyState);
        return this.socket && (this.socket.readyState === this.socket.OPEN);
    }

    private initPing(conn : any) {
        // console.log("Conn:", conn)
        this.pingInterval = setInterval(() => {
            this.socket?.send("ping");
            this.pingCounter++;
            this.log("ping, pingCounter == ", this.pingCounter);
        }, 10000);
    }

    private stopPing() {
        clearInterval(this.pingInterval);
    }

    private processPong(ev: any) {
        if (ev.data === "pong") {
            this.pingCounter--;
            this.log("pong, pingCounter == ", this.pingCounter, new Date().toISOString());
        }
    }

    private logError(error: any) {
        this.log(error);
    }

    private addEventListeners() {
        if (!this.socket)
            throw new Error("Socket is not available");

        this.boundListeners = [
            { name: "open", handler: this.initPing },
            { name: "open", handler: this.flush },

            { name: "close", handler: this.onClose },
            { name: "error", handler: this.logError },
            { name: "message", handler: this.processPong },
            { name: "message", handler: this.forwardEvents },
        ].map(l => ({ name: l.name, handler: l.handler.bind(this) }));

        this.boundListeners.forEach(l => this.socket?.addEventListener(l.name, l.handler))
    }

    boundListeners: { name: string, handler: EventListener }[] = [];

    private removeEventListeners() {
        if (!this.socket)
            throw new Error("Socket is not available");

        this.boundListeners.forEach(l =>
            this.socket?.removeEventListener(l.name, l.handler)
        )

        this.noReconnect = true;
    }

    private forwardEvents(ev: any) {
        if (ev.data === "pong") {
            return;
        }
        this.emit("message", ev);
    }

    private onClose() {
        this.stopPing();
        if (!this.noReconnect && this.token) {
            this.toggle(this.token);
        } else {
            this.removeEventListeners();
        }

        this.noReconnect = false;
    }

    public async toggle(token: string = "") {
        this.token = token;
        const url = this.upd(this.url, this.token);

        const togglingOff = !token;

        this.log("Websemaphore Websockets connection is toggling", togglingOff ? "off" : "on");


        if (this.url === url && token == this.token && this.socket?.readyState === this.socket?.OPEN) {
            return;
        }

        this.url = url;

        if(togglingOff)
            await this.flush()
        
        if (this.socket) {
            this.socket.close();
        } else {
            this.socket = new this.WSImplementation(this.url);
            this.addEventListeners();
        }

        return Promise.resolve();
    }

    send(msg: any) {
        this.log("Sending", msg)
        if (!this.isConnected()) {
            this.outboundQueue.unshift(msg);
            return;
        }

        if (typeof msg !== "string") {
            msg = JSON.stringify(msg);
        }

        this.socket?.send(msg);
    }

    async flush() {        
        const flushedPromise = DelayedPromise<void>();
        const sock = this.socket;

        let count = 0;

        const obq = this.outboundQueue || [];

        this.log("Flushing outbound queue has items:", obq.length);

        while(obq.length)
            this.send(obq.pop());

        const resolveWhenDone = () => {
            this.log("Flushing #", count++)
            if (!this.isConnected())
                return flushedPromise.resolve();

            const ba = sock?.bufferedAmount;
            if (ba) {
                this.log("Items in buffer #", count++)
                setTimeout(() => {
                    resolveWhenDone()
                }, 500);
            }
            else {
                this.log("ResolveWhenDone Done")
                flushedPromise.resolve();
            }
        }
        resolveWhenDone();

        return flushedPromise;
    }

    // Rest of your code...

}

export default WebSemaphoreWebsocketsTransportClient;
