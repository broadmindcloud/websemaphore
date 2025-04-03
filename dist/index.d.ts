import { default as default_2 } from 'eventemitter3';
import { EventEmitter } from 'eventemitter3';

declare type AcquireParams = {
    semaphoreId: string;
    channelId?: string;
    body?: any;
    sync?: boolean;
};

export declare type AnyResponse = object;

/**
 * @title websemaphore-openapi
 * @version 2025-04-03T13:14:42Z
 * @baseUrl https://api-us-dev.websemaphore.com/v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    advisor: {
        /**
         * No description
         *
         * @tags clientAlias#generateMapping
         * @name GenerateMapping
         * @summary upcoming...
         * @request POST:/advisor/generateMapping
         * @secure
         */
        generateMapping: (GenerateMappingRequest: GenerateMappingRequest, params?: RequestParams) => Promise<HttpResponse<string, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsAdvisor
         * @request OPTIONS:/advisor/generateMapping
         */
        optionsAdvisor: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
    apikey: {
        /**
         * No description
         *
         * @tags clientAlias#list
         * @name List
         * @summary List API client keys.
         * @request GET:/apikey/readKeys
         * @secure
         */
        list: (query?: {
            direction?: string;
            page?: string;
            orderBy?: string;
            startKey?: string;
        }, params?: RequestParams) => Promise<HttpResponse<ApikeyPagedListOwnerKeysResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsApikey
         * @request OPTIONS:/apikey/readKeys
         */
        optionsApikey: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#upsert
         * @name Upsert
         * @summary Create an API client key
         * @request POST:/apikey/upsertKey
         * @secure
         */
        upsert: (ApikeyUpsertRequest: ApikeyUpsertRequest, params?: RequestParams) => Promise<HttpResponse<ApikeyUpsertResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsApikey2
         * @request OPTIONS:/apikey/upsertKey
         * @originalName optionsApikey
         * @duplicate
         */
        optionsApikey2: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
    auth: {
        /**
         * No description
         *
         * @tags clientAlias#getJWT
         * @name GetJwt
         * @summary upcoming...
         * @request POST:/auth/idGetToken
         */
        getJwt: (IdSessionTokenRequest: IdSessionTokenRequest, params?: RequestParams) => Promise<HttpResponse<SessionTokenResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsAuth
         * @request OPTIONS:/auth/idGetToken
         */
        optionsAuth: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
    emails: {
        /**
         * No description
         *
         * @tags clientAlias#upsert
         * @name Upsert
         * @summary upcoming...
         * @request POST:/emails/upsertEmail
         */
        upsert: (EmailUpsertRequest: EmailUpsertRequest, params?: RequestParams) => Promise<HttpResponse<EmailUpsertResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsEmails
         * @request OPTIONS:/emails/upsertEmail
         */
        optionsEmails: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
    info: {
        /**
         * No description
         *
         * @name InfoList
         * @request GET:/info
         */
        infoList: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @name OptionsInfo
         * @request OPTIONS:/info
         */
        optionsInfo: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
    payment: {
        /**
         * No description
         *
         * @tags clientAlias#createStripeCheckout
         * @name CreateStripeCheckout
         * @summary upcoming...
         * @request POST:/payment/stripe/checkoutSession
         * @secure
         */
        createStripeCheckout: (StripeCheckoutSessionCreateRequest: StripeCheckoutSessionCreateRequest, params?: RequestParams) => Promise<HttpResponse<object, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsPayment
         * @request OPTIONS:/payment/stripe/checkoutSession
         */
        optionsPayment: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @name StripeWebhookCreatePaymentStripeWebhook
         * @summary upcoming...
         * @request POST:/payment/stripe/webhook
         */
        stripeWebhookCreatePaymentStripeWebhook: (params?: RequestParams) => Promise<HttpResponse<void, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsPayment2
         * @request OPTIONS:/payment/stripe/webhook
         * @originalName optionsPayment
         * @duplicate
         */
        optionsPayment2: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
    semaphore: {
        /**
         * No description
         *
         * @tags clientAlias#read, publicApi
         * @name Read
         * @summary Returns a semaphore's settings
         * @request GET:/semaphore
         * @secure
         */
        read: (query?: {
            consistent?: string;
            id?: string;
        }, params?: RequestParams) => Promise<HttpResponse<SemaphoreReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @tags clientAlias#upsert, publicApi
         * @name Upsert
         * @summary Creates or updates a semaphore's settings. Omit the id in input to create a new semaphore.
         * @request POST:/semaphore
         * @secure
         */
        upsert: (SemaphoreUpsertRequest: SemaphoreUpsertRequest, params?: RequestParams) => Promise<HttpResponse<SemaphoreReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsSemaphore
         * @request OPTIONS:/semaphore
         */
        optionsSemaphore: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#list, publicApi
         * @name List
         * @summary List semaphores. Use .startKey to page through results
         * @request GET:/semaphore/list
         * @secure
         */
        list: (query?: {
            pageSize?: string;
            startKey?: string;
        }, params?: RequestParams) => Promise<HttpResponse<PagedSemaphoreListReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsSemaphore2
         * @request OPTIONS:/semaphore/list
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore2: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#acquire, publicApi
         * @name Acquire
         * @summary Asynchronously acquire a semaphore lock.
         Returns an immediate confirmation. The message will be processed as soon
         as possible and WebSemaphore will invoke the preconfigured processor endpoint to continue the flow.
         * @request POST:/semaphore/{semaphoreId}/acquire
         * @secure
         */
        acquire: (semaphoreId: string, SemaphoreLockRequest: SemaphoreLockRequest, params?: RequestParams) => Promise<HttpResponse<void, void>>;
        /**
         * No description
         *
         * @name OptionsSemaphore3
         * @request OPTIONS:/semaphore/{semaphoreId}/acquire
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore3: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#acquireSync, publicApi
         * @name AcquireSync
         * @summary Synchronously acquire a semaphore lock. Immediately returns either an `acquired` or `rejected` status.
         * @request POST:/semaphore/{semaphoreId}/acquireSync
         * @secure
         */
        acquireSync: (semaphoreId: string, SemaphoreLockRequest: SemaphoreLockRequest, params?: RequestParams) => Promise<HttpResponse<SemaphoreSyncLockResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsSemaphore4
         * @request OPTIONS:/semaphore/{semaphoreId}/acquireSync
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore4: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#activate, publicApi
         * @name Activate
         * @summary Activate a semaphore and attempt to start processing its backlog.
         * @request POST:/semaphore/{semaphoreId}/activate
         * @secure
         */
        activate: (semaphoreId: string, SemaphoreChannel: SemaphoreChannel, params?: RequestParams) => Promise<HttpResponse<OkResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsSemaphore5
         * @request OPTIONS:/semaphore/{semaphoreId}/activate
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore5: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#cancel, publicApi
         * @name Cancel
         * @summary Asynchronously cancel a semaphore lock.
         Returns an immediate confirmation. The message will be processed as soon
         as possible and WebSemaphore will cancel the job given by jobCrn.
         * @request POST:/semaphore/{semaphoreId}/cancel
         * @secure
         */
        cancel: (semaphoreId: string, SemaphoreJobStateTransformRequest: SemaphoreJobStateTransformRequest, params?: RequestParams) => Promise<HttpResponse<void, void>>;
        /**
         * No description
         *
         * @name OptionsSemaphore6
         * @request OPTIONS:/semaphore/{semaphoreId}/cancel
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore6: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#delete, publicApi
         * @name Delete
         * @summary Asynchronously delete a semaphore lock.
         Returns an immediate confirmation. The message will be processed as soon
         as possible and WebSemaphore will release the job given by jobCrn.
         * @request POST:/semaphore/{semaphoreId}/delete
         * @secure
         */
        delete: (semaphoreId: string, SemaphoreJobStateTransformRequest: SemaphoreJobStateTransformRequest, params?: RequestParams) => Promise<HttpResponse<void, void>>;
        /**
         * No description
         *
         * @name OptionsSemaphore7
         * @request OPTIONS:/semaphore/{semaphoreId}/delete
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore7: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#readJob, publicApi
         * @name ReadJob
         * @summary Read a job.
         * @request GET:/semaphore/{semaphoreId}/job
         * @secure
         */
        readJob: (semaphoreId: string, query?: {
            crn?: string;
        }, params?: RequestParams) => Promise<HttpResponse<SemaphoreJobReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsSemaphore8
         * @request OPTIONS:/semaphore/{semaphoreId}/job
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore8: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#purgeQueue, publicApi
         * @name PurgeQueue
         * @summary purge message queue
         * @request DELETE:/semaphore/{semaphoreId}/purge
         * @secure
         */
        purgeQueue: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<OkResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsSemaphore9
         * @request OPTIONS:/semaphore/{semaphoreId}/purge
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore9: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#readQueue, publicApi
         * @name ReadQueue
         * @summary Returns a semaphore's queue contents
         * @request GET:/semaphore/{semaphoreId}/readQueue
         * @secure
         */
        readQueue: (semaphoreId: string, query?: {
            status?: string;
            limit?: string;
            pageSize?: string;
            startKey?: string;
        }, params?: RequestParams) => Promise<HttpResponse<PagedSemaphoreReadQueueResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsSemaphore10
         * @request OPTIONS:/semaphore/{semaphoreId}/readQueue
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore10: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#release, publicApi
         * @name Release
         * @summary Asynchronously release a semaphore lock.
         Returns an immediate confirmation. The message will be processed as soon
         as possible and WebSemaphore will release the job given by jobCrn.
         * @request POST:/semaphore/{semaphoreId}/release
         * @secure
         */
        release: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, void>>;
        /**
         * No description
         *
         * @name OptionsSemaphore11
         * @request OPTIONS:/semaphore/{semaphoreId}/release
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore11: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#requeue, publicApi
         * @name Requeue
         * @summary Asynchronously requeue a semaphore lock.
         Returns an immediate confirmation. The message will be processed as soon
         as possible and WebSemaphore will requeue the message with the same payload but new id.
         * @request POST:/semaphore/{semaphoreId}/requeue
         * @secure
         */
        requeue: (semaphoreId: string, SemaphoreJobStateTransformRequest: SemaphoreJobStateTransformRequest, params?: RequestParams) => Promise<HttpResponse<void, void>>;
        /**
         * No description
         *
         * @name OptionsSemaphore12
         * @request OPTIONS:/semaphore/{semaphoreId}/requeue
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore12: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#reschedule, publicApi
         * @name Reschedule
         * @summary Asynchronously reschedule a semaphore lock.
         Returns an immediate confirmation. The message will be processed as soon
         as possible and WebSemaphore will reschedule the job preserving its id/crn and place in the queue.
         * @request POST:/semaphore/{semaphoreId}/reschedule
         * @secure
         */
        reschedule: (semaphoreId: string, SemaphoreJobStateTransformRequest: SemaphoreJobStateTransformRequest, params?: RequestParams) => Promise<HttpResponse<void, void>>;
        /**
         * No description
         *
         * @name OptionsSemaphore13
         * @request OPTIONS:/semaphore/{semaphoreId}/reschedule
         * @originalName optionsSemaphore
         * @duplicate
         */
        optionsSemaphore13: (semaphoreId: string, params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
    user: {
        /**
         * No description
         *
         * @tags clientAlias#read
         * @name Read
         * @summary upcoming...
         * @request GET:/user
         * @secure
         */
        read: (query?: {
            id?: string;
        }, params?: RequestParams) => Promise<HttpResponse<UserReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @tags clientAlias#create
         * @name Create
         * @summary create user
         * @request POST:/user
         * @secure
         */
        create: (UserCreateRequest: UserCreateRequest, params?: RequestParams) => Promise<HttpResponse<UserReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @tags clientAlias#update
         * @name Update
         * @summary upcoming...
         * @request PUT:/user
         * @secure
         */
        update: (UserUpdateRequest: UserUpdateRequest, params?: RequestParams) => Promise<HttpResponse<UserReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsUser
         * @request OPTIONS:/user
         */
        optionsUser: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#activityStream
         * @name ActivityStream
         * @summary upcoming...
         * @request GET:/user/activityStream
         * @secure
         */
        activityStream: (query?: {
            exclusiveStartKey?: string;
            limit?: string;
        }, params?: RequestParams) => Promise<HttpResponse<object, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsUser2
         * @request OPTIONS:/user/activityStream
         * @originalName optionsUser
         * @duplicate
         */
        optionsUser2: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#current
         * @name Current
         * @summary upcoming...
         * @request GET:/user/current
         * @secure
         */
        current: (query?: {
            id?: string;
        }, params?: RequestParams) => Promise<HttpResponse<UserReadResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsUser3
         * @request OPTIONS:/user/current
         * @originalName optionsUser
         * @duplicate
         */
        optionsUser3: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @tags clientAlias#updatePassword
         * @name UpdatePassword
         * @summary upcoming...
         * @request PUT:/user/password
         * @secure
         */
        updatePassword: (UserUpdatePasswordNormal: UserUpdatePasswordNormal, params?: RequestParams) => Promise<HttpResponse<OkResponse, ErrorResponse>>;
        /**
         * No description
         *
         * @name OptionsUser4
         * @request OPTIONS:/user/password
         * @originalName optionsUser
         * @duplicate
         */
        optionsUser4: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
    };
}

export declare interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

declare type ApiConstructorParams = {
    wsClient: WebSemaphoreWebsocketsTransportClient;
    logLevel?: LogLevel;
};

export declare interface ApikeyPagedListOwnerKeysResponse {
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
        /** @default "true" */
        policy?: string;
    }[];
    Count?: number;
    ScannedCount?: number;
    LastEvaluatedKey?: string;
}

export declare interface ApikeyUpsertRequest {
    /** @default "ref number" */
    reference?: string;
    /** @default "Default title" */
    title?: string;
    /** @default true */
    isActive?: boolean;
    /** @default "true" */
    policy?: string;
}

export declare interface ApikeyUpsertResponse {
    /** @default false */
    success?: boolean;
    /** @default "" */
    key?: string;
    /** @default "true" */
    policy?: string;
}

declare type CacheItem = {
    promise: DelayedPromiseType;
    status: LockRequestStatus;
    release: () => void;
};

declare type CancelToken = Symbol | string | number;

export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain"
}

declare type DelayedPromiseType<T = any> = Promise<T> & {
    resolve: (val?: T) => void;
    reject: (val: Error) => void;
};

export declare interface EmailUpsertRequest {
    /** @default "true" */
    reference?: string;
    /** @default "Default title" */
    name?: string;
    /** @default "" */
    email?: string;
}

export declare interface EmailUpsertResponse {
    /** @default false */
    success?: boolean;
}

export declare interface ErrorResponse {
    errorMessage?: string;
    errorCode?: string;
    statusCode?: number;
}

export declare interface FullRequestParams extends Omit<RequestInit, "body"> {
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

export declare interface GenerateMappingRequest {
    output: string;
    data: string;
    context: string;
}

export declare type GenerateMappingResponse = string;

export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker?;
    private abortControllers;
    private customFetch;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    protected encodeQueryParam(key: string, value: any): string;
    protected addQueryParam(query: QueryParamsType, key: string): string;
    protected addArrayQueryParam(query: QueryParamsType, key: string): any;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams;
    protected createAbortSignal: (cancelToken: CancelToken) => AbortSignal | undefined;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}

export declare interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

export declare interface IdSessionTokenRequest {
    password: string;
    id: string;
}

declare type JobActionParams = {
    jobCrn: string;
};

declare type LockRequestStatus = "waiting" | "acquired" | "rejected";

declare type LogLevel = "" | "ALL";

export declare interface OkResponse {
    ok?: boolean;
}

/** PagedSemaphoreListReadResponse Model */
export declare interface PagedSemaphoreListReadResponse {
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
        websemaphore?: {
            channelCrn?: string;
            release?: boolean;
            isActive?: boolean;
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

/** PagedSemaphoreReadQueueResponse Model */
export declare interface PagedSemaphoreReadQueueResponse {
    Items?: {
        created?: string;
        messageId?: string;
        error?: string;
        timer?: {
            crn?: string;
        };
        deleted?: boolean;
        payload?: object;
        meta?: {
            routing?: {
                protocol?: string;
                url?: string;
                remoteId?: string;
            };
        };
        semaphore?: {
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
            websemaphore?: {
                channelCrn?: string;
                release?: boolean;
                isActive?: boolean;
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
        updated?: string;
        crn?: string;
        lastStatus?: string;
        channelId?: string;
        status?: string;
    }[];
    Count?: number;
    ScannedCount?: number;
    LastEvaluatedKey?: string;
}

export declare type QueryParamsType = Record<string | number, any>;

export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

/** SemaphoreChannel Model */
export declare interface SemaphoreChannel {
    channelId?: string;
}

/** SemaphoreJobReadResponse Model */
export declare interface SemaphoreJobReadResponse {
    created?: string;
    messageId?: string;
    error?: string;
    timer?: {
        crn?: string;
    };
    deleted?: boolean;
    payload?: object;
    meta?: {
        routing?: {
            protocol?: string;
            url?: string;
            remoteId?: string;
        };
    };
    semaphore?: {
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
        websemaphore?: {
            channelCrn?: string;
            release?: boolean;
            isActive?: boolean;
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
    updated?: string;
    crn?: string;
    lastStatus?: string;
    channelId?: string;
    status?: string;
}

/** SemaphoreJobStateTransformRequest Model */
export declare interface SemaphoreJobStateTransformRequest {
    jobCrn?: string;
}

/** SemaphoreLockRequest Model */
export declare interface SemaphoreLockRequest {
    id?: string;
    body?: string;
    crn?: string;
    channelId?: string;
}

/** SemaphoreReadResponse Model */
export declare interface SemaphoreReadResponse {
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
    websemaphore?: {
        channelCrn?: string;
        release?: boolean;
        isActive?: boolean;
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

/** SemaphoreSyncLockResponse Model */
export declare interface SemaphoreSyncLockResponse {
    semaphoreId: string;
    success?: boolean;
    channelId?: string;
}

/** SemaphoreUpsertRequest Model */
export declare interface SemaphoreUpsertRequest {
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
    websemaphore?: {
        channelCrn?: string;
        release?: boolean;
        isActive?: boolean;
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

export declare interface SessionTokenResponse {
    jwt?: string;
}

export declare interface StripeCheckoutSessionCreateRequest {
    paymentMethodId: string;
    customerId: string;
    priceId?: string;
}

export declare type StripeCheckoutSessionCreateResponse = object;

declare type UpdateClientConfig = (wsServer: string, token: string) => string;

export declare interface UserCreateRequest {
    /** @default "" */
    lastName?: string;
    /** @default "" */
    country?: string;
    /** @default "" */
    ticket?: string;
    ownerScopes?: string[];
    subscription?: {
        expires?: string;
        provider?: string;
        active?: boolean;
        subscriptionId?: string;
        providerUserId?: string;
    };
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

export declare interface UserReadResponse {
    /** @default "" */
    lastName?: string;
    /** @default "" */
    country?: string;
    /** @default "" */
    ticket?: string;
    ownerScopes?: string[];
    subscription?: {
        expires?: string;
        provider?: string;
        active?: boolean;
        subscriptionId?: string;
        providerUserId?: string;
    };
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

export declare interface UserUpdatePasswordNormal {
    new?: string;
    old?: string;
}

export declare interface UserUpdateRequest {
    /** @default "" */
    lastName?: string;
    /** @default "" */
    country?: string;
    /** @default "" */
    ticket?: string;
    ownerScopes?: string[];
    subscription?: {
        expires?: string;
        provider?: string;
        active?: boolean;
        subscriptionId?: string;
        providerUserId?: string;
    };
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

export declare class WebsemaphoreHttpClient extends Api<{
    token: string;
}> {
}

export declare const WebSemaphoreHttpClientManager: (params?: {
    baseUrl?: string;
    token?: string;
    logLevel?: LogLevel;
    fetch?: any;
}) => {
    initialize: (params?: {
        baseUrl?: string;
        fetch?: any;
        token?: string;
    }) => WebsemaphoreHttpClient;
    getCurrentToken(): string;
    updateToken(token: string): void;
    authorize(): Promise<UserReadResponse>;
};

export declare class WebSemaphoreWebsocketsClient extends default_2 {
    private wsClient;
    private cache;
    logLevel: LogLevel;
    constructor(opts: ApiConstructorParams);
    acquire<T>({ semaphoreId, channelId, sync, body }: AcquireParams): Promise<{
        status: LockRequestStatus;
        payload: T;
        jobCrn: string;
        release: () => void;
    }>;
    private log;
    private _processIncoming;
    private jobAction;
    release({ jobCrn }: JobActionParams): void;
    requeue({ jobCrn }: JobActionParams): Promise<{
        status: string;
        jobCrn: string;
        payload: string;
        release: () => void;
    }> | Promise<{
        status: LockRequestStatus;
        payload: unknown;
        jobCrn: string;
        release: () => void;
    }>;
    reschedule({ jobCrn }: JobActionParams): Promise<{
        status: string;
        jobCrn: string;
        payload: string;
        release: () => void;
    }> | Promise<{
        status: LockRequestStatus;
        payload: unknown;
        jobCrn: string;
        release: () => void;
    }>;
    cancel({ jobCrn }: JobActionParams): Promise<{
        status: string;
        jobCrn: string;
        payload: string;
        release: () => void;
    }> | Promise<{
        status: LockRequestStatus;
        payload: unknown;
        jobCrn: string;
        release: () => void;
    }>;
    archive({ jobCrn }: JobActionParams): Promise<{
        status: string;
        jobCrn: string;
        payload: string;
        release: () => void;
    }> | Promise<{
        status: LockRequestStatus;
        payload: unknown;
        jobCrn: string;
        release: () => void;
    }>;
    delete({ jobCrn }: JobActionParams): Promise<{
        status: string;
        jobCrn: string;
        payload: string;
        release: () => void;
    }> | Promise<{
        status: LockRequestStatus;
        payload: unknown;
        jobCrn: string;
        release: () => void;
    }>;
    client(): WebSemaphoreWebsocketsTransportClient;
    setClient(client: WebSemaphoreWebsocketsTransportClient): void;
    getCache(): {
        inFlight: Record<string, CacheItem>;
        history: string[];
    };
}

export declare const WebSemaphoreWebsocketsClientManager: (opts?: {
    websockets?: WebSocketImplementation;
    logLevel?: LogLevel;
    baseUrl?: string;
}) => {
    connect: (token: string) => Promise<WebSemaphoreWebsocketsClient>;
    disconnect: () => Promise<void>;
    wsClient: WebSemaphoreWebsocketsTransportClient;
    client: WebSemaphoreWebsocketsClient;
};

declare class WebSemaphoreWebsocketsTransportClient extends EventEmitter {
    socket: WebSocket | null;
    private pingInterval?;
    private pingCounter;
    private outboundQueue;
    private token;
    private url;
    private noReconnect;
    private upd;
    private WSImplementation;
    logLevel: LogLevel;
    constructor(upd: UpdateClientConfig, opts?: {
        websockets?: WebSocketImplementation;
        url?: string;
        env?: string;
        logLevel?: LogLevel;
    });
    private log;
    isConnected(): boolean | null;
    private initPing;
    private stopPing;
    private processPong;
    private logError;
    private addEventListeners;
    boundListeners: {
        name: string;
        handler: EventListener;
    }[];
    private removeEventListeners;
    private forwardEvents;
    private onClose;
    toggle(token?: string): Promise<void>;
    send(msg: any): void;
    flush(): Promise<void>;
}

declare type WebSocketImplementation = {
    new (...args: any[]): WebSocket;
};

export { }
