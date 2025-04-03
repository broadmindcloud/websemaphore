/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserUpdatePasswordNormal {
  new?: string;
  old?: string;
}

export interface UserUpdateRequest {
  /** @default "" */
  lastName?: string;
  /** @default "" */
  country?: string;
  /** @default "" */
  ticket?: string;
  ownerScopes?: string[];
  /** @default "" */
  firstName?: string;
  phone?: string;
  /** @default "" */
  permissions?: string;
  /** @default "" */
  organization?: string;
  organizations?: string[];
  id?: string;
  email?: string;
  /** @default "" */
  account?: string;
  /** @default "" */
  status?: string;
}

export interface UserCreateRequest {
  /** @default "" */
  lastName?: string;
  /** @default "" */
  country?: string;
  /** @default "" */
  ticket?: string;
  ownerScopes?: string[];
  /** @default "" */
  firstName?: string;
  password?: string;
  phone?: string;
  /** @default "" */
  permissions?: string;
  /** @default "" */
  organization?: string;
  organizations?: string[];
  id?: string;
  email?: string;
  /** @default "" */
  account?: string;
  /** @default "" */
  status?: string;
}

export interface UserReadResponse {
  /** @default "" */
  lastName?: string;
  /** @default "" */
  country?: string;
  /** @default "" */
  ticket?: string;
  ownerScopes?: string[];
  /** @default "" */
  firstName?: string;
  phone?: string;
  /** @default "" */
  permissions?: string;
  /** @default "" */
  organization?: string;
  organizations?: string[];
  id?: string;
  email?: string;
  /** @default "" */
  account?: string;
  /** @default "" */
  status?: string;
}

export interface SessionTokenResponse {
  jwt?: string;
}

export interface IdSessionTokenRequest {
  password: string;
  id: string;
}

export interface SemaphoreSyncLockResponse {
  semaphoreId: string;
  success?: boolean;
  channelId?: string;
}

export interface SemaphoreLockRequest {
  channelId?: string;
}

export interface PagedSemaphoreListReadResponse {
  Items?: {
    owner?: string;
    mapping?: {
      canOverrideRouting?: boolean;
      handler?: string;
      inputData?: string;
      maxExecutionTime?: number;
      language?: string;
      isActive?: boolean;
    };
    maxValue?: number;
    created?: string;
    title?: string;
    isActive?: boolean;
    timeout?: {
      value?: number;
      since?: string;
    };
    meta?: {
      jobCrnInjectionPoint?: string;
    };
    callback?: {
      protocol?: string;
      address?: string;
      method?: string;
      onDeliveryError?: string;
      isActive?: boolean;
    };
    id?: string;
    updated?: string;
    maxValueScope?: string;
    websockets?: {
      onClientDropped?: string;
      isActive?: boolean;
      allowContinuedSessions?: boolean;
    };
  }[];
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: string;
}

export interface SemaphoreUpsertRequest {
  owner?: string;
  mapping?: {
    canOverrideRouting?: boolean;
    handler?: string;
    inputData?: string;
    maxExecutionTime?: number;
    language?: string;
    isActive?: boolean;
  };
  maxValue?: number;
  created?: string;
  title?: string;
  isActive?: boolean;
  timeout?: {
    value?: number;
    since?: string;
  };
  meta?: {
    jobCrnInjectionPoint?: string;
  };
  callback?: {
    protocol?: string;
    address?: string;
    method?: string;
    onDeliveryError?: string;
    isActive?: boolean;
  };
  id?: string;
  updated?: string;
  maxValueScope?: string;
  websockets?: {
    onClientDropped?: string;
    isActive?: boolean;
    allowContinuedSessions?: boolean;
  };
}

export interface SemaphoreReadResponse {
  owner?: string;
  mapping?: {
    canOverrideRouting?: boolean;
    handler?: string;
    inputData?: string;
    maxExecutionTime?: number;
    language?: string;
    isActive?: boolean;
  };
  maxValue?: number;
  created?: string;
  title?: string;
  isActive?: boolean;
  timeout?: {
    value?: number;
    since?: string;
  };
  meta?: {
    jobCrnInjectionPoint?: string;
  };
  callback?: {
    protocol?: string;
    address?: string;
    method?: string;
    onDeliveryError?: string;
    isActive?: boolean;
  };
  id?: string;
  updated?: string;
  maxValueScope?: string;
  websockets?: {
    onClientDropped?: string;
    isActive?: boolean;
    allowContinuedSessions?: boolean;
  };
}

