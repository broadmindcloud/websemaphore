const API_KEY = "460a169e52a92dff1271ccf60581e01d"; // add a valid API key here

const TOKEN = `ApiKey ${API_KEY}`;

import { WebSemaphoreWebsocketsClientManager } from "../src/clients/websockets/manager";
import { WebSocket as WS } from "ws";
import { WebSocketImplementation } from "../src/types";

const manager = WebSemaphoreWebsocketsClientManager({ logLevel: "ALL", websockets: WS as any as WebSocketImplementation });

const process = async (payload: any) => {
    // do work
    console.log("Simulating a task for 3 seconds...")
    await new Promise((r) => setTimeout(r, 3000));
}
const main = async () => {
    debugger;

    console.log("connecting...")

    const client = await manager.connect(TOKEN);

    console.log("acquiring...")

    try {
        const { release, payload, status } = await client.acquire<{ id: string }>({ semaphoreId: "test" });

        if (status == "acquired") { // always true in async mode
            console.log("processing...");

            // do work
            await process(payload);
        } else {

        }

        console.log("releasing...");
            
        await release();

        await manager.disconnect();

        console.log("WebSemaphore over Websodckets test ok");

    } catch (e) {
        console.error((e as any).message);
    }
}

if(!API_KEY)
    console.log("To run the test please set a valid API key, see https://www.websemaphore.com/docs/v1/setup/key")
else
    main();