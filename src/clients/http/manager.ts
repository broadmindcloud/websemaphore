import { LogLevel } from "../../types";
import { WebSemaphoreApiUrl } from "../shared";
import { Api, ErrorResponse, UserReadResponse } from "./api";

export class WebsemaphoreHttpClient extends Api<{ token: string }> { }

// const baseUrl = newlifeBaseUrl; //"https://api-eu-sit.newlife.io/creator";

export const WebSemaphoreHttpClientManager = (params?: {  baseUrl?: string, token?: string, logLevel?: LogLevel, fetch?: any }) => {
  let client: WebsemaphoreHttpClient;
  let _token = params?.token || "";

  const log = (...args: any) => {
    if(params?.logLevel)
      console.log("WebSemaphoreHttpClientManager", ...args)
  }

  const initialize = (params?: { baseUrl?: string, fetch?: any, token?: string }) => {
    let { baseUrl, fetch: customFetch } = params || {};
    baseUrl = baseUrl ? (WebSemaphoreApiUrl(baseUrl) || baseUrl) : (WebSemaphoreApiUrl("prod") as string);//baseUrl || "prod";

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

    if(params?.token)
      client.setSecurityData({ token: params.token })

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