export interface PagedSemaphoreReadQueueResponse {
  Items?: {
    payload?: object;
    meta?: {
      routing?: {
        protocol?: string;
        url?: string;
        remoteId?: string;
      };
    };
    attributes?: {
      DeadLetterQueueSourceArn?: string;
      AWSTraceHeader?: string;
      ApproximateReceiveCount?: string;
      SentTimestamp?: string;
      SequenceNumber?: string;
      messageId?: string;
      MessageGroupId?: string;
      SenderId?: string;
      MessageDeduplicationId?: string;
      ApproximateFirstReceiveTimestamp?: string;
    };
  }[];
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: string;
}

export interface EmailUpsertResponse {
  /** @default false */
  success?: boolean;
}

export interface EmailUpsertRequest {
  /** @default "true" */
  reference?: string;
  /** @default "Default title" */
  name?: string;
  /** @default "" */
  email?: string;
}

export interface ApikeyPagedListOwnerKeysResponse {
  Items?: {
    owner?: string;
    maskKey?: string;
    /** @default "ref number" */
    reference?: string;
    lastUsed?: number;
    created?: string;
    totalUsed?: number;
    /** @default "Default title" */
    title?: string;
    /** @default true */
    isActive?: boolean;
    /** @default "0" */
    updated?: string;
    hash?: string;
  }[];
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: string;
}

export interface ApikeyUpsertResponse {
  /** @default false */
  success?: boolean;
  /** @default "" */
  key?: string;
}

export interface ApikeyUpsertRequest {
  /** @default "ref number" */
  reference?: string;
  /** @default "Default title" */
  title?: string;
  /** @default true */
  isActive?: boolean;
}

export interface OkResponse {
  ok?: boolean;
}

export interface ErrorResponse {
  errorMessage?: string;
  errorCode?: string;
  statusCode?: number;
}

export type AnyResponse = object;

export type GenerateMappingResponse = string;

