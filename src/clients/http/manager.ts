import { LogLevel } from "../../types";
import { Api, ErrorResponse, UserReadResponse } from "./api";

export class WebsemaphoreHttpClient extends Api<{ token: string }> { }

export const ChainstreamBaseUrls: Record<string, string> = {
  "dev": "https://api-eu-dev.websemaphore.com/v1",
  "prod": "https://api.websemaphore.com/v1",
};

// const baseUrl = newlifeBaseUrl; //"https://api-eu-sit.newlife.io/creator";

export const WebSemaphoreHttpClientManager = (params?: {  baseUrl?: string, token?: string, logLevel?: LogLevel, fetch?: any }) => {
  let client: WebsemaphoreHttpClient;
  let _token = params?.token || "";

  const log = (...args: any) => {
    if(params?.logLevel)
      console.log("WebSemaphoreHttpClientManager", ...args)
  }

  const initialize = (params?: { baseUrl?: string, fetch?: any }) => {
    let { baseUrl, fetch: customFetch } = params || {};
    baseUrl = baseUrl || "prod";
    if (ChainstreamBaseUrls[baseUrl])
      baseUrl = ChainstreamBaseUrls[baseUrl];

    log(baseUrl);

    client = new WebsemaphoreHttpClient({
      baseUrl,
      securityWorker: (securityData: { token: string } | null) => {
        return !securityData ? {} : { headers: { Authorization: securityData.token } };
      },
      customFetch: customFetch || ((...args: any[]) => {
        //@ts-ignore
        return fetch(...args)
      })
    });
    return client;
  };

  return {
    initialize,
    getCurrentToken() {
      return _token;
    },
    updateToken(token: string) {
      _token = token;
      client.setSecurityData({ token });
    },
    async authorize(): Promise<UserReadResponse> {
      try {
        const r = await client.user.current();
        log(`Logged in with ${r.data.id}`);

        return r.data;
      } catch (_ex) {
        const ex: { error: ErrorResponse } = _ex as any;
        throw ex;
      }
    },


  };
};

