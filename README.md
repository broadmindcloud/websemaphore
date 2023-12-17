### WebSemaphore client library for TypeScript/JavaScript

This is the official typescript/javacscript client library for [WebSemaphore](https://www.websemaphore.com). 
WebSemaphore aims to provide seamless process synchronization in highly distributed environments.

If you need to have control over concurrent/exclusive access to a resource, potentially across multiple systems, 
but would prefer to stay focused on your actual use case, WebSemaphore wants to be your friend.

Please see [WebSemaphore Docs](https://www.websemaphore.com/docs/v1) for more info.

For usage instructions, please see [Usage](https://www.websemaphore.com/docs/v1/usage) on the official website.

### Quick start - should take just a few minutes:

1. Get an account at [WebSemaphore Signup](https://www.websemaphore.com/auth/signup)
2. Create a semaphore and configure maximum concurrent thoughput (maxValue).
3. Create an Api Key
4. Install this library: `npm i --save websemaphore`
5. Use in code
    5.1 HTTP version 
    
        ```
        import fetch from "node-fetch";
        import fetch from "node-fetch";
        const chainstreamClient = chainstreamManager.initialize("fetch);

        const initHandler = (...) => {
            // ...
            const resp = await chainstreamClient.semaphore.acquire(SEMAPHORE_ID, msg as any);
            // ...
        }

        const processingHandler = (...) => {
            // ...
            // do work
            const resp = await chainstreamClient.semaphore.release(SEMAPHORE_ID);
            // ...
        }
        ```

    5.2 Websockets version:
        `` 


