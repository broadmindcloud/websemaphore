var L = Object.defineProperty;
var $ = (s, o, e) => o in s ? L(s, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[o] = e;
var u = (s, o, e) => $(s, typeof o != "symbol" ? o + "" : o, e);
const P = (s, o, e) => `${s}://${e || ""}api-${o}.websemaphore.com/v1`, N = "eu", k = [
  "dev",
  "prod",
  "eu-dev",
  "eu-prod",
  "us-dev",
  "us-prod"
], C = (s) => ["dev", "prod"].includes(s) ? N + "-" + s : s, O = (s) => k.includes(s) && P("https", C(s)), q = (s) => k.includes(s) && P("wss", C(s), "ws");
var _ = /* @__PURE__ */ ((s) => (s.Json = "application/json", s.FormData = "multipart/form-data", s.UrlEncoded = "application/x-www-form-urlencoded", s.Text = "text/plain", s))(_ || {});
class A {
  constructor(o = {}) {
    u(this, "baseUrl", "https://api-us-dev.websemaphore.com/v1");
    u(this, "securityData", null);
    u(this, "securityWorker");
    u(this, "abortControllers", /* @__PURE__ */ new Map());
    u(this, "customFetch", (...o) => fetch(...o));
    u(this, "baseApiParams", {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer"
    });
    u(this, "setSecurityData", (o) => {
      this.securityData = o;
    });
    u(this, "contentFormatters", {
      "application/json": (o) => o !== null && (typeof o == "object" || typeof o == "string") ? JSON.stringify(o) : o,
      "text/plain": (o) => o !== null && typeof o != "string" ? JSON.stringify(o) : o,
      "multipart/form-data": (o) => Object.keys(o || {}).reduce((e, t) => {
        const r = o[t];
        return e.append(
          t,
          r instanceof Blob ? r : typeof r == "object" && r !== null ? JSON.stringify(r) : `${r}`
        ), e;
      }, new FormData()),
      "application/x-www-form-urlencoded": (o) => this.toQueryString(o)
    });
    u(this, "createAbortSignal", (o) => {
      if (this.abortControllers.has(o)) {
        const t = this.abortControllers.get(o);
        return t ? t.signal : void 0;
      }
      const e = new AbortController();
      return this.abortControllers.set(o, e), e.signal;
    });
    u(this, "abortRequest", (o) => {
      const e = this.abortControllers.get(o);
      e && (e.abort(), this.abortControllers.delete(o));
    });
    u(this, "request", async ({
      body: o,
      secure: e,
      path: t,
      type: r,
      query: c,
      format: d,
      baseUrl: p,
      cancelToken: i,
      ...a
    }) => {
      const l = (typeof e == "boolean" ? e : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {}, h = this.mergeRequestParams(a, l), g = c && this.toQueryString(c), f = this.contentFormatters[
        r || "application/json"
        /* Json */
      ], m = d || h.format;
      return this.customFetch(`${p || this.baseUrl || ""}${t}${g ? `?${g}` : ""}`, {
        ...h,
        headers: {
          ...h.headers || {},
          ...r && r !== "multipart/form-data" ? { "Content-Type": r } : {}
        },
        signal: (i ? this.createAbortSignal(i) : h.signal) || null,
        body: typeof o > "u" || o === null ? null : f(o)
      }).then(async (b) => {
        const n = b.clone();
        n.data = null, n.error = null;
        const j = m ? await b[m]().then((v) => (n.ok ? n.data = v : n.error = v, n)).catch((v) => (n.error = v, n)) : n;
        if (i && this.abortControllers.delete(i), !b.ok) throw j;
        return j;
      });
    });
    Object.assign(this, o);
  }
  encodeQueryParam(o, e) {
    return `${encodeURIComponent(o)}=${encodeURIComponent(typeof e == "number" ? e : `${e}`)}`;
  }
  addQueryParam(o, e) {
    return this.encodeQueryParam(e, o[e]);
  }
  addArrayQueryParam(o, e) {
    return o[e].map((r) => this.encodeQueryParam(e, r)).join("&");
  }
  toQueryString(o) {
    const e = o || {};
    return Object.keys(e).filter((r) => typeof e[r] < "u").map((r) => Array.isArray(e[r]) ? this.addArrayQueryParam(e, r) : this.addQueryParam(e, r)).join("&");
  }
  addQueryParams(o) {
    const e = this.toQueryString(o);
    return e ? `?${e}` : "";
  }
  mergeRequestParams(o, e) {
    return {
      ...this.baseApiParams,
      ...o,
      ...e || {},
      headers: {
        ...this.baseApiParams.headers || {},
        ...o.headers || {},
        ...e && e.headers || {}
      }
    };
  }
}
class W extends A {
  constructor() {
    super(...arguments);
    u(this, "advisor", {
      /**
       * No description
       *
       * @tags clientAlias#generateMapping
       * @name GenerateMapping
       * @summary upcoming...
       * @request POST:/advisor/generateMapping
       * @secure
       */
      generateMapping: (e, t = {}) => this.request({
        path: "/advisor/generateMapping",
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsAdvisor
       * @request OPTIONS:/advisor/generateMapping
       */
      optionsAdvisor: (e = {}) => this.request({
        path: "/advisor/generateMapping",
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    });
    u(this, "apikey", {
      /**
       * No description
       *
       * @tags clientAlias#list
       * @name List
       * @summary List API client keys.
       * @request GET:/apikey/readKeys
       * @secure
       */
      list: (e, t = {}) => this.request({
        path: "/apikey/readKeys",
        method: "GET",
        query: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsApikey
       * @request OPTIONS:/apikey/readKeys
       */
      optionsApikey: (e = {}) => this.request({
        path: "/apikey/readKeys",
        method: "OPTIONS",
        type: "application/json",
        ...e
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
      upsert: (e, t = {}) => this.request({
        path: "/apikey/upsertKey",
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsApikey2
       * @request OPTIONS:/apikey/upsertKey
       * @originalName optionsApikey
       * @duplicate
       */
      optionsApikey2: (e = {}) => this.request({
        path: "/apikey/upsertKey",
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    });
    u(this, "auth", {
      /**
       * No description
       *
       * @tags clientAlias#getJWT
       * @name GetJwt
       * @summary upcoming...
       * @request POST:/auth/idGetToken
       */
      getJwt: (e, t = {}) => this.request({
        path: "/auth/idGetToken",
        method: "POST",
        body: e,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsAuth
       * @request OPTIONS:/auth/idGetToken
       */
      optionsAuth: (e = {}) => this.request({
        path: "/auth/idGetToken",
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    });
    u(this, "emails", {
      /**
       * No description
       *
       * @tags clientAlias#upsert
       * @name Upsert
       * @summary upcoming...
       * @request POST:/emails/upsertEmail
       */
      upsert: (e, t = {}) => this.request({
        path: "/emails/upsertEmail",
        method: "POST",
        body: e,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsEmails
       * @request OPTIONS:/emails/upsertEmail
       */
      optionsEmails: (e = {}) => this.request({
        path: "/emails/upsertEmail",
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    });
    u(this, "info", {
      /**
       * No description
       *
       * @name InfoList
       * @request GET:/info
       */
      infoList: (e = {}) => this.request({
        path: "/info",
        method: "GET",
        type: "application/json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsInfo
       * @request OPTIONS:/info
       */
      optionsInfo: (e = {}) => this.request({
        path: "/info",
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    });
    u(this, "payment", {
      /**
       * No description
       *
       * @tags clientAlias#createStripeCheckout
       * @name CreateStripeCheckout
       * @summary upcoming...
       * @request POST:/payment/stripe/checkoutSession
       * @secure
       */
      createStripeCheckout: (e, t = {}) => this.request({
        path: "/payment/stripe/checkoutSession",
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsPayment
       * @request OPTIONS:/payment/stripe/checkoutSession
       */
      optionsPayment: (e = {}) => this.request({
        path: "/payment/stripe/checkoutSession",
        method: "OPTIONS",
        type: "application/json",
        ...e
      }),
      /**
       * No description
       *
       * @name StripeWebhookCreatePaymentStripeWebhook
       * @summary upcoming...
       * @request POST:/payment/stripe/webhook
       */
      stripeWebhookCreatePaymentStripeWebhook: (e = {}) => this.request({
        path: "/payment/stripe/webhook",
        method: "POST",
        type: "application/json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsPayment2
       * @request OPTIONS:/payment/stripe/webhook
       * @originalName optionsPayment
       * @duplicate
       */
      optionsPayment2: (e = {}) => this.request({
        path: "/payment/stripe/webhook",
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    });
    u(this, "semaphore", {
      /**
       * No description
       *
       * @tags clientAlias#read, publicApi
       * @name Read
       * @summary Returns a semaphore's settings
       * @request GET:/semaphore
       * @secure
       */
      read: (e, t = {}) => this.request({
        path: "/semaphore",
        method: "GET",
        query: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
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
      upsert: (e, t = {}) => this.request({
        path: "/semaphore",
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore
       * @request OPTIONS:/semaphore
       */
      optionsSemaphore: (e = {}) => this.request({
        path: "/semaphore",
        method: "OPTIONS",
        type: "application/json",
        ...e
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
      list: (e, t = {}) => this.request({
        path: "/semaphore/list",
        method: "GET",
        query: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore2
       * @request OPTIONS:/semaphore/list
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore2: (e = {}) => this.request({
        path: "/semaphore/list",
        method: "OPTIONS",
        type: "application/json",
        ...e
      }),
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
      acquire: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/acquire`,
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore3
       * @request OPTIONS:/semaphore/{semaphoreId}/acquire
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore3: (e, t = {}) => this.request({
        path: `/semaphore/${e}/acquire`,
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      acquireSync: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/acquireSync`,
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore4
       * @request OPTIONS:/semaphore/{semaphoreId}/acquireSync
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore4: (e, t = {}) => this.request({
        path: `/semaphore/${e}/acquireSync`,
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      activate: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/activate`,
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore5
       * @request OPTIONS:/semaphore/{semaphoreId}/activate
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore5: (e, t = {}) => this.request({
        path: `/semaphore/${e}/activate`,
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
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
      cancel: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/cancel`,
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore6
       * @request OPTIONS:/semaphore/{semaphoreId}/cancel
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore6: (e, t = {}) => this.request({
        path: `/semaphore/${e}/cancel`,
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
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
      delete: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/delete`,
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore7
       * @request OPTIONS:/semaphore/{semaphoreId}/delete
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore7: (e, t = {}) => this.request({
        path: `/semaphore/${e}/delete`,
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
      /**
       * No description
       *
       * @tags clientAlias#readJob, publicApi
       * @name ReadJob
       * @summary Read a job.
       * @request GET:/semaphore/{semaphoreId}/job
       * @secure
       */
      readJob: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/job`,
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore8
       * @request OPTIONS:/semaphore/{semaphoreId}/job
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore8: (e, t = {}) => this.request({
        path: `/semaphore/${e}/job`,
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      purgeQueue: (e, t = {}) => this.request({
        path: `/semaphore/${e}/purge`,
        method: "DELETE",
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore9
       * @request OPTIONS:/semaphore/{semaphoreId}/purge
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore9: (e, t = {}) => this.request({
        path: `/semaphore/${e}/purge`,
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      readQueue: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/readQueue`,
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore10
       * @request OPTIONS:/semaphore/{semaphoreId}/readQueue
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore10: (e, t = {}) => this.request({
        path: `/semaphore/${e}/readQueue`,
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
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
      release: (e, t = {}) => this.request({
        path: `/semaphore/${e}/release`,
        method: "POST",
        secure: !0,
        type: "application/json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore11
       * @request OPTIONS:/semaphore/{semaphoreId}/release
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore11: (e, t = {}) => this.request({
        path: `/semaphore/${e}/release`,
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
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
      requeue: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/requeue`,
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore12
       * @request OPTIONS:/semaphore/{semaphoreId}/requeue
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore12: (e, t = {}) => this.request({
        path: `/semaphore/${e}/requeue`,
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
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
      reschedule: (e, t, r = {}) => this.request({
        path: `/semaphore/${e}/reschedule`,
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        ...r
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore13
       * @request OPTIONS:/semaphore/{semaphoreId}/reschedule
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore13: (e, t = {}) => this.request({
        path: `/semaphore/${e}/reschedule`,
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    });
    u(this, "user", {
      /**
       * No description
       *
       * @tags clientAlias#read
       * @name Read
       * @summary upcoming...
       * @request GET:/user
       * @secure
       */
      read: (e, t = {}) => this.request({
        path: "/user",
        method: "GET",
        query: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
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
      create: (e, t = {}) => this.request({
        path: "/user",
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
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
      update: (e, t = {}) => this.request({
        path: "/user",
        method: "PUT",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsUser
       * @request OPTIONS:/user
       */
      optionsUser: (e = {}) => this.request({
        path: "/user",
        method: "OPTIONS",
        type: "application/json",
        ...e
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
      activityStream: (e, t = {}) => this.request({
        path: "/user/activityStream",
        method: "GET",
        query: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsUser2
       * @request OPTIONS:/user/activityStream
       * @originalName optionsUser
       * @duplicate
       */
      optionsUser2: (e = {}) => this.request({
        path: "/user/activityStream",
        method: "OPTIONS",
        type: "application/json",
        ...e
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
      current: (e, t = {}) => this.request({
        path: "/user/current",
        method: "GET",
        query: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsUser3
       * @request OPTIONS:/user/current
       * @originalName optionsUser
       * @duplicate
       */
      optionsUser3: (e = {}) => this.request({
        path: "/user/current",
        method: "OPTIONS",
        type: "application/json",
        ...e
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
      updatePassword: (e, t = {}) => this.request({
        path: "/user/password",
        method: "PUT",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsUser4
       * @request OPTIONS:/user/password
       * @originalName optionsUser
       * @duplicate
       */
      optionsUser4: (e = {}) => this.request({
        path: "/user/password",
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    });
  }
}
class x extends W {
}
const R = (s) => {
  let o, e = (s == null ? void 0 : s.token) || "";
  const t = (...c) => {
    s != null && s.logLevel && console.log("WebSemaphoreHttpClientManager", ...c);
  };
  return {
    initialize: (c) => {
      let { baseUrl: d, fetch: p } = c || {};
      return d = d ? O(d) || d : O("prod"), t(d), o = new x({
        baseUrl: d,
        securityWorker: (i) => i ? { headers: { Authorization: i.token } } : {},
        customFetch: p || ((...i) => fetch(...i))
      }), c != null && c.token && o.setSecurityData({ token: c.token }), o;
    },
    getCurrentToken() {
      return e;
    },
    updateToken(c) {
      e = c, o.setSecurityData({ token: c });
    },
    async authorize() {
      try {
        const c = await o.user.current();
        return t(`Logged in with ${c.data.id}`), c.data;
      } catch (c) {
        throw c;
      }
    }
  };
};
function F(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var T = { exports: {} };
(function(s) {
  var o = Object.prototype.hasOwnProperty, e = "~";
  function t() {
  }
  Object.create && (t.prototype = /* @__PURE__ */ Object.create(null), new t().__proto__ || (e = !1));
  function r(i, a, l) {
    this.fn = i, this.context = a, this.once = l || !1;
  }
  function c(i, a, l, h, g) {
    if (typeof l != "function")
      throw new TypeError("The listener must be a function");
    var f = new r(l, h || i, g), m = e ? e + a : a;
    return i._events[m] ? i._events[m].fn ? i._events[m] = [i._events[m], f] : i._events[m].push(f) : (i._events[m] = f, i._eventsCount++), i;
  }
  function d(i, a) {
    --i._eventsCount === 0 ? i._events = new t() : delete i._events[a];
  }
  function p() {
    this._events = new t(), this._eventsCount = 0;
  }
  p.prototype.eventNames = function() {
    var a = [], l, h;
    if (this._eventsCount === 0) return a;
    for (h in l = this._events)
      o.call(l, h) && a.push(e ? h.slice(1) : h);
    return Object.getOwnPropertySymbols ? a.concat(Object.getOwnPropertySymbols(l)) : a;
  }, p.prototype.listeners = function(a) {
    var l = e ? e + a : a, h = this._events[l];
    if (!h) return [];
    if (h.fn) return [h.fn];
    for (var g = 0, f = h.length, m = new Array(f); g < f; g++)
      m[g] = h[g].fn;
    return m;
  }, p.prototype.listenerCount = function(a) {
    var l = e ? e + a : a, h = this._events[l];
    return h ? h.fn ? 1 : h.length : 0;
  }, p.prototype.emit = function(a, l, h, g, f, m) {
    var b = e ? e + a : a;
    if (!this._events[b]) return !1;
    var n = this._events[b], j = arguments.length, v, y;
    if (n.fn) {
      switch (n.once && this.removeListener(a, n.fn, void 0, !0), j) {
        case 1:
          return n.fn.call(n.context), !0;
        case 2:
          return n.fn.call(n.context, l), !0;
        case 3:
          return n.fn.call(n.context, l, h), !0;
        case 4:
          return n.fn.call(n.context, l, h, g), !0;
        case 5:
          return n.fn.call(n.context, l, h, g, f), !0;
        case 6:
          return n.fn.call(n.context, l, h, g, f, m), !0;
      }
      for (y = 1, v = new Array(j - 1); y < j; y++)
        v[y - 1] = arguments[y];
      n.fn.apply(n.context, v);
    } else {
      var I = n.length, S;
      for (y = 0; y < I; y++)
        switch (n[y].once && this.removeListener(a, n[y].fn, void 0, !0), j) {
          case 1:
            n[y].fn.call(n[y].context);
            break;
          case 2:
            n[y].fn.call(n[y].context, l);
            break;
          case 3:
            n[y].fn.call(n[y].context, l, h);
            break;
          case 4:
            n[y].fn.call(n[y].context, l, h, g);
            break;
          default:
            if (!v) for (S = 1, v = new Array(j - 1); S < j; S++)
              v[S - 1] = arguments[S];
            n[y].fn.apply(n[y].context, v);
        }
    }
    return !0;
  }, p.prototype.on = function(a, l, h) {
    return c(this, a, l, h, !1);
  }, p.prototype.once = function(a, l, h) {
    return c(this, a, l, h, !0);
  }, p.prototype.removeListener = function(a, l, h, g) {
    var f = e ? e + a : a;
    if (!this._events[f]) return this;
    if (!l)
      return d(this, f), this;
    var m = this._events[f];
    if (m.fn)
      m.fn === l && (!g || m.once) && (!h || m.context === h) && d(this, f);
    else {
      for (var b = 0, n = [], j = m.length; b < j; b++)
        (m[b].fn !== l || g && !m[b].once || h && m[b].context !== h) && n.push(m[b]);
      n.length ? this._events[f] = n.length === 1 ? n[0] : n : d(this, f);
    }
    return this;
  }, p.prototype.removeAllListeners = function(a) {
    var l;
    return a ? (l = e ? e + a : a, this._events[l] && d(this, l)) : (this._events = new t(), this._eventsCount = 0), this;
  }, p.prototype.off = p.prototype.removeListener, p.prototype.addListener = p.prototype.on, p.prefixed = e, p.EventEmitter = p, s.exports = p;
})(T);
var Q = T.exports;
const E = /* @__PURE__ */ F(Q), w = () => {
  const s = {};
  let o = new Promise((e, t) => {
    s.resolve = e, s.reject = t;
  });
  return o.resolve = s.resolve, o.reject = s.reject, o;
};
class U extends E {
  constructor(e, t) {
    super();
    u(this, "socket");
    u(this, "pingInterval");
    u(this, "pingCounter", 0);
    u(this, "outboundQueue", []);
    u(this, "token", "");
    u(this, "url", "");
    u(this, "noReconnect", !1);
    u(this, "upd");
    u(this, "WSImplementation");
    u(this, "logLevel", "");
    u(this, "boundListeners", []);
    const r = t != null && t.websockets ? t.websockets : globalThis.WebSocket;
    if (this.WSImplementation = r, this.url = t != null && t.url ? q(t == null ? void 0 : t.url) || t.url : q("prod"), this.socket = null, this.upd = e, this.toggle = this.toggle.bind(this), this.send = this.send.bind(this), this.logLevel = this.logLevel, !r)
      throw new Error("No websockets implementation provided or available natively");
  }
  log(...e) {
    this.logLevel && console.log("WebSemaphoreWebsocketsTransportClient", ...e);
  }
  isConnected() {
    var e;
    return this.log("Ready state: ", (e = this.socket) == null ? void 0 : e.readyState), this.socket && this.socket.readyState === this.socket.OPEN;
  }
  initPing(e) {
    this.pingInterval = setInterval(() => {
      var t;
      (t = this.socket) == null || t.send("ping"), this.pingCounter++, this.log("ping, pingCounter == ", this.pingCounter);
    }, 1e4);
  }
  stopPing() {
    clearInterval(this.pingInterval);
  }
  processPong(e) {
    e.data === "pong" && (this.pingCounter--, this.log("pong, pingCounter == ", this.pingCounter, (/* @__PURE__ */ new Date()).toISOString()));
  }
  logError(e) {
    this.log(e);
  }
  addEventListeners() {
    if (!this.socket)
      throw new Error("Socket is not available");
    this.boundListeners = [
      { name: "open", handler: this.initPing },
      { name: "open", handler: this.flush },
      { name: "close", handler: this.onClose },
      { name: "error", handler: this.logError },
      { name: "message", handler: this.processPong },
      { name: "message", handler: this.forwardEvents }
    ].map((e) => ({ name: e.name, handler: e.handler.bind(this) })), this.boundListeners.forEach((e) => {
      var t;
      return (t = this.socket) == null ? void 0 : t.addEventListener(e.name, e.handler);
    });
  }
  removeEventListeners() {
    if (!this.socket)
      throw new Error("Socket is not available");
    this.boundListeners.forEach(
      (e) => {
        var t;
        return (t = this.socket) == null ? void 0 : t.removeEventListener(e.name, e.handler);
      }
    ), this.noReconnect = !0;
  }
  forwardEvents(e) {
    e.data !== "pong" && this.emit("message", e);
  }
  onClose() {
    this.stopPing(), !this.noReconnect && this.token ? this.toggle(this.token) : this.removeEventListeners(), this.noReconnect = !1;
  }
  async toggle(e = "") {
    var c, d;
    this.token = e;
    const t = this.upd(this.url, this.token), r = !e;
    if (this.log("Websemaphore Websockets connection is toggling", r ? "off" : "on"), !(this.url === t && e == this.token && ((c = this.socket) == null ? void 0 : c.readyState) === ((d = this.socket) == null ? void 0 : d.OPEN)))
      return this.url = t, r && await this.flush(), this.socket ? this.socket.close() : (this.socket = new this.WSImplementation(this.url), this.addEventListeners()), Promise.resolve();
  }
  send(e) {
    var t;
    if (this.log("Sending", e), !this.isConnected()) {
      this.outboundQueue.unshift(e);
      return;
    }
    typeof e != "string" && (e = JSON.stringify(e)), (t = this.socket) == null || t.send(e);
  }
  async flush() {
    const e = w(), t = this.socket;
    let r = 0;
    const c = this.outboundQueue || [];
    for (this.log("Flushing outbound queue has items:", c.length); c.length; )
      this.send(c.pop());
    const d = () => {
      if (this.log("Flushing #", r++), !this.isConnected())
        return e.resolve();
      (t == null ? void 0 : t.bufferedAmount) ? (this.log("Items in buffer #", r++), setTimeout(() => {
        d();
      }, 500)) : (this.log("ResolveWhenDone Done"), e.resolve());
    };
    return d(), e;
  }
  // Rest of your code...
}
class D extends E {
  constructor(e) {
    super();
    u(this, "wsClient");
    u(this, "cache");
    u(this, "logLevel", "");
    if (this.wsClient = e.wsClient, this.logLevel = e.logLevel || this.logLevel, !this.wsClient)
      throw new Error("No websockets implementation available. If using in nodejs try `npm i ws` or equivalent");
    this.cache = {
      inFlight: {},
      history: []
    }, this.wsClient.addListener("message", (t) => {
      this.emit("message", t.data), this._processIncoming(t.data);
    });
  }
  acquire({ semaphoreId: e, channelId: t, sync: r, body: c }) {
    let d = 0;
    const p = Date.now().toString() + "-" + d++;
    this.wsClient.send({
      action: r ? "lock.acquireSync" : "lock.acquire",
      payload: JSON.stringify({
        id: p,
        body: c || "{}"
      }),
      semaphoreId: e,
      channelId: t
    });
    const i = w();
    return this.cache.inFlight[p] = {
      promise: i,
      status: "waiting",
      release: () => {
        throw new Error("Cannot call release before the lock is acquired or rejected");
      }
    }, i.then((a) => ({
      status: a.status,
      payload: a.payload,
      jobCrn: a.jobCrn,
      release: () => {
        this.release({ jobCrn: a.jobCrn });
      }
    }));
  }
  log(...e) {
    this.logLevel && console.log("WebSemaphoreWebsocketsClient", ...e);
  }
  _processIncoming(e) {
    const t = JSON.parse(e), r = t.event;
    if (t.type === "lock" && r == "acquired") {
      const c = this.cache.inFlight[t.payload.id];
      c.promise.resolve({
        ...c,
        status: t.event,
        payload: t.payload,
        jobCrn: t.jobCrn
      });
    }
  }
  jobAction({ jobCrn: e, action: t }) {
    const r = ["requeue", "reschedule", "acquire"].includes(t);
    let c = 0;
    const d = Date.now().toString() + "-" + c++;
    this.wsClient.send({
      action: `lock.${t}`,
      jobCrn: e
    });
    const p = w();
    return this.cache.inFlight[d] = {
      promise: p,
      status: "waiting",
      release: () => {
        throw new Error("Cannot call release before the lock is acquired or rejected");
      }
    }, r ? p.then((i) => ({
      status: i.status,
      payload: i.payload,
      jobCrn: i.jobCrn,
      release: () => {
        this.release({ jobCrn: i.jobCrn });
      }
    })) : Promise.resolve({
      status: `${t}ed`,
      jobCrn: e,
      payload: "",
      release: () => {
      }
    });
  }
  release({ jobCrn: e }) {
    this.jobAction({ jobCrn: e, action: "release" }), delete this.cache.inFlight[e], this.cache.history.push(e);
  }
  requeue({ jobCrn: e }) {
    return this.jobAction({ jobCrn: e, action: "requeue" });
  }
  reschedule({ jobCrn: e }) {
    return this.jobAction({ jobCrn: e, action: "reschedule" });
  }
  cancel({ jobCrn: e }) {
    return this.jobAction({ jobCrn: e, action: "cancel" });
  }
  archive({ jobCrn: e }) {
    return this.jobAction({ jobCrn: e, action: "archive" });
  }
  delete({ jobCrn: e }) {
    return this.jobAction({ jobCrn: e, action: "delete" });
  }
  client() {
    return this.wsClient;
  }
  setClient(e) {
    this.wsClient = e;
  }
  getCache() {
    return this.cache;
  }
}
const J = (s) => {
  const o = s != null && s.websockets ? s.websockets : globalThis.WebSocket, e = new U(
    (d, p) => `${d}?token=${encodeURIComponent(p)}`,
    { websockets: o, logLevel: s == null ? void 0 : s.logLevel, url: s == null ? void 0 : s.baseUrl }
  );
  let t = new D({ wsClient: e, logLevel: s == null ? void 0 : s.logLevel });
  return {
    connect: async (d) => {
      if (!d || !d.replace(/^ApiKey./, ""))
        throw new Error("Couln't connect (did you pass a token?)");
      const p = w();
      if (await e.toggle(d), !e.socket)
        throw new Error("Websocket was not created, the provided implementation might be incompatible.");
      return e.socket.addEventListener && e.socket.addEventListener("error", (i) => {
        s != null && s.logLevel && console.log("Couldn't connect, aborted...", i), p.reject(i);
      }), e.socket.addEventListener("open", (i) => {
        s != null && s.logLevel && console.log("Connected..."), p.resolve(t);
      }), p;
    },
    disconnect: () => e.toggle(),
    wsClient: e,
    client: t
  };
};
export {
  W as Api,
  _ as ContentType,
  A as HttpClient,
  R as WebSemaphoreHttpClientManager,
  D as WebSemaphoreWebsocketsClient,
  J as WebSemaphoreWebsocketsClientManager,
  x as WebsemaphoreHttpClient
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWpzIiwic291cmNlcyI6WyIuLi9zcmMvY2xpZW50cy9zaGFyZWQudHMiLCIuLi9zcmMvY2xpZW50cy9odHRwL2FwaS50cyIsIi4uL3NyYy9jbGllbnRzL2h0dHAvbWFuYWdlci50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9ldmVudGVtaXR0ZXIzQDUuMC4xL25vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzLnRzIiwiLi4vc3JjL2NsaWVudHMvd2Vic29ja2V0cy90cmFuc3BvcnQudHMiLCIuLi9zcmMvY2xpZW50cy93ZWJzb2NrZXRzL2NsaWVudC50cyIsIi4uL3NyYy9jbGllbnRzL3dlYnNvY2tldHMvbWFuYWdlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IGFwaVVybCA9IChwcm90b2NvbDogc3RyaW5nLCBzdGFnZTogc3RyaW5nLCBwcmVmaXg/OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7cHJvdG9jb2x9Oi8vJHtwcmVmaXggfHwgXCJcIn1hcGktJHtzdGFnZX0ud2Vic2VtYXBob3JlLmNvbS92MWBcbn07XG5cbmNvbnN0IERFRkFVTFRfUkVHSU9OID0gXCJldVwiO1xuXG5jb25zdCBzdGFnZXMgPSBbXG4gICAgXCJkZXZcIixcbiAgICBcInByb2RcIixcbiAgICBcImV1LWRldlwiLFxuICAgIFwiZXUtcHJvZFwiLFxuICAgIFwidXMtZGV2XCIsXG4gICAgXCJ1cy1wcm9kXCJcbl07XG5jb25zdCBhY3R1YWxTdGFnZSA9IChzdGFnZTogKHR5cGVvZiBzdGFnZXMpW251bWJlcl0pID0+IFtcImRldlwiLCBcInByb2RcIl0uaW5jbHVkZXMoc3RhZ2UpID8gKERFRkFVTFRfUkVHSU9OICsgXCItXCIgKyBzdGFnZSkgOiBzdGFnZTtcblxuZXhwb3J0IGNvbnN0IFdlYlNlbWFwaG9yZUFwaVVybCA9IChzdGFnZTogc3RyaW5nKSA9PiBzdGFnZXMuaW5jbHVkZXMoc3RhZ2UpICYmIGFwaVVybChcImh0dHBzXCIsIGFjdHVhbFN0YWdlKHN0YWdlKSk7XG5leHBvcnQgY29uc3QgV2ViU2VtYXBob3JlV2Vic29ja2V0c1VybCA9IChzdGFnZTogc3RyaW5nKSA9PiBzdGFnZXMuaW5jbHVkZXMoc3RhZ2UpICYmIGFwaVVybChcIndzc1wiLCBhY3R1YWxTdGFnZShzdGFnZSksIFwid3NcIik7XG5cbi8vIGV4cG9ydCBjb25zdCBDaGFpbnN0cmVhbUJhc2VVcmxzID0gc3RhZ2VzLnJlZHVjZSgodXJscywgc3RhZ2UpID0+IGFwaVVybChcImh0dHBzXCIsIGFjdHVhbFN0YWdlKHN0YWdlKSkpO1xuLy8gZXhwb3J0IGNvbnN0IENoYWluc3RyZWFtV2Vic29ja2V0c1NlcnZlcnMgPSB6aXAoc3RhZ2VzLCBzdGFnZXMubWFwKHN0YWdlID0+IGFwaVVybChcIndzc1wiLCBhY3R1YWxTdGFnZShzdGFnZSksIFwid3NhcGlcIikpKVxuXG4vLyBleHBvcnQgY29uc3QgQ2hhaW5zdHJlYW1CYXNlVXJsczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbi8vICAgXCJkZXZcIjogXCJodHRwczovL2FwaS1ldS1kZXYud2Vic2VtYXBob3JlLmNvbS92MVwiLFxuLy8gICBcInByb2RcIjogXCJodHRwczovL2FwaS53ZWJzZW1hcGhvcmUuY29tL3YxXCIsXG4vLyAgIFwidXMtZGV2XCI6IGFwaVVybChcInVzLWRldlwiKSxcbi8vICAgXCJ1cy1kZXZcIjogXCJodHRwczovL2FwaS11cy1kZXYud2Vic2VtYXBob3JlLmNvbS92MVwiLCAvL1wiaHR0cHM6Ly9hcGktZXUtZGV2LndlYnNlbWFwaG9yZS5jb20vdjFcIixcbi8vICAgXCJ1cy1wcm9kXCI6IFwiaHR0cHM6Ly9hcGktdXMud2Vic2VtYXBob3JlLmNvbS92MVwiLFxuLy8gfTtcblxuLy8gZXhwb3J0IGNvbnN0IENoYWluc3RyZWFtV2Vic29ja2V0c1NlcnZlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4vLyAgICAgXCJkZXZcIjogXCJ3c3M6Ly93c2FwaS1ldS1kZXYud2Vic2VtYXBob3JlLmNvbS92MVwiLFxuLy8gICAgIFwicHJvZFwiOiBcIndzczovL3dzYXBpLndlYnNlbWFwaG9yZS5jb20vdjFcIixcbi8vICAgICBcInVzLWRldlwiOiBcIndzczovL3dzYXBpLXVzLWRldi53ZWJzZW1hcGhvcmUuY29tL3YxXCIsXG4vLyAgICAgXCJ1cy1wcm9kXCI6IFwid3NzOi8vd3NhcGktdXMud2Vic2VtYXBob3JlLmNvbS92MVwiXG4vLyB9OyIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIyMgVEhJUyBGSUxFIFdBUyBHRU5FUkFURUQgVklBIFNXQUdHRVItVFlQRVNDUklQVC1BUEkgICAgICAgICMjXG4gKiAjIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyNcbiAqICMjIEFVVEhPUjogYWNhY29kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjI1xuICogIyMgU09VUkNFOiBodHRwczovL2dpdGh1Yi5jb20vYWNhY29kZS9zd2FnZ2VyLXR5cGVzY3JpcHQtYXBpICMjXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJVcGRhdGVQYXNzd29yZE5vcm1hbCB7XG4gIG5ldz86IHN0cmluZztcbiAgb2xkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJVcGRhdGVSZXF1ZXN0IHtcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgbGFzdE5hbWU/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIGNvdW50cnk/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIHRpY2tldD86IHN0cmluZztcbiAgb3duZXJTY29wZXM/OiBzdHJpbmdbXTtcbiAgc3Vic2NyaXB0aW9uPzoge1xuICAgIGV4cGlyZXM/OiBzdHJpbmc7XG4gICAgcHJvdmlkZXI/OiBzdHJpbmc7XG4gICAgYWN0aXZlPzogYm9vbGVhbjtcbiAgICBzdWJzY3JpcHRpb25JZD86IHN0cmluZztcbiAgICBwcm92aWRlclVzZXJJZD86IHN0cmluZztcbiAgfTtcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgZmlyc3ROYW1lPzogc3RyaW5nO1xuICBwaG9uZT86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgcGVybWlzc2lvbnM/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIG9yZ2FuaXphdGlvbj86IHN0cmluZztcbiAgb3JnYW5pemF0aW9ucz86IHN0cmluZ1tdO1xuICBpZD86IHN0cmluZztcbiAgZW1haWw/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIGFjY291bnQ/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIHN0YXR1cz86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyQ3JlYXRlUmVxdWVzdCB7XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIGxhc3ROYW1lPzogc3RyaW5nO1xuICAvKiogQGRlZmF1bHQgXCJcIiAqL1xuICBjb3VudHJ5Pzogc3RyaW5nO1xuICAvKiogQGRlZmF1bHQgXCJcIiAqL1xuICB0aWNrZXQ/OiBzdHJpbmc7XG4gIG93bmVyU2NvcGVzPzogc3RyaW5nW107XG4gIHN1YnNjcmlwdGlvbj86IHtcbiAgICBleHBpcmVzPzogc3RyaW5nO1xuICAgIHByb3ZpZGVyPzogc3RyaW5nO1xuICAgIGFjdGl2ZT86IGJvb2xlYW47XG4gICAgc3Vic2NyaXB0aW9uSWQ/OiBzdHJpbmc7XG4gICAgcHJvdmlkZXJVc2VySWQ/OiBzdHJpbmc7XG4gIH07XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIGZpcnN0TmFtZT86IHN0cmluZztcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gIHBob25lPzogc3RyaW5nO1xuICAvKiogQGRlZmF1bHQgXCJcIiAqL1xuICBwZXJtaXNzaW9ucz86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgb3JnYW5pemF0aW9uPzogc3RyaW5nO1xuICBvcmdhbml6YXRpb25zPzogc3RyaW5nW107XG4gIGlkPzogc3RyaW5nO1xuICBlbWFpbD86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgYWNjb3VudD86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgc3RhdHVzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJSZWFkUmVzcG9uc2Uge1xuICAvKiogQGRlZmF1bHQgXCJcIiAqL1xuICBsYXN0TmFtZT86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgY291bnRyeT86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgdGlja2V0Pzogc3RyaW5nO1xuICBvd25lclNjb3Blcz86IHN0cmluZ1tdO1xuICBzdWJzY3JpcHRpb24/OiB7XG4gICAgZXhwaXJlcz86IHN0cmluZztcbiAgICBwcm92aWRlcj86IHN0cmluZztcbiAgICBhY3RpdmU/OiBib29sZWFuO1xuICAgIHN1YnNjcmlwdGlvbklkPzogc3RyaW5nO1xuICAgIHByb3ZpZGVyVXNlcklkPzogc3RyaW5nO1xuICB9O1xuICAvKiogQGRlZmF1bHQgXCJcIiAqL1xuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG4gIHBob25lPzogc3RyaW5nO1xuICAvKiogQGRlZmF1bHQgXCJcIiAqL1xuICBwZXJtaXNzaW9ucz86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgb3JnYW5pemF0aW9uPzogc3RyaW5nO1xuICBvcmdhbml6YXRpb25zPzogc3RyaW5nW107XG4gIGlkPzogc3RyaW5nO1xuICBlbWFpbD86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgYWNjb3VudD86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiXCIgKi9cbiAgc3RhdHVzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25Ub2tlblJlc3BvbnNlIHtcbiAgand0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElkU2Vzc2lvblRva2VuUmVxdWVzdCB7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN0cmlwZUNoZWNrb3V0U2Vzc2lvbkNyZWF0ZVJlc3BvbnNlID0gb2JqZWN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmlwZUNoZWNrb3V0U2Vzc2lvbkNyZWF0ZVJlcXVlc3Qge1xuICBwYXltZW50TWV0aG9kSWQ6IHN0cmluZztcbiAgY3VzdG9tZXJJZDogc3RyaW5nO1xuICBwcmljZUlkPzogc3RyaW5nO1xufVxuXG4vKiogU2VtYXBob3JlU3luY0xvY2tSZXNwb25zZSBNb2RlbCAqL1xuZXhwb3J0IGludGVyZmFjZSBTZW1hcGhvcmVTeW5jTG9ja1Jlc3BvbnNlIHtcbiAgc2VtYXBob3JlSWQ6IHN0cmluZztcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIGNoYW5uZWxJZD86IHN0cmluZztcbn1cblxuLyoqIFNlbWFwaG9yZUpvYlJlYWRSZXNwb25zZSBNb2RlbCAqL1xuZXhwb3J0IGludGVyZmFjZSBTZW1hcGhvcmVKb2JSZWFkUmVzcG9uc2Uge1xuICBjcmVhdGVkPzogc3RyaW5nO1xuICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gIGVycm9yPzogc3RyaW5nO1xuICB0aW1lcj86IHtcbiAgICBjcm4/OiBzdHJpbmc7XG4gIH07XG4gIGRlbGV0ZWQ/OiBib29sZWFuO1xuICBwYXlsb2FkPzogb2JqZWN0O1xuICBtZXRhPzoge1xuICAgIHJvdXRpbmc/OiB7XG4gICAgICBwcm90b2NvbD86IHN0cmluZztcbiAgICAgIHVybD86IHN0cmluZztcbiAgICAgIHJlbW90ZUlkPzogc3RyaW5nO1xuICAgIH07XG4gIH07XG4gIHNlbWFwaG9yZT86IHtcbiAgICBvd25lcj86IHN0cmluZztcbiAgICBtYXBwaW5nPzoge1xuICAgICAgY2FuT3ZlcnJpZGVSb3V0aW5nPzogYm9vbGVhbjtcbiAgICAgIGhhbmRsZXI/OiBzdHJpbmc7XG4gICAgICBpbnB1dERhdGE/OiBzdHJpbmc7XG4gICAgICBtYXhFeGVjdXRpb25UaW1lPzogbnVtYmVyO1xuICAgICAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gICAgICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gICAgfTtcbiAgICBtYXhWYWx1ZT86IG51bWJlcjtcbiAgICBjcmVhdGVkPzogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgICB0aW1lb3V0Pzoge1xuICAgICAgdmFsdWU/OiBudW1iZXI7XG4gICAgICBzaW5jZT86IHN0cmluZztcbiAgICB9O1xuICAgIG1ldGE/OiB7XG4gICAgICBqb2JDcm5JbmplY3Rpb25Qb2ludD86IHN0cmluZztcbiAgICB9O1xuICAgIHdlYnNlbWFwaG9yZT86IHtcbiAgICAgIGNoYW5uZWxDcm4/OiBzdHJpbmc7XG4gICAgICByZWxlYXNlPzogYm9vbGVhbjtcbiAgICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgICB9O1xuICAgIGNhbGxiYWNrPzoge1xuICAgICAgcHJvdG9jb2w/OiBzdHJpbmc7XG4gICAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgICAgbWV0aG9kPzogc3RyaW5nO1xuICAgICAgb25EZWxpdmVyeUVycm9yPzogc3RyaW5nO1xuICAgICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICAgIH07XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgdXBkYXRlZD86IHN0cmluZztcbiAgICBtYXhWYWx1ZVNjb3BlPzogc3RyaW5nO1xuICAgIHdlYnNvY2tldHM/OiB7XG4gICAgICBvbkNsaWVudERyb3BwZWQ/OiBzdHJpbmc7XG4gICAgICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gICAgICBhbGxvd0NvbnRpbnVlZFNlc3Npb25zPzogYm9vbGVhbjtcbiAgICB9O1xuICB9O1xuICBhdHRyaWJ1dGVzPzoge1xuICAgIERlYWRMZXR0ZXJRdWV1ZVNvdXJjZUFybj86IHN0cmluZztcbiAgICBBV1NUcmFjZUhlYWRlcj86IHN0cmluZztcbiAgICBBcHByb3hpbWF0ZVJlY2VpdmVDb3VudD86IHN0cmluZztcbiAgICBTZW50VGltZXN0YW1wPzogc3RyaW5nO1xuICAgIFNlcXVlbmNlTnVtYmVyPzogc3RyaW5nO1xuICAgIG1lc3NhZ2VJZD86IHN0cmluZztcbiAgICBNZXNzYWdlR3JvdXBJZD86IHN0cmluZztcbiAgICBTZW5kZXJJZD86IHN0cmluZztcbiAgICBNZXNzYWdlRGVkdXBsaWNhdGlvbklkPzogc3RyaW5nO1xuICAgIEFwcHJveGltYXRlRmlyc3RSZWNlaXZlVGltZXN0YW1wPzogc3RyaW5nO1xuICB9O1xuICB1cGRhdGVkPzogc3RyaW5nO1xuICBjcm4/OiBzdHJpbmc7XG4gIGxhc3RTdGF0dXM/OiBzdHJpbmc7XG4gIGNoYW5uZWxJZD86IHN0cmluZztcbiAgc3RhdHVzPzogc3RyaW5nO1xufVxuXG4vKiogU2VtYXBob3JlTG9ja1JlcXVlc3QgTW9kZWwgKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VtYXBob3JlTG9ja1JlcXVlc3Qge1xuICBpZD86IHN0cmluZztcbiAgYm9keT86IHN0cmluZztcbiAgY3JuPzogc3RyaW5nO1xuICBjaGFubmVsSWQ/OiBzdHJpbmc7XG59XG5cbi8qKiBQYWdlZFNlbWFwaG9yZUxpc3RSZWFkUmVzcG9uc2UgTW9kZWwgKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZWRTZW1hcGhvcmVMaXN0UmVhZFJlc3BvbnNlIHtcbiAgSXRlbXM/OiB7XG4gICAgb3duZXI/OiBzdHJpbmc7XG4gICAgbWFwcGluZz86IHtcbiAgICAgIGNhbk92ZXJyaWRlUm91dGluZz86IGJvb2xlYW47XG4gICAgICBoYW5kbGVyPzogc3RyaW5nO1xuICAgICAgaW5wdXREYXRhPzogc3RyaW5nO1xuICAgICAgbWF4RXhlY3V0aW9uVGltZT86IG51bWJlcjtcbiAgICAgIGxhbmd1YWdlPzogc3RyaW5nO1xuICAgICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICAgIH07XG4gICAgbWF4VmFsdWU/OiBudW1iZXI7XG4gICAgY3JlYXRlZD86IHN0cmluZztcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gICAgdGltZW91dD86IHtcbiAgICAgIHZhbHVlPzogbnVtYmVyO1xuICAgICAgc2luY2U/OiBzdHJpbmc7XG4gICAgfTtcbiAgICBtZXRhPzoge1xuICAgICAgam9iQ3JuSW5qZWN0aW9uUG9pbnQ/OiBzdHJpbmc7XG4gICAgfTtcbiAgICB3ZWJzZW1hcGhvcmU/OiB7XG4gICAgICBjaGFubmVsQ3JuPzogc3RyaW5nO1xuICAgICAgcmVsZWFzZT86IGJvb2xlYW47XG4gICAgICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gICAgfTtcbiAgICBjYWxsYmFjaz86IHtcbiAgICAgIHByb3RvY29sPzogc3RyaW5nO1xuICAgICAgYWRkcmVzcz86IHN0cmluZztcbiAgICAgIG1ldGhvZD86IHN0cmluZztcbiAgICAgIG9uRGVsaXZlcnlFcnJvcj86IHN0cmluZztcbiAgICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgICB9O1xuICAgIGlkPzogc3RyaW5nO1xuICAgIHVwZGF0ZWQ/OiBzdHJpbmc7XG4gICAgbWF4VmFsdWVTY29wZT86IHN0cmluZztcbiAgICB3ZWJzb2NrZXRzPzoge1xuICAgICAgb25DbGllbnREcm9wcGVkPzogc3RyaW5nO1xuICAgICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICAgICAgYWxsb3dDb250aW51ZWRTZXNzaW9ucz86IGJvb2xlYW47XG4gICAgfTtcbiAgfVtdO1xuICBDb3VudD86IG51bWJlcjtcbiAgU2Nhbm5lZENvdW50PzogbnVtYmVyO1xuICBMYXN0RXZhbHVhdGVkS2V5Pzogc3RyaW5nO1xufVxuXG4vKiogU2VtYXBob3JlVXBzZXJ0UmVxdWVzdCBNb2RlbCAqL1xuZXhwb3J0IGludGVyZmFjZSBTZW1hcGhvcmVVcHNlcnRSZXF1ZXN0IHtcbiAgb3duZXI/OiBzdHJpbmc7XG4gIG1hcHBpbmc/OiB7XG4gICAgY2FuT3ZlcnJpZGVSb3V0aW5nPzogYm9vbGVhbjtcbiAgICBoYW5kbGVyPzogc3RyaW5nO1xuICAgIGlucHV0RGF0YT86IHN0cmluZztcbiAgICBtYXhFeGVjdXRpb25UaW1lPzogbnVtYmVyO1xuICAgIGxhbmd1YWdlPzogc3RyaW5nO1xuICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgfTtcbiAgbWF4VmFsdWU/OiBudW1iZXI7XG4gIGNyZWF0ZWQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gIHRpbWVvdXQ/OiB7XG4gICAgdmFsdWU/OiBudW1iZXI7XG4gICAgc2luY2U/OiBzdHJpbmc7XG4gIH07XG4gIG1ldGE/OiB7XG4gICAgam9iQ3JuSW5qZWN0aW9uUG9pbnQ/OiBzdHJpbmc7XG4gIH07XG4gIHdlYnNlbWFwaG9yZT86IHtcbiAgICBjaGFubmVsQ3JuPzogc3RyaW5nO1xuICAgIHJlbGVhc2U/OiBib29sZWFuO1xuICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgfTtcbiAgY2FsbGJhY2s/OiB7XG4gICAgcHJvdG9jb2w/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgICBtZXRob2Q/OiBzdHJpbmc7XG4gICAgb25EZWxpdmVyeUVycm9yPzogc3RyaW5nO1xuICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgfTtcbiAgaWQ/OiBzdHJpbmc7XG4gIHVwZGF0ZWQ/OiBzdHJpbmc7XG4gIG1heFZhbHVlU2NvcGU/OiBzdHJpbmc7XG4gIHdlYnNvY2tldHM/OiB7XG4gICAgb25DbGllbnREcm9wcGVkPzogc3RyaW5nO1xuICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgICBhbGxvd0NvbnRpbnVlZFNlc3Npb25zPzogYm9vbGVhbjtcbiAgfTtcbn1cblxuLyoqIFNlbWFwaG9yZVJlYWRSZXNwb25zZSBNb2RlbCAqL1xuZXhwb3J0IGludGVyZmFjZSBTZW1hcGhvcmVSZWFkUmVzcG9uc2Uge1xuICBvd25lcj86IHN0cmluZztcbiAgbWFwcGluZz86IHtcbiAgICBjYW5PdmVycmlkZVJvdXRpbmc/OiBib29sZWFuO1xuICAgIGhhbmRsZXI/OiBzdHJpbmc7XG4gICAgaW5wdXREYXRhPzogc3RyaW5nO1xuICAgIG1heEV4ZWN1dGlvblRpbWU/OiBudW1iZXI7XG4gICAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICB9O1xuICBtYXhWYWx1ZT86IG51bWJlcjtcbiAgY3JlYXRlZD86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgdGltZW91dD86IHtcbiAgICB2YWx1ZT86IG51bWJlcjtcbiAgICBzaW5jZT86IHN0cmluZztcbiAgfTtcbiAgbWV0YT86IHtcbiAgICBqb2JDcm5JbmplY3Rpb25Qb2ludD86IHN0cmluZztcbiAgfTtcbiAgd2Vic2VtYXBob3JlPzoge1xuICAgIGNoYW5uZWxDcm4/OiBzdHJpbmc7XG4gICAgcmVsZWFzZT86IGJvb2xlYW47XG4gICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICB9O1xuICBjYWxsYmFjaz86IHtcbiAgICBwcm90b2NvbD86IHN0cmluZztcbiAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgIG1ldGhvZD86IHN0cmluZztcbiAgICBvbkRlbGl2ZXJ5RXJyb3I/OiBzdHJpbmc7XG4gICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICB9O1xuICBpZD86IHN0cmluZztcbiAgdXBkYXRlZD86IHN0cmluZztcbiAgbWF4VmFsdWVTY29wZT86IHN0cmluZztcbiAgd2Vic29ja2V0cz86IHtcbiAgICBvbkNsaWVudERyb3BwZWQ/OiBzdHJpbmc7XG4gICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICAgIGFsbG93Q29udGludWVkU2Vzc2lvbnM/OiBib29sZWFuO1xuICB9O1xufVxuXG4vKiogUGFnZWRTZW1hcGhvcmVSZWFkUXVldWVSZXNwb25zZSBNb2RlbCAqL1xuZXhwb3J0IGludGVyZmFjZSBQYWdlZFNlbWFwaG9yZVJlYWRRdWV1ZVJlc3BvbnNlIHtcbiAgSXRlbXM/OiB7XG4gICAgY3JlYXRlZD86IHN0cmluZztcbiAgICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gICAgZXJyb3I/OiBzdHJpbmc7XG4gICAgdGltZXI/OiB7XG4gICAgICBjcm4/OiBzdHJpbmc7XG4gICAgfTtcbiAgICBkZWxldGVkPzogYm9vbGVhbjtcbiAgICBwYXlsb2FkPzogb2JqZWN0O1xuICAgIG1ldGE/OiB7XG4gICAgICByb3V0aW5nPzoge1xuICAgICAgICBwcm90b2NvbD86IHN0cmluZztcbiAgICAgICAgdXJsPzogc3RyaW5nO1xuICAgICAgICByZW1vdGVJZD86IHN0cmluZztcbiAgICAgIH07XG4gICAgfTtcbiAgICBzZW1hcGhvcmU/OiB7XG4gICAgICBvd25lcj86IHN0cmluZztcbiAgICAgIG1hcHBpbmc/OiB7XG4gICAgICAgIGNhbk92ZXJyaWRlUm91dGluZz86IGJvb2xlYW47XG4gICAgICAgIGhhbmRsZXI/OiBzdHJpbmc7XG4gICAgICAgIGlucHV0RGF0YT86IHN0cmluZztcbiAgICAgICAgbWF4RXhlY3V0aW9uVGltZT86IG51bWJlcjtcbiAgICAgICAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gICAgICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgICAgIH07XG4gICAgICBtYXhWYWx1ZT86IG51bWJlcjtcbiAgICAgIGNyZWF0ZWQ/OiBzdHJpbmc7XG4gICAgICB0aXRsZT86IHN0cmluZztcbiAgICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgICAgIHRpbWVvdXQ/OiB7XG4gICAgICAgIHZhbHVlPzogbnVtYmVyO1xuICAgICAgICBzaW5jZT86IHN0cmluZztcbiAgICAgIH07XG4gICAgICBtZXRhPzoge1xuICAgICAgICBqb2JDcm5JbmplY3Rpb25Qb2ludD86IHN0cmluZztcbiAgICAgIH07XG4gICAgICB3ZWJzZW1hcGhvcmU/OiB7XG4gICAgICAgIGNoYW5uZWxDcm4/OiBzdHJpbmc7XG4gICAgICAgIHJlbGVhc2U/OiBib29sZWFuO1xuICAgICAgICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gICAgICB9O1xuICAgICAgY2FsbGJhY2s/OiB7XG4gICAgICAgIHByb3RvY29sPzogc3RyaW5nO1xuICAgICAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgICAgICBtZXRob2Q/OiBzdHJpbmc7XG4gICAgICAgIG9uRGVsaXZlcnlFcnJvcj86IHN0cmluZztcbiAgICAgICAgaXNBY3RpdmU/OiBib29sZWFuO1xuICAgICAgfTtcbiAgICAgIGlkPzogc3RyaW5nO1xuICAgICAgdXBkYXRlZD86IHN0cmluZztcbiAgICAgIG1heFZhbHVlU2NvcGU/OiBzdHJpbmc7XG4gICAgICB3ZWJzb2NrZXRzPzoge1xuICAgICAgICBvbkNsaWVudERyb3BwZWQ/OiBzdHJpbmc7XG4gICAgICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgICAgICAgYWxsb3dDb250aW51ZWRTZXNzaW9ucz86IGJvb2xlYW47XG4gICAgICB9O1xuICAgIH07XG4gICAgYXR0cmlidXRlcz86IHtcbiAgICAgIERlYWRMZXR0ZXJRdWV1ZVNvdXJjZUFybj86IHN0cmluZztcbiAgICAgIEFXU1RyYWNlSGVhZGVyPzogc3RyaW5nO1xuICAgICAgQXBwcm94aW1hdGVSZWNlaXZlQ291bnQ/OiBzdHJpbmc7XG4gICAgICBTZW50VGltZXN0YW1wPzogc3RyaW5nO1xuICAgICAgU2VxdWVuY2VOdW1iZXI/OiBzdHJpbmc7XG4gICAgICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gICAgICBNZXNzYWdlR3JvdXBJZD86IHN0cmluZztcbiAgICAgIFNlbmRlcklkPzogc3RyaW5nO1xuICAgICAgTWVzc2FnZURlZHVwbGljYXRpb25JZD86IHN0cmluZztcbiAgICAgIEFwcHJveGltYXRlRmlyc3RSZWNlaXZlVGltZXN0YW1wPzogc3RyaW5nO1xuICAgIH07XG4gICAgdXBkYXRlZD86IHN0cmluZztcbiAgICBjcm4/OiBzdHJpbmc7XG4gICAgbGFzdFN0YXR1cz86IHN0cmluZztcbiAgICBjaGFubmVsSWQ/OiBzdHJpbmc7XG4gICAgc3RhdHVzPzogc3RyaW5nO1xuICB9W107XG4gIENvdW50PzogbnVtYmVyO1xuICBTY2FubmVkQ291bnQ/OiBudW1iZXI7XG4gIExhc3RFdmFsdWF0ZWRLZXk/OiBzdHJpbmc7XG59XG5cbi8qKiBTZW1hcGhvcmVKb2JTdGF0ZVRyYW5zZm9ybVJlcXVlc3QgTW9kZWwgKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0IHtcbiAgam9iQ3JuPzogc3RyaW5nO1xufVxuXG4vKiogU2VtYXBob3JlQ2hhbm5lbCBNb2RlbCAqL1xuZXhwb3J0IGludGVyZmFjZSBTZW1hcGhvcmVDaGFubmVsIHtcbiAgY2hhbm5lbElkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsVXBzZXJ0UmVzcG9uc2Uge1xuICAvKiogQGRlZmF1bHQgZmFsc2UgKi9cbiAgc3VjY2Vzcz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxVcHNlcnRSZXF1ZXN0IHtcbiAgLyoqIEBkZWZhdWx0IFwidHJ1ZVwiICovXG4gIHJlZmVyZW5jZT86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IFwiRGVmYXVsdCB0aXRsZVwiICovXG4gIG5hbWU/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcIlwiICovXG4gIGVtYWlsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFwaWtleVBhZ2VkTGlzdE93bmVyS2V5c1Jlc3BvbnNlIHtcbiAgSXRlbXM/OiB7XG4gICAgb3duZXI/OiBzdHJpbmc7XG4gICAgbWFza0tleT86IHN0cmluZztcbiAgICAvKiogQGRlZmF1bHQgXCJyZWYgbnVtYmVyXCIgKi9cbiAgICByZWZlcmVuY2U/OiBzdHJpbmc7XG4gICAgbGFzdFVzZWQ/OiBudW1iZXI7XG4gICAgY3JlYXRlZD86IHN0cmluZztcbiAgICB0b3RhbFVzZWQ/OiBudW1iZXI7XG4gICAgLyoqIEBkZWZhdWx0IFwiRGVmYXVsdCB0aXRsZVwiICovXG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgLyoqIEBkZWZhdWx0IHRydWUgKi9cbiAgICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gICAgLyoqIEBkZWZhdWx0IFwiMFwiICovXG4gICAgdXBkYXRlZD86IHN0cmluZztcbiAgICBoYXNoPzogc3RyaW5nO1xuICAgIC8qKiBAZGVmYXVsdCBcInRydWVcIiAqL1xuICAgIHBvbGljeT86IHN0cmluZztcbiAgfVtdO1xuICBDb3VudD86IG51bWJlcjtcbiAgU2Nhbm5lZENvdW50PzogbnVtYmVyO1xuICBMYXN0RXZhbHVhdGVkS2V5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFwaWtleVVwc2VydFJlc3BvbnNlIHtcbiAgLyoqIEBkZWZhdWx0IGZhbHNlICovXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xuICAvKiogQGRlZmF1bHQgXCJcIiAqL1xuICBrZXk/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcInRydWVcIiAqL1xuICBwb2xpY3k/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBpa2V5VXBzZXJ0UmVxdWVzdCB7XG4gIC8qKiBAZGVmYXVsdCBcInJlZiBudW1iZXJcIiAqL1xuICByZWZlcmVuY2U/OiBzdHJpbmc7XG4gIC8qKiBAZGVmYXVsdCBcIkRlZmF1bHQgdGl0bGVcIiAqL1xuICB0aXRsZT86IHN0cmluZztcbiAgLyoqIEBkZWZhdWx0IHRydWUgKi9cbiAgaXNBY3RpdmU/OiBib29sZWFuO1xuICAvKiogQGRlZmF1bHQgXCJ0cnVlXCIgKi9cbiAgcG9saWN5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9rUmVzcG9uc2Uge1xuICBvaz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSZXNwb25zZSB7XG4gIGVycm9yTWVzc2FnZT86IHN0cmluZztcbiAgZXJyb3JDb2RlPzogc3RyaW5nO1xuICBzdGF0dXNDb2RlPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBBbnlSZXNwb25zZSA9IG9iamVjdDtcblxuZXhwb3J0IHR5cGUgR2VuZXJhdGVNYXBwaW5nUmVzcG9uc2UgPSBzdHJpbmc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VuZXJhdGVNYXBwaW5nUmVxdWVzdCB7XG4gIG91dHB1dDogc3RyaW5nO1xuICBkYXRhOiBzdHJpbmc7XG4gIGNvbnRleHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgUXVlcnlQYXJhbXNUeXBlID0gUmVjb3JkPHN0cmluZyB8IG51bWJlciwgYW55PjtcbmV4cG9ydCB0eXBlIFJlc3BvbnNlRm9ybWF0ID0ga2V5b2YgT21pdDxCb2R5LCBcImJvZHlcIiB8IFwiYm9keVVzZWRcIj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnVsbFJlcXVlc3RQYXJhbXMgZXh0ZW5kcyBPbWl0PFJlcXVlc3RJbml0LCBcImJvZHlcIj4ge1xuICAvKiogc2V0IHBhcmFtZXRlciB0byBgdHJ1ZWAgZm9yIGNhbGwgYHNlY3VyaXR5V29ya2VyYCBmb3IgdGhpcyByZXF1ZXN0ICovXG4gIHNlY3VyZT86IGJvb2xlYW47XG4gIC8qKiByZXF1ZXN0IHBhdGggKi9cbiAgcGF0aDogc3RyaW5nO1xuICAvKiogY29udGVudCB0eXBlIG9mIHJlcXVlc3QgYm9keSAqL1xuICB0eXBlPzogQ29udGVudFR5cGU7XG4gIC8qKiBxdWVyeSBwYXJhbXMgKi9cbiAgcXVlcnk/OiBRdWVyeVBhcmFtc1R5cGU7XG4gIC8qKiBmb3JtYXQgb2YgcmVzcG9uc2UgKGkuZS4gcmVzcG9uc2UuanNvbigpIC0+IGZvcm1hdDogXCJqc29uXCIpICovXG4gIGZvcm1hdD86IFJlc3BvbnNlRm9ybWF0O1xuICAvKiogcmVxdWVzdCBib2R5ICovXG4gIGJvZHk/OiB1bmtub3duO1xuICAvKiogYmFzZSB1cmwgKi9cbiAgYmFzZVVybD86IHN0cmluZztcbiAgLyoqIHJlcXVlc3QgY2FuY2VsbGF0aW9uIHRva2VuICovXG4gIGNhbmNlbFRva2VuPzogQ2FuY2VsVG9rZW47XG59XG5cbmV4cG9ydCB0eXBlIFJlcXVlc3RQYXJhbXMgPSBPbWl0PEZ1bGxSZXF1ZXN0UGFyYW1zLCBcImJvZHlcIiB8IFwibWV0aG9kXCIgfCBcInF1ZXJ5XCIgfCBcInBhdGhcIj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBpQ29uZmlnPFNlY3VyaXR5RGF0YVR5cGUgPSB1bmtub3duPiB7XG4gIGJhc2VVcmw/OiBzdHJpbmc7XG4gIGJhc2VBcGlQYXJhbXM/OiBPbWl0PFJlcXVlc3RQYXJhbXMsIFwiYmFzZVVybFwiIHwgXCJjYW5jZWxUb2tlblwiIHwgXCJzaWduYWxcIj47XG4gIHNlY3VyaXR5V29ya2VyPzogKHNlY3VyaXR5RGF0YTogU2VjdXJpdHlEYXRhVHlwZSB8IG51bGwpID0+IFByb21pc2U8UmVxdWVzdFBhcmFtcyB8IHZvaWQ+IHwgUmVxdWVzdFBhcmFtcyB8IHZvaWQ7XG4gIGN1c3RvbUZldGNoPzogdHlwZW9mIGZldGNoO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBSZXNwb25zZTxEIGV4dGVuZHMgdW5rbm93biwgRSBleHRlbmRzIHVua25vd24gPSB1bmtub3duPiBleHRlbmRzIFJlc3BvbnNlIHtcbiAgZGF0YTogRDtcbiAgZXJyb3I6IEU7XG59XG5cbnR5cGUgQ2FuY2VsVG9rZW4gPSBTeW1ib2wgfCBzdHJpbmcgfCBudW1iZXI7XG5cbmV4cG9ydCBlbnVtIENvbnRlbnRUeXBlIHtcbiAgSnNvbiA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICBGb3JtRGF0YSA9IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxuICBVcmxFbmNvZGVkID0gXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgVGV4dCA9IFwidGV4dC9wbGFpblwiLFxufVxuXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudDxTZWN1cml0eURhdGFUeXBlID0gdW5rbm93bj4ge1xuICBwdWJsaWMgYmFzZVVybDogc3RyaW5nID0gXCJodHRwczovL2FwaS11cy1kZXYud2Vic2VtYXBob3JlLmNvbS92MVwiO1xuICBwcml2YXRlIHNlY3VyaXR5RGF0YTogU2VjdXJpdHlEYXRhVHlwZSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNlY3VyaXR5V29ya2VyPzogQXBpQ29uZmlnPFNlY3VyaXR5RGF0YVR5cGU+W1wic2VjdXJpdHlXb3JrZXJcIl07XG4gIHByaXZhdGUgYWJvcnRDb250cm9sbGVycyA9IG5ldyBNYXA8Q2FuY2VsVG9rZW4sIEFib3J0Q29udHJvbGxlcj4oKTtcbiAgcHJpdmF0ZSBjdXN0b21GZXRjaCA9ICguLi5mZXRjaFBhcmFtczogUGFyYW1ldGVyczx0eXBlb2YgZmV0Y2g+KSA9PiBmZXRjaCguLi5mZXRjaFBhcmFtcyk7XG5cbiAgcHJpdmF0ZSBiYXNlQXBpUGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge1xuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgaGVhZGVyczoge30sXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsXG4gICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihhcGlDb25maWc6IEFwaUNvbmZpZzxTZWN1cml0eURhdGFUeXBlPiA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcGlDb25maWcpO1xuICB9XG5cbiAgcHVibGljIHNldFNlY3VyaXR5RGF0YSA9IChkYXRhOiBTZWN1cml0eURhdGFUeXBlIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2VjdXJpdHlEYXRhID0gZGF0YTtcbiAgfTtcblxuICBwcm90ZWN0ZWQgZW5jb2RlUXVlcnlQYXJhbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGVuY29kZWRLZXkgPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICByZXR1cm4gYCR7ZW5jb2RlZEtleX09JHtlbmNvZGVVUklDb21wb25lbnQodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiID8gdmFsdWUgOiBgJHt2YWx1ZX1gKX1gO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZFF1ZXJ5UGFyYW0ocXVlcnk6IFF1ZXJ5UGFyYW1zVHlwZSwga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbmNvZGVRdWVyeVBhcmFtKGtleSwgcXVlcnlba2V5XSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkQXJyYXlRdWVyeVBhcmFtKHF1ZXJ5OiBRdWVyeVBhcmFtc1R5cGUsIGtleTogc3RyaW5nKSB7XG4gICAgY29uc3QgdmFsdWUgPSBxdWVyeVtrZXldO1xuICAgIHJldHVybiB2YWx1ZS5tYXAoKHY6IGFueSkgPT4gdGhpcy5lbmNvZGVRdWVyeVBhcmFtKGtleSwgdikpLmpvaW4oXCImXCIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRvUXVlcnlTdHJpbmcocmF3UXVlcnk/OiBRdWVyeVBhcmFtc1R5cGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IHF1ZXJ5ID0gcmF3UXVlcnkgfHwge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5KS5maWx0ZXIoKGtleSkgPT4gXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIHF1ZXJ5W2tleV0pO1xuICAgIHJldHVybiBrZXlzXG4gICAgICAubWFwKChrZXkpID0+IChBcnJheS5pc0FycmF5KHF1ZXJ5W2tleV0pID8gdGhpcy5hZGRBcnJheVF1ZXJ5UGFyYW0ocXVlcnksIGtleSkgOiB0aGlzLmFkZFF1ZXJ5UGFyYW0ocXVlcnksIGtleSkpKVxuICAgICAgLmpvaW4oXCImXCIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZFF1ZXJ5UGFyYW1zKHJhd1F1ZXJ5PzogUXVlcnlQYXJhbXNUeXBlKTogc3RyaW5nIHtcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHRoaXMudG9RdWVyeVN0cmluZyhyYXdRdWVyeSk7XG4gICAgcmV0dXJuIHF1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiBcIlwiO1xuICB9XG5cbiAgcHJpdmF0ZSBjb250ZW50Rm9ybWF0dGVyczogUmVjb3JkPENvbnRlbnRUeXBlLCAoaW5wdXQ6IGFueSkgPT4gYW55PiA9IHtcbiAgICBbQ29udGVudFR5cGUuSnNvbl06IChpbnB1dDogYW55KSA9PlxuICAgICAgaW5wdXQgIT09IG51bGwgJiYgKHR5cGVvZiBpbnB1dCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIpID8gSlNPTi5zdHJpbmdpZnkoaW5wdXQpIDogaW5wdXQsXG4gICAgW0NvbnRlbnRUeXBlLlRleHRdOiAoaW5wdXQ6IGFueSkgPT4gKGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCAhPT0gXCJzdHJpbmdcIiA/IEpTT04uc3RyaW5naWZ5KGlucHV0KSA6IGlucHV0KSxcbiAgICBbQ29udGVudFR5cGUuRm9ybURhdGFdOiAoaW5wdXQ6IGFueSkgPT5cbiAgICAgIE9iamVjdC5rZXlzKGlucHV0IHx8IHt9KS5yZWR1Y2UoKGZvcm1EYXRhLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBpbnB1dFtrZXldO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHByb3BlcnR5IGluc3RhbmNlb2YgQmxvYlxuICAgICAgICAgICAgPyBwcm9wZXJ0eVxuICAgICAgICAgICAgOiB0eXBlb2YgcHJvcGVydHkgPT09IFwib2JqZWN0XCIgJiYgcHJvcGVydHkgIT09IG51bGxcbiAgICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeShwcm9wZXJ0eSlcbiAgICAgICAgICAgICAgOiBgJHtwcm9wZXJ0eX1gLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZm9ybURhdGE7XG4gICAgICB9LCBuZXcgRm9ybURhdGEoKSksXG4gICAgW0NvbnRlbnRUeXBlLlVybEVuY29kZWRdOiAoaW5wdXQ6IGFueSkgPT4gdGhpcy50b1F1ZXJ5U3RyaW5nKGlucHV0KSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgbWVyZ2VSZXF1ZXN0UGFyYW1zKHBhcmFtczE6IFJlcXVlc3RQYXJhbXMsIHBhcmFtczI/OiBSZXF1ZXN0UGFyYW1zKTogUmVxdWVzdFBhcmFtcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuYmFzZUFwaVBhcmFtcyxcbiAgICAgIC4uLnBhcmFtczEsXG4gICAgICAuLi4ocGFyYW1zMiB8fCB7fSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC4uLih0aGlzLmJhc2VBcGlQYXJhbXMuaGVhZGVycyB8fCB7fSksXG4gICAgICAgIC4uLihwYXJhbXMxLmhlYWRlcnMgfHwge30pLFxuICAgICAgICAuLi4oKHBhcmFtczIgJiYgcGFyYW1zMi5oZWFkZXJzKSB8fCB7fSksXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlQWJvcnRTaWduYWwgPSAoY2FuY2VsVG9rZW46IENhbmNlbFRva2VuKTogQWJvcnRTaWduYWwgfCB1bmRlZmluZWQgPT4ge1xuICAgIGlmICh0aGlzLmFib3J0Q29udHJvbGxlcnMuaGFzKGNhbmNlbFRva2VuKSkge1xuICAgICAgY29uc3QgYWJvcnRDb250cm9sbGVyID0gdGhpcy5hYm9ydENvbnRyb2xsZXJzLmdldChjYW5jZWxUb2tlbik7XG4gICAgICBpZiAoYWJvcnRDb250cm9sbGVyKSB7XG4gICAgICAgIHJldHVybiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgdGhpcy5hYm9ydENvbnRyb2xsZXJzLnNldChjYW5jZWxUb2tlbiwgYWJvcnRDb250cm9sbGVyKTtcbiAgICByZXR1cm4gYWJvcnRDb250cm9sbGVyLnNpZ25hbDtcbiAgfTtcblxuICBwdWJsaWMgYWJvcnRSZXF1ZXN0ID0gKGNhbmNlbFRva2VuOiBDYW5jZWxUb2tlbikgPT4ge1xuICAgIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IHRoaXMuYWJvcnRDb250cm9sbGVycy5nZXQoY2FuY2VsVG9rZW4pO1xuXG4gICAgaWYgKGFib3J0Q29udHJvbGxlcikge1xuICAgICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gICAgICB0aGlzLmFib3J0Q29udHJvbGxlcnMuZGVsZXRlKGNhbmNlbFRva2VuKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIHJlcXVlc3QgPSBhc3luYyA8VCA9IGFueSwgRSA9IGFueT4oe1xuICAgIGJvZHksXG4gICAgc2VjdXJlLFxuICAgIHBhdGgsXG4gICAgdHlwZSxcbiAgICBxdWVyeSxcbiAgICBmb3JtYXQsXG4gICAgYmFzZVVybCxcbiAgICBjYW5jZWxUb2tlbixcbiAgICAuLi5wYXJhbXNcbiAgfTogRnVsbFJlcXVlc3RQYXJhbXMpOiBQcm9taXNlPEh0dHBSZXNwb25zZTxULCBFPj4gPT4ge1xuICAgIGNvbnN0IHNlY3VyZVBhcmFtcyA9XG4gICAgICAoKHR5cGVvZiBzZWN1cmUgPT09IFwiYm9vbGVhblwiID8gc2VjdXJlIDogdGhpcy5iYXNlQXBpUGFyYW1zLnNlY3VyZSkgJiZcbiAgICAgICAgdGhpcy5zZWN1cml0eVdvcmtlciAmJlxuICAgICAgICAoYXdhaXQgdGhpcy5zZWN1cml0eVdvcmtlcih0aGlzLnNlY3VyaXR5RGF0YSkpKSB8fFxuICAgICAge307XG4gICAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IHRoaXMubWVyZ2VSZXF1ZXN0UGFyYW1zKHBhcmFtcywgc2VjdXJlUGFyYW1zKTtcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHF1ZXJ5ICYmIHRoaXMudG9RdWVyeVN0cmluZyhxdWVyeSk7XG4gICAgY29uc3QgcGF5bG9hZEZvcm1hdHRlciA9IHRoaXMuY29udGVudEZvcm1hdHRlcnNbdHlwZSB8fCBDb250ZW50VHlwZS5Kc29uXTtcbiAgICBjb25zdCByZXNwb25zZUZvcm1hdCA9IGZvcm1hdCB8fCByZXF1ZXN0UGFyYW1zLmZvcm1hdDtcblxuICAgIHJldHVybiB0aGlzLmN1c3RvbUZldGNoKGAke2Jhc2VVcmwgfHwgdGhpcy5iYXNlVXJsIHx8IFwiXCJ9JHtwYXRofSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6IFwiXCJ9YCwge1xuICAgICAgLi4ucmVxdWVzdFBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLi4uKHJlcXVlc3RQYXJhbXMuaGVhZGVycyB8fCB7fSksXG4gICAgICAgIC4uLih0eXBlICYmIHR5cGUgIT09IENvbnRlbnRUeXBlLkZvcm1EYXRhID8geyBcIkNvbnRlbnQtVHlwZVwiOiB0eXBlIH0gOiB7fSksXG4gICAgICB9LFxuICAgICAgc2lnbmFsOiAoY2FuY2VsVG9rZW4gPyB0aGlzLmNyZWF0ZUFib3J0U2lnbmFsKGNhbmNlbFRva2VuKSA6IHJlcXVlc3RQYXJhbXMuc2lnbmFsKSB8fCBudWxsLFxuICAgICAgYm9keTogdHlwZW9mIGJvZHkgPT09IFwidW5kZWZpbmVkXCIgfHwgYm9keSA9PT0gbnVsbCA/IG51bGwgOiBwYXlsb2FkRm9ybWF0dGVyKGJvZHkpLFxuICAgIH0pLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zdCByID0gcmVzcG9uc2UuY2xvbmUoKSBhcyBIdHRwUmVzcG9uc2U8VCwgRT47XG4gICAgICByLmRhdGEgPSBudWxsIGFzIHVua25vd24gYXMgVDtcbiAgICAgIHIuZXJyb3IgPSBudWxsIGFzIHVua25vd24gYXMgRTtcblxuICAgICAgY29uc3QgZGF0YSA9ICFyZXNwb25zZUZvcm1hdFxuICAgICAgICA/IHJcbiAgICAgICAgOiBhd2FpdCByZXNwb25zZVtyZXNwb25zZUZvcm1hdF0oKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHIub2spIHtcbiAgICAgICAgICAgICAgICByLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHIuZXJyb3IgPSBkYXRhO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICByLmVycm9yID0gZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgaWYgKGNhbmNlbFRva2VuKSB7XG4gICAgICAgIHRoaXMuYWJvcnRDb250cm9sbGVycy5kZWxldGUoY2FuY2VsVG9rZW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBkYXRhO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogQHRpdGxlIHdlYnNlbWFwaG9yZS1vcGVuYXBpXG4gKiBAdmVyc2lvbiAyMDI1LTA0LTAzVDEzOjE0OjQyWlxuICogQGJhc2VVcmwgaHR0cHM6Ly9hcGktdXMtZGV2LndlYnNlbWFwaG9yZS5jb20vdjFcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaTxTZWN1cml0eURhdGFUeXBlIGV4dGVuZHMgdW5rbm93bj4gZXh0ZW5kcyBIdHRwQ2xpZW50PFNlY3VyaXR5RGF0YVR5cGU+IHtcbiAgYWR2aXNvciA9IHtcbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjZ2VuZXJhdGVNYXBwaW5nXG4gICAgICogQG5hbWUgR2VuZXJhdGVNYXBwaW5nXG4gICAgICogQHN1bW1hcnkgdXBjb21pbmcuLi5cbiAgICAgKiBAcmVxdWVzdCBQT1NUOi9hZHZpc29yL2dlbmVyYXRlTWFwcGluZ1xuICAgICAqIEBzZWN1cmVcbiAgICAgKi9cbiAgICBnZW5lcmF0ZU1hcHBpbmc6IChHZW5lcmF0ZU1hcHBpbmdSZXF1ZXN0OiBHZW5lcmF0ZU1hcHBpbmdSZXF1ZXN0LCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDxHZW5lcmF0ZU1hcHBpbmdSZXNwb25zZSwgRXJyb3JSZXNwb25zZT4oe1xuICAgICAgICBwYXRoOiBgL2Fkdmlzb3IvZ2VuZXJhdGVNYXBwaW5nYCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogR2VuZXJhdGVNYXBwaW5nUmVxdWVzdCxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zQWR2aXNvclxuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L2Fkdmlzb3IvZ2VuZXJhdGVNYXBwaW5nXG4gICAgICovXG4gICAgb3B0aW9uc0Fkdmlzb3I6IChwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9hZHZpc29yL2dlbmVyYXRlTWFwcGluZ2AsXG4gICAgICAgIG1ldGhvZDogXCJPUFRJT05TXCIsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuICB9O1xuICBhcGlrZXkgPSB7XG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEB0YWdzIGNsaWVudEFsaWFzI2xpc3RcbiAgICAgKiBAbmFtZSBMaXN0XG4gICAgICogQHN1bW1hcnkgTGlzdCBBUEkgY2xpZW50IGtleXMuXG4gICAgICogQHJlcXVlc3QgR0VUOi9hcGlrZXkvcmVhZEtleXNcbiAgICAgKiBAc2VjdXJlXG4gICAgICovXG4gICAgbGlzdDogKFxuICAgICAgcXVlcnk/OiB7XG4gICAgICAgIGRpcmVjdGlvbj86IHN0cmluZztcbiAgICAgICAgcGFnZT86IHN0cmluZztcbiAgICAgICAgb3JkZXJCeT86IHN0cmluZztcbiAgICAgICAgc3RhcnRLZXk/OiBzdHJpbmc7XG4gICAgICB9LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PEFwaWtleVBhZ2VkTGlzdE93bmVyS2V5c1Jlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvYXBpa2V5L3JlYWRLZXlzYCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc0FwaWtleVxuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L2FwaWtleS9yZWFkS2V5c1xuICAgICAqL1xuICAgIG9wdGlvbnNBcGlrZXk6IChwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9hcGlrZXkvcmVhZEtleXNgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAdGFncyBjbGllbnRBbGlhcyN1cHNlcnRcbiAgICAgKiBAbmFtZSBVcHNlcnRcbiAgICAgKiBAc3VtbWFyeSBDcmVhdGUgYW4gQVBJIGNsaWVudCBrZXlcbiAgICAgKiBAcmVxdWVzdCBQT1NUOi9hcGlrZXkvdXBzZXJ0S2V5XG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIHVwc2VydDogKEFwaWtleVVwc2VydFJlcXVlc3Q6IEFwaWtleVVwc2VydFJlcXVlc3QsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PEFwaWtleVVwc2VydFJlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvYXBpa2V5L3Vwc2VydEtleWAsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IEFwaWtleVVwc2VydFJlcXVlc3QsXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc0FwaWtleTJcbiAgICAgKiBAcmVxdWVzdCBPUFRJT05TOi9hcGlrZXkvdXBzZXJ0S2V5XG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zQXBpa2V5XG4gICAgICogQGR1cGxpY2F0ZVxuICAgICAqL1xuICAgIG9wdGlvbnNBcGlrZXkyOiAocGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvYXBpa2V5L3Vwc2VydEtleWAsXG4gICAgICAgIG1ldGhvZDogXCJPUFRJT05TXCIsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuICB9O1xuICBhdXRoID0ge1xuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAdGFncyBjbGllbnRBbGlhcyNnZXRKV1RcbiAgICAgKiBAbmFtZSBHZXRKd3RcbiAgICAgKiBAc3VtbWFyeSB1cGNvbWluZy4uLlxuICAgICAqIEByZXF1ZXN0IFBPU1Q6L2F1dGgvaWRHZXRUb2tlblxuICAgICAqL1xuICAgIGdldEp3dDogKElkU2Vzc2lvblRva2VuUmVxdWVzdDogSWRTZXNzaW9uVG9rZW5SZXF1ZXN0LCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDxTZXNzaW9uVG9rZW5SZXNwb25zZSwgRXJyb3JSZXNwb25zZT4oe1xuICAgICAgICBwYXRoOiBgL2F1dGgvaWRHZXRUb2tlbmAsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IElkU2Vzc2lvblRva2VuUmVxdWVzdCxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc0F1dGhcbiAgICAgKiBAcmVxdWVzdCBPUFRJT05TOi9hdXRoL2lkR2V0VG9rZW5cbiAgICAgKi9cbiAgICBvcHRpb25zQXV0aDogKHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL2F1dGgvaWRHZXRUb2tlbmAsXG4gICAgICAgIG1ldGhvZDogXCJPUFRJT05TXCIsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuICB9O1xuICBlbWFpbHMgPSB7XG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEB0YWdzIGNsaWVudEFsaWFzI3Vwc2VydFxuICAgICAqIEBuYW1lIFVwc2VydFxuICAgICAqIEBzdW1tYXJ5IHVwY29taW5nLi4uXG4gICAgICogQHJlcXVlc3QgUE9TVDovZW1haWxzL3Vwc2VydEVtYWlsXG4gICAgICovXG4gICAgdXBzZXJ0OiAoRW1haWxVcHNlcnRSZXF1ZXN0OiBFbWFpbFVwc2VydFJlcXVlc3QsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PEVtYWlsVXBzZXJ0UmVzcG9uc2UsIEVycm9yUmVzcG9uc2U+KHtcbiAgICAgICAgcGF0aDogYC9lbWFpbHMvdXBzZXJ0RW1haWxgLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBFbWFpbFVwc2VydFJlcXVlc3QsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNFbWFpbHNcbiAgICAgKiBAcmVxdWVzdCBPUFRJT05TOi9lbWFpbHMvdXBzZXJ0RW1haWxcbiAgICAgKi9cbiAgICBvcHRpb25zRW1haWxzOiAocGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvZW1haWxzL3Vwc2VydEVtYWlsYCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG4gIH07XG4gIGluZm8gPSB7XG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIEluZm9MaXN0XG4gICAgICogQHJlcXVlc3QgR0VUOi9pbmZvXG4gICAgICovXG4gICAgaW5mb0xpc3Q6IChwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9pbmZvYCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zSW5mb1xuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L2luZm9cbiAgICAgKi9cbiAgICBvcHRpb25zSW5mbzogKHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL2luZm9gLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcbiAgfTtcbiAgcGF5bWVudCA9IHtcbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjY3JlYXRlU3RyaXBlQ2hlY2tvdXRcbiAgICAgKiBAbmFtZSBDcmVhdGVTdHJpcGVDaGVja291dFxuICAgICAqIEBzdW1tYXJ5IHVwY29taW5nLi4uXG4gICAgICogQHJlcXVlc3QgUE9TVDovcGF5bWVudC9zdHJpcGUvY2hlY2tvdXRTZXNzaW9uXG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIGNyZWF0ZVN0cmlwZUNoZWNrb3V0OiAoXG4gICAgICBTdHJpcGVDaGVja291dFNlc3Npb25DcmVhdGVSZXF1ZXN0OiBTdHJpcGVDaGVja291dFNlc3Npb25DcmVhdGVSZXF1ZXN0LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PFN0cmlwZUNoZWNrb3V0U2Vzc2lvbkNyZWF0ZVJlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvcGF5bWVudC9zdHJpcGUvY2hlY2tvdXRTZXNzaW9uYCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogU3RyaXBlQ2hlY2tvdXRTZXNzaW9uQ3JlYXRlUmVxdWVzdCxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zUGF5bWVudFxuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L3BheW1lbnQvc3RyaXBlL2NoZWNrb3V0U2Vzc2lvblxuICAgICAqL1xuICAgIG9wdGlvbnNQYXltZW50OiAocGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvcGF5bWVudC9zdHJpcGUvY2hlY2tvdXRTZXNzaW9uYCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgU3RyaXBlV2ViaG9va0NyZWF0ZVBheW1lbnRTdHJpcGVXZWJob29rXG4gICAgICogQHN1bW1hcnkgdXBjb21pbmcuLi5cbiAgICAgKiBAcmVxdWVzdCBQT1NUOi9wYXltZW50L3N0cmlwZS93ZWJob29rXG4gICAgICovXG4gICAgc3RyaXBlV2ViaG9va0NyZWF0ZVBheW1lbnRTdHJpcGVXZWJob29rOiAocGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgRXJyb3JSZXNwb25zZT4oe1xuICAgICAgICBwYXRoOiBgL3BheW1lbnQvc3RyaXBlL3dlYmhvb2tgLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zUGF5bWVudDJcbiAgICAgKiBAcmVxdWVzdCBPUFRJT05TOi9wYXltZW50L3N0cmlwZS93ZWJob29rXG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zUGF5bWVudFxuICAgICAqIEBkdXBsaWNhdGVcbiAgICAgKi9cbiAgICBvcHRpb25zUGF5bWVudDI6IChwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9wYXltZW50L3N0cmlwZS93ZWJob29rYCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG4gIH07XG4gIHNlbWFwaG9yZSA9IHtcbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjcmVhZCwgcHVibGljQXBpXG4gICAgICogQG5hbWUgUmVhZFxuICAgICAqIEBzdW1tYXJ5IFJldHVybnMgYSBzZW1hcGhvcmUncyBzZXR0aW5nc1xuICAgICAqIEByZXF1ZXN0IEdFVDovc2VtYXBob3JlXG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIHJlYWQ6IChcbiAgICAgIHF1ZXJ5Pzoge1xuICAgICAgICBjb25zaXN0ZW50Pzogc3RyaW5nO1xuICAgICAgICBpZD86IHN0cmluZztcbiAgICAgIH0sXG4gICAgICBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSxcbiAgICApID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8U2VtYXBob3JlUmVhZFJlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlYCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjdXBzZXJ0LCBwdWJsaWNBcGlcbiAgICAgKiBAbmFtZSBVcHNlcnRcbiAgICAgKiBAc3VtbWFyeSBDcmVhdGVzIG9yIHVwZGF0ZXMgYSBzZW1hcGhvcmUncyBzZXR0aW5ncy4gT21pdCB0aGUgaWQgaW4gaW5wdXQgdG8gY3JlYXRlIGEgbmV3IHNlbWFwaG9yZS5cbiAgICAgKiBAcmVxdWVzdCBQT1NUOi9zZW1hcGhvcmVcbiAgICAgKiBAc2VjdXJlXG4gICAgICovXG4gICAgdXBzZXJ0OiAoU2VtYXBob3JlVXBzZXJ0UmVxdWVzdDogU2VtYXBob3JlVXBzZXJ0UmVxdWVzdCwgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8U2VtYXBob3JlUmVhZFJlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlYCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogU2VtYXBob3JlVXBzZXJ0UmVxdWVzdCxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zU2VtYXBob3JlXG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlXG4gICAgICovXG4gICAgb3B0aW9uc1NlbWFwaG9yZTogKHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL3NlbWFwaG9yZWAsXG4gICAgICAgIG1ldGhvZDogXCJPUFRJT05TXCIsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEB0YWdzIGNsaWVudEFsaWFzI2xpc3QsIHB1YmxpY0FwaVxuICAgICAqIEBuYW1lIExpc3RcbiAgICAgKiBAc3VtbWFyeSBMaXN0IHNlbWFwaG9yZXMuIFVzZSAuc3RhcnRLZXkgdG8gcGFnZSB0aHJvdWdoIHJlc3VsdHNcbiAgICAgKiBAcmVxdWVzdCBHRVQ6L3NlbWFwaG9yZS9saXN0XG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIGxpc3Q6IChcbiAgICAgIHF1ZXJ5Pzoge1xuICAgICAgICBwYWdlU2l6ZT86IHN0cmluZztcbiAgICAgICAgc3RhcnRLZXk/OiBzdHJpbmc7XG4gICAgICB9LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PFBhZ2VkU2VtYXBob3JlTGlzdFJlYWRSZXNwb25zZSwgRXJyb3JSZXNwb25zZT4oe1xuICAgICAgICBwYXRoOiBgL3NlbWFwaG9yZS9saXN0YCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc1NlbWFwaG9yZTJcbiAgICAgKiBAcmVxdWVzdCBPUFRJT05TOi9zZW1hcGhvcmUvbGlzdFxuICAgICAqIEBvcmlnaW5hbE5hbWUgb3B0aW9uc1NlbWFwaG9yZVxuICAgICAqIEBkdXBsaWNhdGVcbiAgICAgKi9cbiAgICBvcHRpb25zU2VtYXBob3JlMjogKHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL3NlbWFwaG9yZS9saXN0YCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAqIE5vIGRlc2NyaXB0aW9uXG4gKlxuICogQHRhZ3MgY2xpZW50QWxpYXMjYWNxdWlyZSwgcHVibGljQXBpXG4gKiBAbmFtZSBBY3F1aXJlXG4gKiBAc3VtbWFyeSBBc3luY2hyb25vdXNseSBhY3F1aXJlIGEgc2VtYXBob3JlIGxvY2suIFxuICAgICAgICAgIFJldHVybnMgYW4gaW1tZWRpYXRlIGNvbmZpcm1hdGlvbi4gVGhlIG1lc3NhZ2Ugd2lsbCBiZSBwcm9jZXNzZWQgYXMgc29vbiBcbiAgICAgICAgICBhcyBwb3NzaWJsZSBhbmQgV2ViU2VtYXBob3JlIHdpbGwgaW52b2tlIHRoZSBwcmVjb25maWd1cmVkIHByb2Nlc3NvciBlbmRwb2ludCB0byBjb250aW51ZSB0aGUgZmxvdy5cbiAqIEByZXF1ZXN0IFBPU1Q6L3NlbWFwaG9yZS97c2VtYXBob3JlSWR9L2FjcXVpcmVcbiAqIEBzZWN1cmVcbiAqL1xuICAgIGFjcXVpcmU6IChzZW1hcGhvcmVJZDogc3RyaW5nLCBTZW1hcGhvcmVMb2NrUmVxdWVzdDogU2VtYXBob3JlTG9ja1JlcXVlc3QsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIHZvaWQ+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vYWNxdWlyZWAsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IFNlbWFwaG9yZUxvY2tSZXF1ZXN0LFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNTZW1hcGhvcmUzXG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vYWNxdWlyZVxuICAgICAqIEBvcmlnaW5hbE5hbWUgb3B0aW9uc1NlbWFwaG9yZVxuICAgICAqIEBkdXBsaWNhdGVcbiAgICAgKi9cbiAgICBvcHRpb25zU2VtYXBob3JlMzogKHNlbWFwaG9yZUlkOiBzdHJpbmcsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL3NlbWFwaG9yZS8ke3NlbWFwaG9yZUlkfS9hY3F1aXJlYCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjYWNxdWlyZVN5bmMsIHB1YmxpY0FwaVxuICAgICAqIEBuYW1lIEFjcXVpcmVTeW5jXG4gICAgICogQHN1bW1hcnkgU3luY2hyb25vdXNseSBhY3F1aXJlIGEgc2VtYXBob3JlIGxvY2suIEltbWVkaWF0ZWx5IHJldHVybnMgZWl0aGVyIGFuIGBhY3F1aXJlZGAgb3IgYHJlamVjdGVkYCBzdGF0dXMuXG4gICAgICogQHJlcXVlc3QgUE9TVDovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vYWNxdWlyZVN5bmNcbiAgICAgKiBAc2VjdXJlXG4gICAgICovXG4gICAgYWNxdWlyZVN5bmM6IChzZW1hcGhvcmVJZDogc3RyaW5nLCBTZW1hcGhvcmVMb2NrUmVxdWVzdDogU2VtYXBob3JlTG9ja1JlcXVlc3QsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PFNlbWFwaG9yZVN5bmNMb2NrUmVzcG9uc2UsIEVycm9yUmVzcG9uc2U+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vYWNxdWlyZVN5bmNgLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBTZW1hcGhvcmVMb2NrUmVxdWVzdCxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zU2VtYXBob3JlNFxuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L3NlbWFwaG9yZS97c2VtYXBob3JlSWR9L2FjcXVpcmVTeW5jXG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zU2VtYXBob3JlXG4gICAgICogQGR1cGxpY2F0ZVxuICAgICAqL1xuICAgIG9wdGlvbnNTZW1hcGhvcmU0OiAoc2VtYXBob3JlSWQ6IHN0cmluZywgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlLyR7c2VtYXBob3JlSWR9L2FjcXVpcmVTeW5jYCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjYWN0aXZhdGUsIHB1YmxpY0FwaVxuICAgICAqIEBuYW1lIEFjdGl2YXRlXG4gICAgICogQHN1bW1hcnkgQWN0aXZhdGUgYSBzZW1hcGhvcmUgYW5kIGF0dGVtcHQgdG8gc3RhcnQgcHJvY2Vzc2luZyBpdHMgYmFja2xvZy5cbiAgICAgKiBAcmVxdWVzdCBQT1NUOi9zZW1hcGhvcmUve3NlbWFwaG9yZUlkfS9hY3RpdmF0ZVxuICAgICAqIEBzZWN1cmVcbiAgICAgKi9cbiAgICBhY3RpdmF0ZTogKHNlbWFwaG9yZUlkOiBzdHJpbmcsIFNlbWFwaG9yZUNoYW5uZWw6IFNlbWFwaG9yZUNoYW5uZWwsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PE9rUmVzcG9uc2UsIEVycm9yUmVzcG9uc2U+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vYWN0aXZhdGVgLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBTZW1hcGhvcmVDaGFubmVsLFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNTZW1hcGhvcmU1XG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vYWN0aXZhdGVcbiAgICAgKiBAb3JpZ2luYWxOYW1lIG9wdGlvbnNTZW1hcGhvcmVcbiAgICAgKiBAZHVwbGljYXRlXG4gICAgICovXG4gICAgb3B0aW9uc1NlbWFwaG9yZTU6IChzZW1hcGhvcmVJZDogc3RyaW5nLCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vYWN0aXZhdGVgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICogTm8gZGVzY3JpcHRpb25cbiAqXG4gKiBAdGFncyBjbGllbnRBbGlhcyNjYW5jZWwsIHB1YmxpY0FwaVxuICogQG5hbWUgQ2FuY2VsXG4gKiBAc3VtbWFyeSBBc3luY2hyb25vdXNseSBjYW5jZWwgYSBzZW1hcGhvcmUgbG9jay4gXG4gICAgICAgICAgUmV0dXJucyBhbiBpbW1lZGlhdGUgY29uZmlybWF0aW9uLiBUaGUgbWVzc2FnZSB3aWxsIGJlIHByb2Nlc3NlZCBhcyBzb29uIFxuICAgICAgICAgIGFzIHBvc3NpYmxlIGFuZCBXZWJTZW1hcGhvcmUgd2lsbCBjYW5jZWwgdGhlIGpvYiBnaXZlbiBieSBqb2JDcm4uXG4gKiBAcmVxdWVzdCBQT1NUOi9zZW1hcGhvcmUve3NlbWFwaG9yZUlkfS9jYW5jZWxcbiAqIEBzZWN1cmVcbiAqL1xuICAgIGNhbmNlbDogKFxuICAgICAgc2VtYXBob3JlSWQ6IHN0cmluZyxcbiAgICAgIFNlbWFwaG9yZUpvYlN0YXRlVHJhbnNmb3JtUmVxdWVzdDogU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIHZvaWQ+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vY2FuY2VsYCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0LFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNTZW1hcGhvcmU2XG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vY2FuY2VsXG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zU2VtYXBob3JlXG4gICAgICogQGR1cGxpY2F0ZVxuICAgICAqL1xuICAgIG9wdGlvbnNTZW1hcGhvcmU2OiAoc2VtYXBob3JlSWQ6IHN0cmluZywgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlLyR7c2VtYXBob3JlSWR9L2NhbmNlbGAsXG4gICAgICAgIG1ldGhvZDogXCJPUFRJT05TXCIsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gKiBObyBkZXNjcmlwdGlvblxuICpcbiAqIEB0YWdzIGNsaWVudEFsaWFzI2RlbGV0ZSwgcHVibGljQXBpXG4gKiBAbmFtZSBEZWxldGVcbiAqIEBzdW1tYXJ5IEFzeW5jaHJvbm91c2x5IGRlbGV0ZSBhIHNlbWFwaG9yZSBsb2NrLiBcbiAgICAgICAgICBSZXR1cm5zIGFuIGltbWVkaWF0ZSBjb25maXJtYXRpb24uIFRoZSBtZXNzYWdlIHdpbGwgYmUgcHJvY2Vzc2VkIGFzIHNvb24gXG4gICAgICAgICAgYXMgcG9zc2libGUgYW5kIFdlYlNlbWFwaG9yZSB3aWxsIHJlbGVhc2UgdGhlIGpvYiBnaXZlbiBieSBqb2JDcm4uXG4gKiBAcmVxdWVzdCBQT1NUOi9zZW1hcGhvcmUve3NlbWFwaG9yZUlkfS9kZWxldGVcbiAqIEBzZWN1cmVcbiAqL1xuICAgIGRlbGV0ZTogKFxuICAgICAgc2VtYXBob3JlSWQ6IHN0cmluZyxcbiAgICAgIFNlbWFwaG9yZUpvYlN0YXRlVHJhbnNmb3JtUmVxdWVzdDogU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIHZvaWQ+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vZGVsZXRlYCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0LFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNTZW1hcGhvcmU3XG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vZGVsZXRlXG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zU2VtYXBob3JlXG4gICAgICogQGR1cGxpY2F0ZVxuICAgICAqL1xuICAgIG9wdGlvbnNTZW1hcGhvcmU3OiAoc2VtYXBob3JlSWQ6IHN0cmluZywgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlLyR7c2VtYXBob3JlSWR9L2RlbGV0ZWAsXG4gICAgICAgIG1ldGhvZDogXCJPUFRJT05TXCIsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEB0YWdzIGNsaWVudEFsaWFzI3JlYWRKb2IsIHB1YmxpY0FwaVxuICAgICAqIEBuYW1lIFJlYWRKb2JcbiAgICAgKiBAc3VtbWFyeSBSZWFkIGEgam9iLlxuICAgICAqIEByZXF1ZXN0IEdFVDovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vam9iXG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIHJlYWRKb2I6IChcbiAgICAgIHNlbWFwaG9yZUlkOiBzdHJpbmcsXG4gICAgICBxdWVyeT86IHtcbiAgICAgICAgY3JuPzogc3RyaW5nO1xuICAgICAgfSxcbiAgICAgIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9LFxuICAgICkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDxTZW1hcGhvcmVKb2JSZWFkUmVzcG9uc2UsIEVycm9yUmVzcG9uc2U+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vam9iYCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc1NlbWFwaG9yZThcbiAgICAgKiBAcmVxdWVzdCBPUFRJT05TOi9zZW1hcGhvcmUve3NlbWFwaG9yZUlkfS9qb2JcbiAgICAgKiBAb3JpZ2luYWxOYW1lIG9wdGlvbnNTZW1hcGhvcmVcbiAgICAgKiBAZHVwbGljYXRlXG4gICAgICovXG4gICAgb3B0aW9uc1NlbWFwaG9yZTg6IChzZW1hcGhvcmVJZDogc3RyaW5nLCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vam9iYCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjcHVyZ2VRdWV1ZSwgcHVibGljQXBpXG4gICAgICogQG5hbWUgUHVyZ2VRdWV1ZVxuICAgICAqIEBzdW1tYXJ5IHB1cmdlIG1lc3NhZ2UgcXVldWVcbiAgICAgKiBAcmVxdWVzdCBERUxFVEU6L3NlbWFwaG9yZS97c2VtYXBob3JlSWR9L3B1cmdlXG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIHB1cmdlUXVldWU6IChzZW1hcGhvcmVJZDogc3RyaW5nLCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDxPa1Jlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlLyR7c2VtYXBob3JlSWR9L3B1cmdlYCxcbiAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNTZW1hcGhvcmU5XG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vcHVyZ2VcbiAgICAgKiBAb3JpZ2luYWxOYW1lIG9wdGlvbnNTZW1hcGhvcmVcbiAgICAgKiBAZHVwbGljYXRlXG4gICAgICovXG4gICAgb3B0aW9uc1NlbWFwaG9yZTk6IChzZW1hcGhvcmVJZDogc3RyaW5nLCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vcHVyZ2VgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAdGFncyBjbGllbnRBbGlhcyNyZWFkUXVldWUsIHB1YmxpY0FwaVxuICAgICAqIEBuYW1lIFJlYWRRdWV1ZVxuICAgICAqIEBzdW1tYXJ5IFJldHVybnMgYSBzZW1hcGhvcmUncyBxdWV1ZSBjb250ZW50c1xuICAgICAqIEByZXF1ZXN0IEdFVDovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vcmVhZFF1ZXVlXG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIHJlYWRRdWV1ZTogKFxuICAgICAgc2VtYXBob3JlSWQ6IHN0cmluZyxcbiAgICAgIHF1ZXJ5Pzoge1xuICAgICAgICBzdGF0dXM/OiBzdHJpbmc7XG4gICAgICAgIGxpbWl0Pzogc3RyaW5nO1xuICAgICAgICBwYWdlU2l6ZT86IHN0cmluZztcbiAgICAgICAgc3RhcnRLZXk/OiBzdHJpbmc7XG4gICAgICB9LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PFBhZ2VkU2VtYXBob3JlUmVhZFF1ZXVlUmVzcG9uc2UsIEVycm9yUmVzcG9uc2U+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vcmVhZFF1ZXVlYCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc1NlbWFwaG9yZTEwXG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vcmVhZFF1ZXVlXG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zU2VtYXBob3JlXG4gICAgICogQGR1cGxpY2F0ZVxuICAgICAqL1xuICAgIG9wdGlvbnNTZW1hcGhvcmUxMDogKHNlbWFwaG9yZUlkOiBzdHJpbmcsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL3NlbWFwaG9yZS8ke3NlbWFwaG9yZUlkfS9yZWFkUXVldWVgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICogTm8gZGVzY3JpcHRpb25cbiAqXG4gKiBAdGFncyBjbGllbnRBbGlhcyNyZWxlYXNlLCBwdWJsaWNBcGlcbiAqIEBuYW1lIFJlbGVhc2VcbiAqIEBzdW1tYXJ5IEFzeW5jaHJvbm91c2x5IHJlbGVhc2UgYSBzZW1hcGhvcmUgbG9jay4gXG4gICAgICAgICAgUmV0dXJucyBhbiBpbW1lZGlhdGUgY29uZmlybWF0aW9uLiBUaGUgbWVzc2FnZSB3aWxsIGJlIHByb2Nlc3NlZCBhcyBzb29uIFxuICAgICAgICAgIGFzIHBvc3NpYmxlIGFuZCBXZWJTZW1hcGhvcmUgd2lsbCByZWxlYXNlIHRoZSBqb2IgZ2l2ZW4gYnkgam9iQ3JuLlxuICogQHJlcXVlc3QgUE9TVDovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vcmVsZWFzZVxuICogQHNlY3VyZVxuICovXG4gICAgcmVsZWFzZTogKHNlbWFwaG9yZUlkOiBzdHJpbmcsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIHZvaWQ+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vcmVsZWFzZWAsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc1NlbWFwaG9yZTExXG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovc2VtYXBob3JlL3tzZW1hcGhvcmVJZH0vcmVsZWFzZVxuICAgICAqIEBvcmlnaW5hbE5hbWUgb3B0aW9uc1NlbWFwaG9yZVxuICAgICAqIEBkdXBsaWNhdGVcbiAgICAgKi9cbiAgICBvcHRpb25zU2VtYXBob3JlMTE6IChzZW1hcGhvcmVJZDogc3RyaW5nLCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC9zZW1hcGhvcmUvJHtzZW1hcGhvcmVJZH0vcmVsZWFzZWAsXG4gICAgICAgIG1ldGhvZDogXCJPUFRJT05TXCIsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gKiBObyBkZXNjcmlwdGlvblxuICpcbiAqIEB0YWdzIGNsaWVudEFsaWFzI3JlcXVldWUsIHB1YmxpY0FwaVxuICogQG5hbWUgUmVxdWV1ZVxuICogQHN1bW1hcnkgQXN5bmNocm9ub3VzbHkgcmVxdWV1ZSBhIHNlbWFwaG9yZSBsb2NrLiBcbiAgICAgICAgICBSZXR1cm5zIGFuIGltbWVkaWF0ZSBjb25maXJtYXRpb24uIFRoZSBtZXNzYWdlIHdpbGwgYmUgcHJvY2Vzc2VkIGFzIHNvb24gXG4gICAgICAgICAgYXMgcG9zc2libGUgYW5kIFdlYlNlbWFwaG9yZSB3aWxsIHJlcXVldWUgdGhlIG1lc3NhZ2Ugd2l0aCB0aGUgc2FtZSBwYXlsb2FkIGJ1dCBuZXcgaWQuXG4gKiBAcmVxdWVzdCBQT1NUOi9zZW1hcGhvcmUve3NlbWFwaG9yZUlkfS9yZXF1ZXVlXG4gKiBAc2VjdXJlXG4gKi9cbiAgICByZXF1ZXVlOiAoXG4gICAgICBzZW1hcGhvcmVJZDogc3RyaW5nLFxuICAgICAgU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0OiBTZW1hcGhvcmVKb2JTdGF0ZVRyYW5zZm9ybVJlcXVlc3QsXG4gICAgICBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSxcbiAgICApID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgdm9pZD4oe1xuICAgICAgICBwYXRoOiBgL3NlbWFwaG9yZS8ke3NlbWFwaG9yZUlkfS9yZXF1ZXVlYCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0LFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNTZW1hcGhvcmUxMlxuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L3NlbWFwaG9yZS97c2VtYXBob3JlSWR9L3JlcXVldWVcbiAgICAgKiBAb3JpZ2luYWxOYW1lIG9wdGlvbnNTZW1hcGhvcmVcbiAgICAgKiBAZHVwbGljYXRlXG4gICAgICovXG4gICAgb3B0aW9uc1NlbWFwaG9yZTEyOiAoc2VtYXBob3JlSWQ6IHN0cmluZywgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlLyR7c2VtYXBob3JlSWR9L3JlcXVldWVgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICogTm8gZGVzY3JpcHRpb25cbiAqXG4gKiBAdGFncyBjbGllbnRBbGlhcyNyZXNjaGVkdWxlLCBwdWJsaWNBcGlcbiAqIEBuYW1lIFJlc2NoZWR1bGVcbiAqIEBzdW1tYXJ5IEFzeW5jaHJvbm91c2x5IHJlc2NoZWR1bGUgYSBzZW1hcGhvcmUgbG9jay4gXG4gICAgICAgICAgUmV0dXJucyBhbiBpbW1lZGlhdGUgY29uZmlybWF0aW9uLiBUaGUgbWVzc2FnZSB3aWxsIGJlIHByb2Nlc3NlZCBhcyBzb29uIFxuICAgICAgICAgIGFzIHBvc3NpYmxlIGFuZCBXZWJTZW1hcGhvcmUgd2lsbCByZXNjaGVkdWxlIHRoZSBqb2IgcHJlc2VydmluZyBpdHMgaWQvY3JuIGFuZCBwbGFjZSBpbiB0aGUgcXVldWUuXG4gKiBAcmVxdWVzdCBQT1NUOi9zZW1hcGhvcmUve3NlbWFwaG9yZUlkfS9yZXNjaGVkdWxlXG4gKiBAc2VjdXJlXG4gKi9cbiAgICByZXNjaGVkdWxlOiAoXG4gICAgICBzZW1hcGhvcmVJZDogc3RyaW5nLFxuICAgICAgU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0OiBTZW1hcGhvcmVKb2JTdGF0ZVRyYW5zZm9ybVJlcXVlc3QsXG4gICAgICBwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSxcbiAgICApID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgdm9pZD4oe1xuICAgICAgICBwYXRoOiBgL3NlbWFwaG9yZS8ke3NlbWFwaG9yZUlkfS9yZXNjaGVkdWxlYCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogU2VtYXBob3JlSm9iU3RhdGVUcmFuc2Zvcm1SZXF1ZXN0LFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNTZW1hcGhvcmUxM1xuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L3NlbWFwaG9yZS97c2VtYXBob3JlSWR9L3Jlc2NoZWR1bGVcbiAgICAgKiBAb3JpZ2luYWxOYW1lIG9wdGlvbnNTZW1hcGhvcmVcbiAgICAgKiBAZHVwbGljYXRlXG4gICAgICovXG4gICAgb3B0aW9uc1NlbWFwaG9yZTEzOiAoc2VtYXBob3JlSWQ6IHN0cmluZywgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8dm9pZCwgYW55Pih7XG4gICAgICAgIHBhdGg6IGAvc2VtYXBob3JlLyR7c2VtYXBob3JlSWR9L3Jlc2NoZWR1bGVgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcbiAgfTtcbiAgdXNlciA9IHtcbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjcmVhZFxuICAgICAqIEBuYW1lIFJlYWRcbiAgICAgKiBAc3VtbWFyeSB1cGNvbWluZy4uLlxuICAgICAqIEByZXF1ZXN0IEdFVDovdXNlclxuICAgICAqIEBzZWN1cmVcbiAgICAgKi9cbiAgICByZWFkOiAoXG4gICAgICBxdWVyeT86IHtcbiAgICAgICAgaWQ/OiBzdHJpbmc7XG4gICAgICB9LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PFVzZXJSZWFkUmVzcG9uc2UsIEVycm9yUmVzcG9uc2U+KHtcbiAgICAgICAgcGF0aDogYC91c2VyYCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHRhZ3MgY2xpZW50QWxpYXMjY3JlYXRlXG4gICAgICogQG5hbWUgQ3JlYXRlXG4gICAgICogQHN1bW1hcnkgY3JlYXRlIHVzZXJcbiAgICAgKiBAcmVxdWVzdCBQT1NUOi91c2VyXG4gICAgICogQHNlY3VyZVxuICAgICAqL1xuICAgIGNyZWF0ZTogKFVzZXJDcmVhdGVSZXF1ZXN0OiBVc2VyQ3JlYXRlUmVxdWVzdCwgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8VXNlclJlYWRSZXNwb25zZSwgRXJyb3JSZXNwb25zZT4oe1xuICAgICAgICBwYXRoOiBgL3VzZXJgLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBVc2VyQ3JlYXRlUmVxdWVzdCxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAdGFncyBjbGllbnRBbGlhcyN1cGRhdGVcbiAgICAgKiBAbmFtZSBVcGRhdGVcbiAgICAgKiBAc3VtbWFyeSB1cGNvbWluZy4uLlxuICAgICAqIEByZXF1ZXN0IFBVVDovdXNlclxuICAgICAqIEBzZWN1cmVcbiAgICAgKi9cbiAgICB1cGRhdGU6IChVc2VyVXBkYXRlUmVxdWVzdDogVXNlclVwZGF0ZVJlcXVlc3QsIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PFVzZXJSZWFkUmVzcG9uc2UsIEVycm9yUmVzcG9uc2U+KHtcbiAgICAgICAgcGF0aDogYC91c2VyYCxcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICBib2R5OiBVc2VyVXBkYXRlUmVxdWVzdCxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zVXNlclxuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L3VzZXJcbiAgICAgKi9cbiAgICBvcHRpb25zVXNlcjogKHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL3VzZXJgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAdGFncyBjbGllbnRBbGlhcyNhY3Rpdml0eVN0cmVhbVxuICAgICAqIEBuYW1lIEFjdGl2aXR5U3RyZWFtXG4gICAgICogQHN1bW1hcnkgdXBjb21pbmcuLi5cbiAgICAgKiBAcmVxdWVzdCBHRVQ6L3VzZXIvYWN0aXZpdHlTdHJlYW1cbiAgICAgKiBAc2VjdXJlXG4gICAgICovXG4gICAgYWN0aXZpdHlTdHJlYW06IChcbiAgICAgIHF1ZXJ5Pzoge1xuICAgICAgICBleGNsdXNpdmVTdGFydEtleT86IHN0cmluZztcbiAgICAgICAgbGltaXQ/OiBzdHJpbmc7XG4gICAgICB9LFxuICAgICAgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30sXG4gICAgKSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PEFueVJlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvdXNlci9hY3Rpdml0eVN0cmVhbWAsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIHR5cGU6IENvbnRlbnRUeXBlLkpzb24sXG4gICAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogTm8gZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBuYW1lIE9wdGlvbnNVc2VyMlxuICAgICAqIEByZXF1ZXN0IE9QVElPTlM6L3VzZXIvYWN0aXZpdHlTdHJlYW1cbiAgICAgKiBAb3JpZ2luYWxOYW1lIG9wdGlvbnNVc2VyXG4gICAgICogQGR1cGxpY2F0ZVxuICAgICAqL1xuICAgIG9wdGlvbnNVc2VyMjogKHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9KSA9PlxuICAgICAgdGhpcy5yZXF1ZXN0PHZvaWQsIGFueT4oe1xuICAgICAgICBwYXRoOiBgL3VzZXIvYWN0aXZpdHlTdHJlYW1gLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAdGFncyBjbGllbnRBbGlhcyNjdXJyZW50XG4gICAgICogQG5hbWUgQ3VycmVudFxuICAgICAqIEBzdW1tYXJ5IHVwY29taW5nLi4uXG4gICAgICogQHJlcXVlc3QgR0VUOi91c2VyL2N1cnJlbnRcbiAgICAgKiBAc2VjdXJlXG4gICAgICovXG4gICAgY3VycmVudDogKFxuICAgICAgcXVlcnk/OiB7XG4gICAgICAgIGlkPzogc3RyaW5nO1xuICAgICAgfSxcbiAgICAgIHBhcmFtczogUmVxdWVzdFBhcmFtcyA9IHt9LFxuICAgICkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDxVc2VyUmVhZFJlc3BvbnNlLCBFcnJvclJlc3BvbnNlPih7XG4gICAgICAgIHBhdGg6IGAvdXNlci9jdXJyZW50YCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBObyBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQG5hbWUgT3B0aW9uc1VzZXIzXG4gICAgICogQHJlcXVlc3QgT1BUSU9OUzovdXNlci9jdXJyZW50XG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zVXNlclxuICAgICAqIEBkdXBsaWNhdGVcbiAgICAgKi9cbiAgICBvcHRpb25zVXNlcjM6IChwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC91c2VyL2N1cnJlbnRgLFxuICAgICAgICBtZXRob2Q6IFwiT1BUSU9OU1wiLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAdGFncyBjbGllbnRBbGlhcyN1cGRhdGVQYXNzd29yZFxuICAgICAqIEBuYW1lIFVwZGF0ZVBhc3N3b3JkXG4gICAgICogQHN1bW1hcnkgdXBjb21pbmcuLi5cbiAgICAgKiBAcmVxdWVzdCBQVVQ6L3VzZXIvcGFzc3dvcmRcbiAgICAgKiBAc2VjdXJlXG4gICAgICovXG4gICAgdXBkYXRlUGFzc3dvcmQ6IChVc2VyVXBkYXRlUGFzc3dvcmROb3JtYWw6IFVzZXJVcGRhdGVQYXNzd29yZE5vcm1hbCwgcGFyYW1zOiBSZXF1ZXN0UGFyYW1zID0ge30pID0+XG4gICAgICB0aGlzLnJlcXVlc3Q8T2tSZXNwb25zZSwgRXJyb3JSZXNwb25zZT4oe1xuICAgICAgICBwYXRoOiBgL3VzZXIvcGFzc3dvcmRgLFxuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGJvZHk6IFVzZXJVcGRhdGVQYXNzd29yZE5vcm1hbCxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlOiBDb250ZW50VHlwZS5Kc29uLFxuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIE5vIGRlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAbmFtZSBPcHRpb25zVXNlcjRcbiAgICAgKiBAcmVxdWVzdCBPUFRJT05TOi91c2VyL3Bhc3N3b3JkXG4gICAgICogQG9yaWdpbmFsTmFtZSBvcHRpb25zVXNlclxuICAgICAqIEBkdXBsaWNhdGVcbiAgICAgKi9cbiAgICBvcHRpb25zVXNlcjQ6IChwYXJhbXM6IFJlcXVlc3RQYXJhbXMgPSB7fSkgPT5cbiAgICAgIHRoaXMucmVxdWVzdDx2b2lkLCBhbnk+KHtcbiAgICAgICAgcGF0aDogYC91c2VyL3Bhc3N3b3JkYCxcbiAgICAgICAgbWV0aG9kOiBcIk9QVElPTlNcIixcbiAgICAgICAgdHlwZTogQ29udGVudFR5cGUuSnNvbixcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgfSksXG4gIH07XG59XG4iLCJpbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IHsgV2ViU2VtYXBob3JlQXBpVXJsIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgQXBpLCBFcnJvclJlc3BvbnNlLCBVc2VyUmVhZFJlc3BvbnNlIH0gZnJvbSBcIi4vYXBpXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJzZW1hcGhvcmVIdHRwQ2xpZW50IGV4dGVuZHMgQXBpPHsgdG9rZW46IHN0cmluZyB9PiB7IH1cblxuLy8gY29uc3QgYmFzZVVybCA9IG5ld2xpZmVCYXNlVXJsOyAvL1wiaHR0cHM6Ly9hcGktZXUtc2l0Lm5ld2xpZmUuaW8vY3JlYXRvclwiO1xuXG5leHBvcnQgY29uc3QgV2ViU2VtYXBob3JlSHR0cENsaWVudE1hbmFnZXIgPSAocGFyYW1zPzogeyAgYmFzZVVybD86IHN0cmluZywgdG9rZW4/OiBzdHJpbmcsIGxvZ0xldmVsPzogTG9nTGV2ZWwsIGZldGNoPzogYW55IH0pID0+IHtcbiAgbGV0IGNsaWVudDogV2Vic2VtYXBob3JlSHR0cENsaWVudDtcbiAgbGV0IF90b2tlbiA9IHBhcmFtcz8udG9rZW4gfHwgXCJcIjtcblxuICBjb25zdCBsb2cgPSAoLi4uYXJnczogYW55KSA9PiB7XG4gICAgaWYocGFyYW1zPy5sb2dMZXZlbClcbiAgICAgIGNvbnNvbGUubG9nKFwiV2ViU2VtYXBob3JlSHR0cENsaWVudE1hbmFnZXJcIiwgLi4uYXJncylcbiAgfVxuXG4gIGNvbnN0IGluaXRpYWxpemUgPSAocGFyYW1zPzogeyBiYXNlVXJsPzogc3RyaW5nLCBmZXRjaD86IGFueSwgdG9rZW4/OiBzdHJpbmcgfSkgPT4ge1xuICAgIGxldCB7IGJhc2VVcmwsIGZldGNoOiBjdXN0b21GZXRjaCB9ID0gcGFyYW1zIHx8IHt9O1xuICAgIGJhc2VVcmwgPSBiYXNlVXJsID8gKFdlYlNlbWFwaG9yZUFwaVVybChiYXNlVXJsKSB8fCBiYXNlVXJsKSA6IChXZWJTZW1hcGhvcmVBcGlVcmwoXCJwcm9kXCIpIGFzIHN0cmluZyk7Ly9iYXNlVXJsIHx8IFwicHJvZFwiO1xuXG4gICAgbG9nKGJhc2VVcmwpO1xuXG4gICAgY2xpZW50ID0gbmV3IFdlYnNlbWFwaG9yZUh0dHBDbGllbnQoe1xuICAgICAgYmFzZVVybCxcbiAgICAgIHNlY3VyaXR5V29ya2VyOiAoc2VjdXJpdHlEYXRhOiB7IHRva2VuOiBzdHJpbmcgfSB8IG51bGwpID0+IHtcbiAgICAgICAgcmV0dXJuICFzZWN1cml0eURhdGEgPyB7fSA6IHsgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBzZWN1cml0eURhdGEudG9rZW4gfSB9O1xuICAgICAgfSxcbiAgICAgIGN1c3RvbUZldGNoOiBjdXN0b21GZXRjaCB8fCAoKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZmV0Y2goLi4uYXJncylcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBpZihwYXJhbXM/LnRva2VuKVxuICAgICAgY2xpZW50LnNldFNlY3VyaXR5RGF0YSh7IHRva2VuOiBwYXJhbXMudG9rZW4gfSlcblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplLFxuICAgIGdldEN1cnJlbnRUb2tlbigpIHtcbiAgICAgIHJldHVybiBfdG9rZW47XG4gICAgfSxcbiAgICB1cGRhdGVUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgICBfdG9rZW4gPSB0b2tlbjtcbiAgICAgIGNsaWVudC5zZXRTZWN1cml0eURhdGEoeyB0b2tlbiB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGF1dGhvcml6ZSgpOiBQcm9taXNlPFVzZXJSZWFkUmVzcG9uc2U+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHIgPSBhd2FpdCBjbGllbnQudXNlci5jdXJyZW50KCk7XG4gICAgICAgIGxvZyhgTG9nZ2VkIGluIHdpdGggJHtyLmRhdGEuaWR9YCk7XG5cbiAgICAgICAgcmV0dXJuIHIuZGF0YTtcbiAgICAgIH0gY2F0Y2ggKF9leCkge1xuICAgICAgICBjb25zdCBleDogeyBlcnJvcjogRXJyb3JSZXNwb25zZSB9ID0gX2V4IGFzIGFueTtcbiAgICAgICAgdGhyb3cgZXg7XG4gICAgICB9XG4gICAgfSxcblxuXG4gIH07XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iLCJpbXBvcnQgeyBDYWxsYmFjaywgRGVsYXllZFByb21pc2VUeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IERlbGF5ZWRQcm9taXNlOiA8VD4oKSA9PiBEZWxheWVkUHJvbWlzZVR5cGU8VD4gPSA8VD4oKSA9PiB7XG4gICAgY29uc3QgcGNicyA9IHt9IGFzIHsgcmVzb2x2ZTogQ2FsbGJhY2ssIHJlamVjdDogQ2FsbGJhY2sgfTtcblxuICAgIGxldCBwOiBEZWxheWVkUHJvbWlzZVR5cGUgPSBuZXcgUHJvbWlzZSgocnMsIHJqKSA9PiB7XG4gICAgICAgIHBjYnMucmVzb2x2ZSA9IHJzO1xuICAgICAgICBwY2JzLnJlamVjdCA9IHJqO1xuICAgIH0pIGFzIGFueTtcblxuICAgIHAucmVzb2x2ZSA9IHBjYnMucmVzb2x2ZTtcbiAgICBwLnJlamVjdCA9IHBjYnMucmVqZWN0O1xuXG4gICAgcmV0dXJuIHAgYXMgRGVsYXllZFByb21pc2VUeXBlPFQ+O1xufSIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgeyBMb2dMZXZlbCwgVXBkYXRlQ2xpZW50Q29uZmlnLCBXZWJTb2NrZXRJbXBsZW1lbnRhdGlvbiB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IHsgRGVsYXllZFByb21pc2UgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7IFdlYlNlbWFwaG9yZVdlYnNvY2tldHNVcmwgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG4vLyBpbXBvZXIgeyBXZWJTb2NrZXR9XG5cblxuZXhwb3J0IGNsYXNzIFdlYlNlbWFwaG9yZVdlYnNvY2tldHNUcmFuc3BvcnRDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIHNvY2tldDogV2ViU29ja2V0IHwgbnVsbDtcbiAgICBwcml2YXRlIHBpbmdJbnRlcnZhbD86IFJldHVyblR5cGU8dHlwZW9mIHNldEludGVydmFsPjtcbiAgICBwcml2YXRlIHBpbmdDb3VudGVyOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgb3V0Ym91bmRRdWV1ZTogYW55W10gPSBbXTtcbiAgICBwcml2YXRlIHRva2VuOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgdXJsOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgbm9SZWNvbm5lY3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHVwZDogVXBkYXRlQ2xpZW50Q29uZmlnO1xuICAgIHByaXZhdGUgV1NJbXBsZW1lbnRhdGlvbjogV2ViU29ja2V0SW1wbGVtZW50YXRpb247XG4gICAgcHVibGljIGxvZ0xldmVsOiBMb2dMZXZlbCA9IFwiXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgdXBkOiBVcGRhdGVDbGllbnRDb25maWcsXG4gICAgICAgIG9wdHM/OiB7IHdlYnNvY2tldHM/OiBXZWJTb2NrZXRJbXBsZW1lbnRhdGlvbiwgdXJsPzogc3RyaW5nLCBlbnY/OiBzdHJpbmcsIGxvZ0xldmVsPzogTG9nTGV2ZWwgfVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IHdlYnNvY2tldHMgPSBvcHRzPy53ZWJzb2NrZXRzID8gb3B0cy53ZWJzb2NrZXRzIDogKGdsb2JhbFRoaXMgYXMgYW55KS5XZWJTb2NrZXQ7XG4gICAgICAgIHRoaXMuV1NJbXBsZW1lbnRhdGlvbiA9IHdlYnNvY2tldHM7XG5cbiAgICAgICAgLy8gY29uc3QgZW52ID0gb3B0cz8uZW52IHx8IFwicHJvZFwiO1xuXG4gICAgICAgIHRoaXMudXJsID0gb3B0cz8udXJsID8gKFdlYlNlbWFwaG9yZVdlYnNvY2tldHNVcmwob3B0cz8udXJsKSB8fCBvcHRzLnVybCkgOiAoV2ViU2VtYXBob3JlV2Vic29ja2V0c1VybChcInByb2RcIikgYXMgc3RyaW5nKTtcblxuICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7IC8vbmV3IHdlYnNvY2tldHMoKTtcblxuICAgICAgICB0aGlzLnVwZCA9IHVwZDtcblxuICAgICAgICB0aGlzLnRvZ2dsZSA9IHRoaXMudG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2VuZCA9IHRoaXMuc2VuZC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubG9nTGV2ZWwgPSB0aGlzLmxvZ0xldmVsXG5cbiAgICAgICAgaWYgKCF3ZWJzb2NrZXRzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB3ZWJzb2NrZXRzIGltcGxlbWVudGF0aW9uIHByb3ZpZGVkIG9yIGF2YWlsYWJsZSBuYXRpdmVseVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbG9nKC4uLmFyZ3M6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5sb2dMZXZlbClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViU2VtYXBob3JlV2Vic29ja2V0c1RyYW5zcG9ydENsaWVudFwiLCAuLi5hcmdzKTtcbiAgICB9XG5cbiAgICBpc0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIHRoaXMubG9nKFwiUmVhZHkgc3RhdGU6IFwiLCB0aGlzLnNvY2tldD8ucmVhZHlTdGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldCAmJiAodGhpcy5zb2NrZXQucmVhZHlTdGF0ZSA9PT0gdGhpcy5zb2NrZXQuT1BFTik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UGluZyhjb25uIDogYW55KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29ubjpcIiwgY29ubilcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldD8uc2VuZChcInBpbmdcIik7XG4gICAgICAgICAgICB0aGlzLnBpbmdDb3VudGVyKys7XG4gICAgICAgICAgICB0aGlzLmxvZyhcInBpbmcsIHBpbmdDb3VudGVyID09IFwiLCB0aGlzLnBpbmdDb3VudGVyKTtcbiAgICAgICAgfSwgMTAwMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcFBpbmcoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5waW5nSW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc1BvbmcoZXY6IGFueSkge1xuICAgICAgICBpZiAoZXYuZGF0YSA9PT0gXCJwb25nXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGluZ0NvdW50ZXItLTtcbiAgICAgICAgICAgIHRoaXMubG9nKFwicG9uZywgcGluZ0NvdW50ZXIgPT0gXCIsIHRoaXMucGluZ0NvdW50ZXIsIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvZ0Vycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2coZXJyb3IpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTb2NrZXQgaXMgbm90IGF2YWlsYWJsZVwiKTtcblxuICAgICAgICB0aGlzLmJvdW5kTGlzdGVuZXJzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIm9wZW5cIiwgaGFuZGxlcjogdGhpcy5pbml0UGluZyB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIm9wZW5cIiwgaGFuZGxlcjogdGhpcy5mbHVzaCB9LFxuXG4gICAgICAgICAgICB7IG5hbWU6IFwiY2xvc2VcIiwgaGFuZGxlcjogdGhpcy5vbkNsb3NlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiZXJyb3JcIiwgaGFuZGxlcjogdGhpcy5sb2dFcnJvciB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIm1lc3NhZ2VcIiwgaGFuZGxlcjogdGhpcy5wcm9jZXNzUG9uZyB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIm1lc3NhZ2VcIiwgaGFuZGxlcjogdGhpcy5mb3J3YXJkRXZlbnRzIH0sXG4gICAgICAgIF0ubWFwKGwgPT4gKHsgbmFtZTogbC5uYW1lLCBoYW5kbGVyOiBsLmhhbmRsZXIuYmluZCh0aGlzKSB9KSk7XG5cbiAgICAgICAgdGhpcy5ib3VuZExpc3RlbmVycy5mb3JFYWNoKGwgPT4gdGhpcy5zb2NrZXQ/LmFkZEV2ZW50TGlzdGVuZXIobC5uYW1lLCBsLmhhbmRsZXIpKVxuICAgIH1cblxuICAgIGJvdW5kTGlzdGVuZXJzOiB7IG5hbWU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciB9W10gPSBbXTtcblxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTb2NrZXQgaXMgbm90IGF2YWlsYWJsZVwiKTtcblxuICAgICAgICB0aGlzLmJvdW5kTGlzdGVuZXJzLmZvckVhY2gobCA9PlxuICAgICAgICAgICAgdGhpcy5zb2NrZXQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIobC5uYW1lLCBsLmhhbmRsZXIpXG4gICAgICAgIClcblxuICAgICAgICB0aGlzLm5vUmVjb25uZWN0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvcndhcmRFdmVudHMoZXY6IGFueSkge1xuICAgICAgICBpZiAoZXYuZGF0YSA9PT0gXCJwb25nXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoXCJtZXNzYWdlXCIsIGV2KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc3RvcFBpbmcoKTtcbiAgICAgICAgaWYgKCF0aGlzLm5vUmVjb25uZWN0ICYmIHRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKHRoaXMudG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub1JlY29ubmVjdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB0b2dnbGUodG9rZW46IHN0cmluZyA9IFwiXCIpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnVwZCh0aGlzLnVybCwgdGhpcy50b2tlbik7XG5cbiAgICAgICAgY29uc3QgdG9nZ2xpbmdPZmYgPSAhdG9rZW47XG5cbiAgICAgICAgdGhpcy5sb2coXCJXZWJzZW1hcGhvcmUgV2Vic29ja2V0cyBjb25uZWN0aW9uIGlzIHRvZ2dsaW5nXCIsIHRvZ2dsaW5nT2ZmID8gXCJvZmZcIiA6IFwib25cIik7XG5cblxuICAgICAgICBpZiAodGhpcy51cmwgPT09IHVybCAmJiB0b2tlbiA9PSB0aGlzLnRva2VuICYmIHRoaXMuc29ja2V0Py5yZWFkeVN0YXRlID09PSB0aGlzLnNvY2tldD8uT1BFTikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG5cbiAgICAgICAgaWYodG9nZ2xpbmdPZmYpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmZsdXNoKClcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IHRoaXMuV1NJbXBsZW1lbnRhdGlvbih0aGlzLnVybCk7XG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgc2VuZChtc2c6IGFueSkge1xuICAgICAgICB0aGlzLmxvZyhcIlNlbmRpbmdcIiwgbXNnKVxuICAgICAgICBpZiAoIXRoaXMuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRib3VuZFF1ZXVlLnVuc2hpZnQobXNnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgbXNnICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtc2cgPSBKU09OLnN0cmluZ2lmeShtc2cpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb2NrZXQ/LnNlbmQobXNnKTtcbiAgICB9XG5cbiAgICBhc3luYyBmbHVzaCgpIHsgICAgICAgIFxuICAgICAgICBjb25zdCBmbHVzaGVkUHJvbWlzZSA9IERlbGF5ZWRQcm9taXNlPHZvaWQ+KCk7XG4gICAgICAgIGNvbnN0IHNvY2sgPSB0aGlzLnNvY2tldDtcblxuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIGNvbnN0IG9icSA9IHRoaXMub3V0Ym91bmRRdWV1ZSB8fCBbXTtcblxuICAgICAgICB0aGlzLmxvZyhcIkZsdXNoaW5nIG91dGJvdW5kIHF1ZXVlIGhhcyBpdGVtczpcIiwgb2JxLmxlbmd0aCk7XG5cbiAgICAgICAgd2hpbGUob2JxLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMuc2VuZChvYnEucG9wKCkpO1xuXG4gICAgICAgIGNvbnN0IHJlc29sdmVXaGVuRG9uZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRmx1c2hpbmcgI1wiLCBjb3VudCsrKVxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29ubmVjdGVkKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsdXNoZWRQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgY29uc3QgYmEgPSBzb2NrPy5idWZmZXJlZEFtb3VudDtcbiAgICAgICAgICAgIGlmIChiYSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwiSXRlbXMgaW4gYnVmZmVyICNcIiwgY291bnQrKylcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVdoZW5Eb25lKClcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coXCJSZXNvbHZlV2hlbkRvbmUgRG9uZVwiKVxuICAgICAgICAgICAgICAgIGZsdXNoZWRQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlV2hlbkRvbmUoKTtcblxuICAgICAgICByZXR1cm4gZmx1c2hlZFByb21pc2U7XG4gICAgfVxuXG4gICAgLy8gUmVzdCBvZiB5b3VyIGNvZGUuLi5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJTZW1hcGhvcmVXZWJzb2NrZXRzVHJhbnNwb3J0Q2xpZW50O1xuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRlbWl0dGVyM1wiO1xuaW1wb3J0IHsgQWNxdWlyZVJlc3BvbnNlLCBMb2NrUmVxdWVzdFN0YXR1cywgSm9iQWN0aW9uUGFyYW1zLCBBY3F1aXJlUGFyYW1zLCBDYWNoZUl0ZW0sIExvZ0xldmVsIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBEZWxheWVkUHJvbWlzZSB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuaW1wb3J0IHsgV2ViU2VtYXBob3JlV2Vic29ja2V0c1RyYW5zcG9ydENsaWVudCB9IGZyb20gXCIuL3RyYW5zcG9ydFwiO1xuXG50eXBlIFdzSm9iQWN0aW9uczxUPiA9IHtcbiAgcmVsZWFzZTogKHA6IEpvYkFjdGlvblBhcmFtcykgPT4gdm9pZDtcbiAgcmVxdWV1ZTogKHA6IEpvYkFjdGlvblBhcmFtcykgPT4gdm9pZDtcbiAgcmVzY2hlZHVsZTogKHA6IEpvYkFjdGlvblBhcmFtcykgPT4gdm9pZDtcbiAgY2FuY2VsOiAocDogSm9iQWN0aW9uUGFyYW1zKSA9PiB2b2lkO1xuICBhcmNoaXZlOiAocDogSm9iQWN0aW9uUGFyYW1zKSA9PiB2b2lkO1xuICBkZWxldGU6IChwOiBKb2JBY3Rpb25QYXJhbXMpID0+IHZvaWQ7XG59XG5cbnR5cGUgV3NBY3F1aXJlUmVzcG9uc2U8VD4gPSB7XG4gIHN0YXR1czogTG9ja1JlcXVlc3RTdGF0dXM7XG4gIHBheWxvYWQ6IFQ7XG4gIGpvYkNybjogc3RyaW5nO1xufSAmIFdzSm9iQWN0aW9uczxUPjtcblxudHlwZSBBcGlDb25zdHJ1Y3RvclBhcmFtcyA9IHsgd3NDbGllbnQ6IFdlYlNlbWFwaG9yZVdlYnNvY2tldHNUcmFuc3BvcnRDbGllbnQsIGxvZ0xldmVsPzogTG9nTGV2ZWwgfTtcblxuZXhwb3J0IGNsYXNzIFdlYlNlbWFwaG9yZVdlYnNvY2tldHNDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBwcml2YXRlIHdzQ2xpZW50OiBXZWJTZW1hcGhvcmVXZWJzb2NrZXRzVHJhbnNwb3J0Q2xpZW50O1xuICBwcml2YXRlIGNhY2hlOiB7XG4gICAgaW5GbGlnaHQ6IFJlY29yZDxzdHJpbmcsIENhY2hlSXRlbT47XG4gICAgaGlzdG9yeTogc3RyaW5nW107XG4gIH07XG4gIHB1YmxpYyBsb2dMZXZlbDogTG9nTGV2ZWwgPSBcIlwiO1xuXG4gIGNvbnN0cnVjdG9yKG9wdHM6IEFwaUNvbnN0cnVjdG9yUGFyYW1zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud3NDbGllbnQgPSBvcHRzLndzQ2xpZW50O1xuICAgIHRoaXMubG9nTGV2ZWwgPSBvcHRzLmxvZ0xldmVsIHx8IHRoaXMubG9nTGV2ZWw7XG4gICAgLy8gdGhpcy53cyA9IG9wdHM/LndzIHx8ICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IChnbG9iYWxUaGlzIGFzIGFueSkuV2ViU29ja2V0IDogbnVsbCk7XG5cbiAgICBpZiAoIXRoaXMud3NDbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHdlYnNvY2tldHMgaW1wbGVtZW50YXRpb24gYXZhaWxhYmxlLiBJZiB1c2luZyBpbiBub2RlanMgdHJ5IGBucG0gaSB3c2Agb3IgZXF1aXZhbGVudFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgaW5GbGlnaHQ6IHt9LFxuICAgICAgaGlzdG9yeTogW10sXG4gICAgfTtcblxuICAgIHRoaXMud3NDbGllbnQuYWRkTGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldjogYW55KSA9PiB7XG4gICAgICB0aGlzLmVtaXQoXCJtZXNzYWdlXCIsIGV2LmRhdGEpO1xuICAgICAgdGhpcy5fcHJvY2Vzc0luY29taW5nKGV2LmRhdGEpO1xuICAgIH0pO1xuICB9XG5cblxuICBhY3F1aXJlPFQ+KHsgc2VtYXBob3JlSWQsIGNoYW5uZWxJZCwgc3luYywgYm9keSB9OiBBY3F1aXJlUGFyYW1zKSB7XG4gICAgLy8gdGhpcy5hc3NzZXJ0SXNDb25uZWN0ZWQoKTtcblxuICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IERhdGUubm93KCkudG9TdHJpbmcoKSArIFwiLVwiICsgY291bnRlcisrO1xuXG4gICAgdGhpcy53c0NsaWVudC5zZW5kKHtcbiAgICAgIGFjdGlvbjogc3luYyA/IFwibG9jay5hY3F1aXJlU3luY1wiIDogXCJsb2NrLmFjcXVpcmVcIixcbiAgICAgIHBheWxvYWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgYm9keTogYm9keSB8fCBcInt9XCIsXG4gICAgICB9KSxcbiAgICAgIHNlbWFwaG9yZUlkLFxuICAgICAgY2hhbm5lbElkLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IERlbGF5ZWRQcm9taXNlPFdzQWNxdWlyZVJlc3BvbnNlPFQ+PigpO1xuICAgIHRoaXMuY2FjaGUuaW5GbGlnaHRbbWVzc2FnZUlkXSA9IHtcbiAgICAgIHByb21pc2UsXG4gICAgICBzdGF0dXM6IFwid2FpdGluZ1wiLFxuICAgICAgcmVsZWFzZTogKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY2FsbCByZWxlYXNlIGJlZm9yZSB0aGUgbG9jayBpcyBhY3F1aXJlZCBvciByZWplY3RlZFwiKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oKHJlczogV3NBY3F1aXJlUmVzcG9uc2U8VD4pID0+ICh7XG4gICAgICBzdGF0dXM6IHJlcy5zdGF0dXMsXG4gICAgICBwYXlsb2FkOiByZXMucGF5bG9hZCxcbiAgICAgIGpvYkNybjogcmVzLmpvYkNybixcbiAgICAgIHJlbGVhc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZWxlYXNlKHsgam9iQ3JuOiByZXMuam9iQ3JuIH0pXG4gICAgICB9LFxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9nKC4uLmFyZ3M6IGFueSkge1xuICAgIGlmICh0aGlzLmxvZ0xldmVsKVxuICAgICAgY29uc29sZS5sb2coXCJXZWJTZW1hcGhvcmVXZWJzb2NrZXRzQ2xpZW50XCIsIC4uLmFyZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvY2Vzc0luY29taW5nKG1zZzogc3RyaW5nKSB7XG4gICAgLy8gdGhpcy5sb2coXCJHb3QgYSBtZXNzYWdlIGZyb20gV2ViU2VtYXBob3JlXCIsIG1zZyk7XG4gICAgY29uc3QgbyA9IEpTT04ucGFyc2UobXNnKSBhcyBBY3F1aXJlUmVzcG9uc2U7XG4gICAgY29uc3QgZXZlbnQgPSBvLmV2ZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgIGlmIChvLnR5cGUgPT09IFwibG9ja1wiICYmIChldmVudCA9PSBcImFjcXVpcmVkXCIpKSB7XG4gICAgICBjb25zdCBjYWNoZWQgPSB0aGlzLmNhY2hlLmluRmxpZ2h0W28ucGF5bG9hZC5pZF07XG4gICAgICBjYWNoZWQucHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgLi4uY2FjaGVkLFxuICAgICAgICBzdGF0dXM6IG8uZXZlbnQgYXMgTG9ja1JlcXVlc3RTdGF0dXMsXG4gICAgICAgIHBheWxvYWQ6IG8ucGF5bG9hZCxcbiAgICAgICAgam9iQ3JuOiBvLmpvYkNyblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBqb2JBY3Rpb248VD4oeyBqb2JDcm4sIGFjdGlvbiB9OiBKb2JBY3Rpb25QYXJhbXMgJiB7IGFjdGlvbjogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBpc0dlbmVyYXRpdmUgPSBbXCJyZXF1ZXVlXCIsIFwicmVzY2hlZHVsZVwiLCBcImFjcXVpcmVcIl0uaW5jbHVkZXMoYWN0aW9uKTtcblxuICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IERhdGUubm93KCkudG9TdHJpbmcoKSArIFwiLVwiICsgY291bnRlcisrO1xuXG4gICAgdGhpcy53c0NsaWVudC5zZW5kKHtcbiAgICAgIGFjdGlvbjogYGxvY2suJHthY3Rpb259YCxcbiAgICAgIGpvYkNyblxuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IERlbGF5ZWRQcm9taXNlPFdzQWNxdWlyZVJlc3BvbnNlPFQ+PigpO1xuICAgIHRoaXMuY2FjaGUuaW5GbGlnaHRbbWVzc2FnZUlkXSA9IHtcbiAgICAgIHByb21pc2UsXG4gICAgICBzdGF0dXM6IFwid2FpdGluZ1wiLFxuICAgICAgcmVsZWFzZTogKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY2FsbCByZWxlYXNlIGJlZm9yZSB0aGUgbG9jayBpcyBhY3F1aXJlZCBvciByZWplY3RlZFwiKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGlmKCFpc0dlbmVyYXRpdmUpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzOiBgJHthY3Rpb259ZWRgLFxuICAgICAgICBqb2JDcm4sXG4gICAgICAgIHBheWxvYWQ6IFwiXCIsXG4gICAgICAgIHJlbGVhc2U6ICgpID0+IHt9XG4gICAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oKHJlczogV3NBY3F1aXJlUmVzcG9uc2U8VD4pID0+ICh7XG4gICAgICBzdGF0dXM6IHJlcy5zdGF0dXMsXG4gICAgICBwYXlsb2FkOiByZXMucGF5bG9hZCxcbiAgICAgIGpvYkNybjogcmVzLmpvYkNybixcbiAgICAgIHJlbGVhc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZWxlYXNlKHsgam9iQ3JuOiByZXMuam9iQ3JuIH0pXG4gICAgICB9LFxuICAgIH0pKTtcblxuICAgIC8vIHRoaXMubG9nKGBKb2IgYWN0aW9uOiAke2FjdGlvbn0uLi5gLCBqb2JDcm4pXG5cbiAgICAvLyBkZWxldGUgdGhpcy5jYWNoZS5pbkZsaWdodFtqb2JDcm5dO1xuICAgIC8vIHRoaXMuY2FjaGUuaGlzdG9yeS5wdXNoKGpvYkNybik7XG4gIH1cblxuICByZWxlYXNlKHsgam9iQ3JuIH06IEpvYkFjdGlvblBhcmFtcykge1xuICAgIC8vIHRoaXMuYXNzc2VydElzQ29ubmVjdGVkKCk7XG5cbiAgICAvLyB0aGlzLndzQ2xpZW50LnNlbmQoe1xuICAgIC8vICAgYWN0aW9uOiBcImxvY2sucmVsZWFzZVwiLFxuICAgIC8vICAgam9iQ3JuXG4gICAgLy8gfSk7XG5cbiAgICAvLyB0aGlzLmxvZyhcIlJlbGVhc2luZy4uLlwiLCBqb2JDcm4pXG5cbiAgICB0aGlzLmpvYkFjdGlvbih7IGpvYkNybiwgYWN0aW9uOiBcInJlbGVhc2VcIiB9KVxuXG4gICAgZGVsZXRlIHRoaXMuY2FjaGUuaW5GbGlnaHRbam9iQ3JuXTtcbiAgICB0aGlzLmNhY2hlLmhpc3RvcnkucHVzaChqb2JDcm4pO1xuICB9XG5cbiAgcmVxdWV1ZSAgICAgKHsgam9iQ3JuIH06IEpvYkFjdGlvblBhcmFtcykgeyByZXR1cm4gdGhpcy5qb2JBY3Rpb24oeyBqb2JDcm4sIGFjdGlvbjogXCJyZXF1ZXVlXCIgICAgfSk7IH1cbiAgcmVzY2hlZHVsZSAgKHsgam9iQ3JuIH06IEpvYkFjdGlvblBhcmFtcykgeyByZXR1cm4gdGhpcy5qb2JBY3Rpb24oeyBqb2JDcm4sIGFjdGlvbjogXCJyZXNjaGVkdWxlXCIgfSk7IH1cbiAgY2FuY2VsICAgICAgKHsgam9iQ3JuIH06IEpvYkFjdGlvblBhcmFtcykgeyByZXR1cm4gdGhpcy5qb2JBY3Rpb24oeyBqb2JDcm4sIGFjdGlvbjogXCJjYW5jZWxcIiAgICAgfSk7IH1cbiAgYXJjaGl2ZSAgICAgKHsgam9iQ3JuIH06IEpvYkFjdGlvblBhcmFtcykgeyByZXR1cm4gdGhpcy5qb2JBY3Rpb24oeyBqb2JDcm4sIGFjdGlvbjogXCJhcmNoaXZlXCIgICAgfSk7IH1cbiAgZGVsZXRlICAgICAgKHsgam9iQ3JuIH06IEpvYkFjdGlvblBhcmFtcykgeyByZXR1cm4gdGhpcy5qb2JBY3Rpb24oeyBqb2JDcm4sIGFjdGlvbjogXCJkZWxldGVcIiAgICAgfSk7IH1cblxuICBjbGllbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMud3NDbGllbnQ7XG4gIH1cblxuICBzZXRDbGllbnQoY2xpZW50OiBXZWJTZW1hcGhvcmVXZWJzb2NrZXRzVHJhbnNwb3J0Q2xpZW50KSB7XG4gICAgdGhpcy53c0NsaWVudCA9IGNsaWVudDtcbiAgfVxuXG4gIGdldENhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlNlbWFwaG9yZVdlYnNvY2tldHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBXZWJTZW1hcGhvcmVXZWJzb2NrZXRzVHJhbnNwb3J0Q2xpZW50IH0gZnJvbSBcIi4vdHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBXZWJTZW1hcGhvcmVXZWJzb2NrZXRzQ2xpZW50IH0gZnJvbSBcIi4vY2xpZW50XCI7XG5pbXBvcnQgeyBEZWxheWVkUHJvbWlzZSB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuaW1wb3J0IHsgV2ViU29ja2V0SW1wbGVtZW50YXRpb24sIExvZ0xldmVsIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBXZWJTZW1hcGhvcmVXZWJzb2NrZXRzQ2xpZW50TWFuYWdlciA9IChvcHRzPzogeyB3ZWJzb2NrZXRzPzogV2ViU29ja2V0SW1wbGVtZW50YXRpb24sIGxvZ0xldmVsPzogTG9nTGV2ZWwsIGJhc2VVcmw/OiBzdHJpbmcgfSkgPT4ge1xuICAgIGNvbnN0IHdzSW1wbDogV2ViU29ja2V0SW1wbGVtZW50YXRpb24gPSBvcHRzPy53ZWJzb2NrZXRzID8gb3B0cy53ZWJzb2NrZXRzIDogKGdsb2JhbFRoaXMgYXMgYW55KS5XZWJTb2NrZXQ7XG5cbiAgICBjb25zdCB3c0NsaWVudCA9IG5ldyBXZWJTZW1hcGhvcmVXZWJzb2NrZXRzVHJhbnNwb3J0Q2xpZW50KFxuICAgICAgICAod3NTZXJ2ZXI6IHN0cmluZywgdG9rZW46IHN0cmluZykgPT4gYCR7d3NTZXJ2ZXJ9P3Rva2VuPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRva2VuKX1gLFxuICAgICAgICB7IHdlYnNvY2tldHM6IHdzSW1wbCwgbG9nTGV2ZWw6IG9wdHM/LmxvZ0xldmVsLCB1cmw6IG9wdHM/LmJhc2VVcmwgfVxuICAgICk7XG5cbiAgICBsZXQgY2hhaW5zdHJlYW1XZWJzb2NrZXRzQ2xpZW50ID0gbmV3IFdlYlNlbWFwaG9yZVdlYnNvY2tldHNDbGllbnQoeyB3c0NsaWVudDogd3NDbGllbnQsIGxvZ0xldmVsOiBvcHRzPy5sb2dMZXZlbCB9KVxuXG4gICAgY29uc3QgY29ubmVjdCA9IGFzeW5jICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICghdG9rZW4gfHwgIXRva2VuLnJlcGxhY2UoL15BcGlLZXkuLywgXCJcIikpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3Vsbid0IGNvbm5lY3QgKGRpZCB5b3UgcGFzcyBhIHRva2VuPylcIik7XG5cbiAgICAgICAgY29uc3QgY29ubmVjdFByb21pc2UgPSBEZWxheWVkUHJvbWlzZTxXZWJTZW1hcGhvcmVXZWJzb2NrZXRzQ2xpZW50PigpO1xuXG4gICAgICAgIGF3YWl0IHdzQ2xpZW50LnRvZ2dsZSh0b2tlbik7XG5cbiAgICAgICAgaWYgKCF3c0NsaWVudC5zb2NrZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZWJzb2NrZXQgd2FzIG5vdCBjcmVhdGVkLCB0aGUgcHJvdmlkZWQgaW1wbGVtZW50YXRpb24gbWlnaHQgYmUgaW5jb21wYXRpYmxlLlwiKVxuXG4gICAgICAgIHdzQ2xpZW50LnNvY2tldC5hZGRFdmVudExpc3RlbmVyICYmXG4gICAgICAgICAgICB3c0NsaWVudC5zb2NrZXRcbiAgICAgICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIChldjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICAgICAgICAgICAgICBvcHRzPy5sb2dMZXZlbCAmJiBjb25zb2xlLmxvZyhcIkNvdWxkbid0IGNvbm5lY3QsIGFib3J0ZWQuLi5cIiwgZXYpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGFpbnN0cmVhbVdlYnNvY2tldHNDbGllbnQuc2V0Q2xpZW50KGNoYWluc3RyZWFtV2Vic29ja2V0c0NsaWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3RQcm9taXNlLnJlamVjdChldilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgd3NDbGllbnQuc29ja2V0XG4gICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgKGV2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBvcHRzPy5sb2dMZXZlbCAmJiBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC4uLlwiKTtcbiAgICAgICAgICAgICAgICAvLyBjaGFpbnN0cmVhbVdlYnNvY2tldHNDbGllbnQuc2V0Q2xpZW50KGNoYWluc3RyZWFtV2Vic29ja2V0c0NsaWVudCk7XG4gICAgICAgICAgICAgICAgY29ubmVjdFByb21pc2UucmVzb2x2ZShjaGFpbnN0cmVhbVdlYnNvY2tldHNDbGllbnQpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29ubmVjdFByb21pc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzY29ubmVjdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHdzQ2xpZW50LnRvZ2dsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbm5lY3QsXG4gICAgICAgIGRpc2Nvbm5lY3QsXG4gICAgICAgIHdzQ2xpZW50LFxuICAgICAgICBjbGllbnQ6IGNoYWluc3RyZWFtV2Vic29ja2V0c0NsaWVudFxuICAgIH1cblxufSJdLCJuYW1lcyI6WyJhcGlVcmwiLCJwcm90b2NvbCIsInN0YWdlIiwicHJlZml4IiwiREVGQVVMVF9SRUdJT04iLCJzdGFnZXMiLCJhY3R1YWxTdGFnZSIsIldlYlNlbWFwaG9yZUFwaVVybCIsIldlYlNlbWFwaG9yZVdlYnNvY2tldHNVcmwiLCJDb250ZW50VHlwZSIsIkh0dHBDbGllbnQiLCJhcGlDb25maWciLCJfX3B1YmxpY0ZpZWxkIiwiZmV0Y2hQYXJhbXMiLCJkYXRhIiwiaW5wdXQiLCJmb3JtRGF0YSIsImtleSIsInByb3BlcnR5IiwiY2FuY2VsVG9rZW4iLCJhYm9ydENvbnRyb2xsZXIiLCJib2R5Iiwic2VjdXJlIiwicGF0aCIsInR5cGUiLCJxdWVyeSIsImZvcm1hdCIsImJhc2VVcmwiLCJwYXJhbXMiLCJzZWN1cmVQYXJhbXMiLCJyZXF1ZXN0UGFyYW1zIiwicXVlcnlTdHJpbmciLCJwYXlsb2FkRm9ybWF0dGVyIiwicmVzcG9uc2VGb3JtYXQiLCJyZXNwb25zZSIsInIiLCJlIiwidmFsdWUiLCJ2IiwicmF3UXVlcnkiLCJwYXJhbXMxIiwicGFyYW1zMiIsIkFwaSIsIkdlbmVyYXRlTWFwcGluZ1JlcXVlc3QiLCJBcGlrZXlVcHNlcnRSZXF1ZXN0IiwiSWRTZXNzaW9uVG9rZW5SZXF1ZXN0IiwiRW1haWxVcHNlcnRSZXF1ZXN0IiwiU3RyaXBlQ2hlY2tvdXRTZXNzaW9uQ3JlYXRlUmVxdWVzdCIsIlNlbWFwaG9yZVVwc2VydFJlcXVlc3QiLCJzZW1hcGhvcmVJZCIsIlNlbWFwaG9yZUxvY2tSZXF1ZXN0IiwiU2VtYXBob3JlQ2hhbm5lbCIsIlNlbWFwaG9yZUpvYlN0YXRlVHJhbnNmb3JtUmVxdWVzdCIsIlVzZXJDcmVhdGVSZXF1ZXN0IiwiVXNlclVwZGF0ZVJlcXVlc3QiLCJVc2VyVXBkYXRlUGFzc3dvcmROb3JtYWwiLCJXZWJzZW1hcGhvcmVIdHRwQ2xpZW50IiwiV2ViU2VtYXBob3JlSHR0cENsaWVudE1hbmFnZXIiLCJjbGllbnQiLCJfdG9rZW4iLCJsb2ciLCJhcmdzIiwiY3VzdG9tRmV0Y2giLCJzZWN1cml0eURhdGEiLCJ0b2tlbiIsIl9leCIsImhhcyIsIkV2ZW50cyIsIkVFIiwiZm4iLCJjb250ZXh0Iiwib25jZSIsImFkZExpc3RlbmVyIiwiZW1pdHRlciIsImV2ZW50IiwibGlzdGVuZXIiLCJldnQiLCJjbGVhckV2ZW50IiwiRXZlbnRFbWl0dGVyIiwibmFtZXMiLCJldmVudHMiLCJuYW1lIiwiaGFuZGxlcnMiLCJpIiwibCIsImVlIiwibGlzdGVuZXJzIiwiYTEiLCJhMiIsImEzIiwiYTQiLCJhNSIsImxlbiIsImxlbmd0aCIsImoiLCJtb2R1bGUiLCJEZWxheWVkUHJvbWlzZSIsInBjYnMiLCJwIiwicnMiLCJyaiIsIldlYlNlbWFwaG9yZVdlYnNvY2tldHNUcmFuc3BvcnRDbGllbnQiLCJ1cGQiLCJvcHRzIiwid2Vic29ja2V0cyIsIl9hIiwiY29ubiIsImV2IiwiZXJyb3IiLCJfYiIsInVybCIsInRvZ2dsaW5nT2ZmIiwibXNnIiwiZmx1c2hlZFByb21pc2UiLCJzb2NrIiwiY291bnQiLCJvYnEiLCJyZXNvbHZlV2hlbkRvbmUiLCJXZWJTZW1hcGhvcmVXZWJzb2NrZXRzQ2xpZW50IiwiY2hhbm5lbElkIiwic3luYyIsImNvdW50ZXIiLCJtZXNzYWdlSWQiLCJwcm9taXNlIiwicmVzIiwibyIsImNhY2hlZCIsImpvYkNybiIsImFjdGlvbiIsImlzR2VuZXJhdGl2ZSIsIldlYlNlbWFwaG9yZVdlYnNvY2tldHNDbGllbnRNYW5hZ2VyIiwid3NJbXBsIiwid3NDbGllbnQiLCJ3c1NlcnZlciIsImNoYWluc3RyZWFtV2Vic29ja2V0c0NsaWVudCIsImNvbm5lY3RQcm9taXNlIl0sIm1hcHBpbmdzIjoiOzs7QUFDQSxNQUFNQSxJQUFTLENBQUNDLEdBQWtCQyxHQUFlQyxNQUN0QyxHQUFHRixDQUFRLE1BQU1FLEtBQVUsRUFBRSxPQUFPRCxDQUFLLHdCQUc5Q0UsSUFBaUIsTUFFakJDLElBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDSixHQUNNQyxJQUFjLENBQUNKLE1BQW1DLENBQUMsT0FBTyxNQUFNLEVBQUUsU0FBU0EsQ0FBSyxJQUFLRSxJQUFpQixNQUFNRixJQUFTQSxHQUU5R0ssSUFBcUIsQ0FBQ0wsTUFBa0JHLEVBQU8sU0FBU0gsQ0FBSyxLQUFLRixFQUFPLFNBQVNNLEVBQVlKLENBQUssQ0FBQyxHQUNwR00sSUFBNEIsQ0FBQ04sTUFBa0JHLEVBQU8sU0FBU0gsQ0FBSyxLQUFLRixFQUFPLE9BQU9NLEVBQVlKLENBQUssR0FBRyxJQUFJO0FDb2lCaEgsSUFBQU8sc0JBQUFBLE9BQ1ZBLEVBQUEsT0FBTyxvQkFDUEEsRUFBQSxXQUFXLHVCQUNYQSxFQUFBLGFBQWEscUNBQ2JBLEVBQUEsT0FBTyxjQUpHQSxJQUFBQSxLQUFBLENBQUEsQ0FBQTtBQU9MLE1BQU1DLEVBQXVDO0FBQUEsRUFjbEQsWUFBWUMsSUFBeUMsSUFBSTtBQWJsRCxJQUFBQyxFQUFBLGlCQUFrQjtBQUNqQixJQUFBQSxFQUFBLHNCQUF3QztBQUN4QyxJQUFBQSxFQUFBO0FBQ0EsSUFBQUEsRUFBQSw4Q0FBdUIsSUFBa0M7QUFDekQsSUFBQUEsRUFBQSxxQkFBYyxJQUFJQyxNQUEwQyxNQUFNLEdBQUdBLENBQVc7QUFFaEYsSUFBQUQsRUFBQSx1QkFBK0I7QUFBQSxNQUNyQyxhQUFhO0FBQUEsTUFDYixTQUFT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