export interface GenerateMappingRequest {
  output: string;
  data: string;
  context: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api-us-dev.websemaphore.com/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title websemaphore-openapi
 * @version 2025-02-03T14:06:40Z
 * @baseUrl https://api-us-dev.websemaphore.com/v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  advisor = {
    /**
     * No description
     *
     * @tags clientAlias#generateMapping
     * @name GenerateMapping
     * @summary upcoming...
     * @request POST:/advisor/generateMapping
     * @secure
     */
    generateMapping: (GenerateMappingRequest: GenerateMappingRequest, params: RequestParams = {}) =>
      this.request<GenerateMappingResponse, ErrorResponse>({
        path: `/advisor/generateMapping`,
        method: "POST",
        body: GenerateMappingRequest,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsAdvisor
     * @request OPTIONS:/advisor/generateMapping
     */
    optionsAdvisor: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/advisor/generateMapping`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),
  };
  apikey = {
    /**
     * No description
     *
     * @tags clientAlias#list
     * @name List
     * @summary List API client keys.
     * @request GET:/apikey/readKeys
     * @secure
     */
    list: (
      query?: {
        direction?: string;
        page?: string;
        orderBy?: string;
        startKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApikeyPagedListOwnerKeysResponse, ErrorResponse>({
        path: `/apikey/readKeys`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsApikey
     * @request OPTIONS:/apikey/readKeys
     */
    optionsApikey: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apikey/readKeys`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#upsert
     * @name Upsert
     * @summary Create an API client key
     * @request POST:/apikey/upsertKey
     * @secure
     */
    upsert: (ApikeyUpsertRequest: ApikeyUpsertRequest, params: RequestParams = {}) =>
      this.request<ApikeyUpsertResponse, ErrorResponse>({
        path: `/apikey/upsertKey`,
        method: "POST",
        body: ApikeyUpsertRequest,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsApikey2
     * @request OPTIONS:/apikey/upsertKey
     * @originalName optionsApikey
     * @duplicate
     */
    optionsApikey2: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apikey/upsertKey`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags clientAlias#getJWT
     * @name GetJwt
     * @summary upcoming...
     * @request POST:/auth/idGetToken
     */
    getJwt: (IdSessionTokenRequest: IdSessionTokenRequest, params: RequestParams = {}) =>
      this.request<SessionTokenResponse, ErrorResponse>({
        path: `/auth/idGetToken`,
        method: "POST",
        body: IdSessionTokenRequest,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsAuth
     * @request OPTIONS:/auth/idGetToken
     */
    optionsAuth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/idGetToken`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),
  };
  emails = {
    /**
     * No description
     *
     * @tags clientAlias#upsert
     * @name Upsert
     * @summary upcoming...
     * @request POST:/emails/upsertEmail
     */
    upsert: (EmailUpsertRequest: EmailUpsertRequest, params: RequestParams = {}) =>
      this.request<EmailUpsertResponse, ErrorResponse>({
        path: `/emails/upsertEmail`,
        method: "POST",
        body: EmailUpsertRequest,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsEmails
     * @request OPTIONS:/emails/upsertEmail
     */
    optionsEmails: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/emails/upsertEmail`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),
  };
  info = {
    /**
     * No description
     *
     * @name InfoList
     * @request GET:/info
     */
    infoList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/info`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsInfo
     * @request OPTIONS:/info
     */
    optionsInfo: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/info`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),
  };
  infoAuth = {
    /**
     * No description
     *
     * @name InfoAuthList
     * @request GET:/info-auth
     * @secure
     */
    infoAuthList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/info-auth`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsInfoAuth
     * @request OPTIONS:/info-auth
     */
    optionsInfoAuth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/info-auth`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),
  };
  pollNow = {
    /**
     * No description
     *
     * @name PollNowList
     * @request GET:/poll-now
     */
    pollNowList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/poll-now`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),
  };
  semaphore = {
    /**
     * No description
     *
     * @tags clientAlias#read, publicApi
     * @name Read
     * @summary Returns a semaphore's settings
     * @request GET:/semaphore
     * @secure
     */
    read: (
      query?: {
        consistent?: string;
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SemaphoreReadResponse, ErrorResponse>({
        path: `/semaphore`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#upsert, publicApi
     * @name Upsert
     * @summary Creates or updates a semaphore's settings. Omit the id in input to create a new semaphore.
     * @request POST:/semaphore
     * @secure
     */
    upsert: (SemaphoreUpsertRequest: SemaphoreUpsertRequest, params: RequestParams = {}) =>
      this.request<SemaphoreReadResponse, ErrorResponse>({
        path: `/semaphore`,
        method: "POST",
        body: SemaphoreUpsertRequest,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsSemaphore
     * @request OPTIONS:/semaphore
     */
    optionsSemaphore: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/semaphore`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#list, publicApi
     * @name List
     * @summary List semaphores. Use .startKey to page through results
     * @request GET:/semaphore/list
     * @secure
     */
    list: (
      query?: {
        pageSize?: string;
        startKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PagedSemaphoreListReadResponse, ErrorResponse>({
        path: `/semaphore/list`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsSemaphore2
     * @request OPTIONS:/semaphore/list
     * @originalName optionsSemaphore
     * @duplicate
     */
    optionsSemaphore2: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/semaphore/list`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
 * No description
 *
 * @tags clientAlias#acquire, publicApi
 * @name Acquire
 * @summary Asynchronously acquire a semaphore lock. 
            Returns an immediate confirmation. The message will be processed as soon 
            as possible and WebSemaphore will invoke the preconfigured processor 
            endpoint to continue the flow.
 * @request POST:/semaphore/{semaphoreId}/acquire
 * @secure
 */
    acquire: (semaphoreId: string, SemaphoreLockRequest: SemaphoreLockRequest, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/semaphore/${semaphoreId}/acquire`,
        method: "POST",
        body: SemaphoreLockRequest,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#acquireSync, publicApi
     * @name AcquireSync
     * @summary Synchronously acquire a semaphore lock. Immediately returns either an `acquired` or `rejected` status.
     * @request POST:/semaphore/{semaphoreId}/acquireSync
     * @secure
     */
    acquireSync: (semaphoreId: string, SemaphoreLockRequest: SemaphoreLockRequest, params: RequestParams = {}) =>
      this.request<SemaphoreSyncLockResponse, ErrorResponse>({
        path: `/semaphore/${semaphoreId}/acquireSync`,
        method: "POST",
        body: SemaphoreLockRequest,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsSemaphore3
     * @request OPTIONS:/semaphore/{semaphoreId}/acquireSync
     * @originalName optionsSemaphore
     * @duplicate
     */
    optionsSemaphore3: (semaphoreId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/semaphore/${semaphoreId}/acquireSync`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#activate, publicApi
     * @name Activate
     * @summary Activate a semaphore and attempt to start processing its backlog.
     * @request POST:/semaphore/{semaphoreId}/activate
     * @secure
     */
    activate: (semaphoreId: string, SemaphoreLockRequest: SemaphoreLockRequest, params: RequestParams = {}) =>
      this.request<OkResponse, ErrorResponse>({
        path: `/semaphore/${semaphoreId}/activate`,
        method: "POST",
        body: SemaphoreLockRequest,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsSemaphore4
     * @request OPTIONS:/semaphore/{semaphoreId}/activate
     * @originalName optionsSemaphore
     * @duplicate
     */
    optionsSemaphore4: (semaphoreId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/semaphore/${semaphoreId}/activate`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#purgeQueue, publicApi
     * @name PurgeQueue
     * @summary purge message queue
     * @request DELETE:/semaphore/{semaphoreId}/purge
     * @secure
     */
    purgeQueue: (semaphoreId: string, params: RequestParams = {}) =>
      this.request<OkResponse, ErrorResponse>({
        path: `/semaphore/${semaphoreId}/purge`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsSemaphore5
     * @request OPTIONS:/semaphore/{semaphoreId}/purge
     * @originalName optionsSemaphore
     * @duplicate
     */
    optionsSemaphore5: (semaphoreId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/semaphore/${semaphoreId}/purge`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#readQueue, publicApi
     * @name ReadQueue
     * @summary Returns a semaphore's queue contents
     * @request GET:/semaphore/{semaphoreId}/readQueue
     * @secure
     */
    readQueue: (
      semaphoreId: string,
      query?: {
        status?: string;
        limit?: string;
        pageSize?: string;
        startKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PagedSemaphoreReadQueueResponse, ErrorResponse>({
        path: `/semaphore/${semaphoreId}/readQueue`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsSemaphore6
     * @request OPTIONS:/semaphore/{semaphoreId}/readQueue
     * @originalName optionsSemaphore
     * @duplicate
     */
    optionsSemaphore6: (semaphoreId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/semaphore/${semaphoreId}/readQueue`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ReleaseCreateSemaphoreSemaphoreIdRelease
     * @request POST:/semaphore/{semaphoreId}/release
     * @secure
     */
    releaseCreateSemaphoreSemaphoreIdRelease: (semaphoreId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/semaphore/${semaphoreId}/release`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags clientAlias#read
     * @name Read
     * @summary upcoming...
     * @request GET:/user
     * @secure
     */
    read: (
      query?: {
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserReadResponse, ErrorResponse>({
        path: `/user`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#create
     * @name Create
     * @summary create user
     * @request POST:/user
     * @secure
     */
    create: (UserCreateRequest: UserCreateRequest, params: RequestParams = {}) =>
      this.request<UserReadResponse, ErrorResponse>({
        path: `/user`,
        method: "POST",
        body: UserCreateRequest,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#update
     * @name Update
     * @summary upcoming...
     * @request PUT:/user
     * @secure
     */
    update: (UserUpdateRequest: UserUpdateRequest, params: RequestParams = {}) =>
      this.request<UserReadResponse, ErrorResponse>({
        path: `/user`,
        method: "PUT",
        body: UserUpdateRequest,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsUser
     * @request OPTIONS:/user
     */
    optionsUser: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#activityStream
     * @name ActivityStream
     * @summary upcoming...
     * @request GET:/user/activityStream
     * @secure
     */
    activityStream: (
      query?: {
        exclusiveStartKey?: string;
        limit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AnyResponse, ErrorResponse>({
        path: `/user/activityStream`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsUser2
     * @request OPTIONS:/user/activityStream
     * @originalName optionsUser
     * @duplicate
     */
    optionsUser2: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/activityStream`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#current
     * @name Current
     * @summary upcoming...
     * @request GET:/user/current
     * @secure
     */
    current: (
      query?: {
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserReadResponse, ErrorResponse>({
        path: `/user/current`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsUser3
     * @request OPTIONS:/user/current
     * @originalName optionsUser
     * @duplicate
     */
    optionsUser3: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/current`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clientAlias#updatePassword
     * @name UpdatePassword
     * @summary upcoming...
     * @request PUT:/user/password
     * @secure
     */
    updatePassword: (UserUpdatePasswordNormal: UserUpdatePasswordNormal, params: RequestParams = {}) =>
      this.request<OkResponse, ErrorResponse>({
        path: `/user/password`,
        method: "PUT",
        body: UserUpdatePasswordNormal,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OptionsUser4
     * @request OPTIONS:/user/password
     * @originalName optionsUser
     * @duplicate
     */
    optionsUser4: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/password`,
        method: "OPTIONS",
        type: ContentType.Json,
        ...params,
      }),
  };
}
