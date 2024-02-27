var P = /* @__PURE__ */ ((o) => (o.Json = "application/json", o.FormData = "multipart/form-data", o.UrlEncoded = "application/x-www-form-urlencoded", o.Text = "text/plain", o))(P || {});
class q {
  constructor(t = {}) {
    this.baseUrl = "https://api-eu-dev.websemaphore.com/v1", this.securityData = null, this.abortControllers = /* @__PURE__ */ new Map(), this.customFetch = (...e) => fetch(...e), this.baseApiParams = {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }, this.setSecurityData = (e) => {
      this.securityData = e;
    }, this.contentFormatters = {
      "application/json": (e) => e !== null && (typeof e == "object" || typeof e == "string") ? JSON.stringify(e) : e,
      "text/plain": (e) => e !== null && typeof e != "string" ? JSON.stringify(e) : e,
      "multipart/form-data": (e) => Object.keys(e || {}).reduce((s, c) => {
        const n = e[c];
        return s.append(
          c,
          n instanceof Blob ? n : typeof n == "object" && n !== null ? JSON.stringify(n) : `${n}`
        ), s;
      }, new FormData()),
      "application/x-www-form-urlencoded": (e) => this.toQueryString(e)
    }, this.createAbortSignal = (e) => {
      if (this.abortControllers.has(e)) {
        const c = this.abortControllers.get(e);
        return c ? c.signal : void 0;
      }
      const s = new AbortController();
      return this.abortControllers.set(e, s), s.signal;
    }, this.abortRequest = (e) => {
      const s = this.abortControllers.get(e);
      s && (s.abort(), this.abortControllers.delete(e));
    }, this.request = async ({
      body: e,
      secure: s,
      path: c,
      type: n,
      query: p,
      format: u,
      baseUrl: a,
      cancelToken: i,
      ...h
    }) => {
      const l = (typeof s == "boolean" ? s : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {}, f = this.mergeRequestParams(h, l), y = p && this.toQueryString(p), m = this.contentFormatters[
        n || "application/json"
        /* Json */
      ], v = u || f.format;
      return this.customFetch(`${a || this.baseUrl || ""}${c}${y ? `?${y}` : ""}`, {
        ...f,
        headers: {
          ...f.headers || {},
          ...n && n !== "multipart/form-data" ? { "Content-Type": n } : {}
        },
        signal: i ? this.createAbortSignal(i) : f.signal,
        body: typeof e > "u" || e === null ? null : m(e)
      }).then(async (r) => {
        const g = r;
        g.data = null, g.error = null;
        const b = v ? await r[v]().then((d) => (g.ok ? g.data = d : g.error = d, g)).catch((d) => (g.error = d, g)) : g;
        if (i && this.abortControllers.delete(i), !r.ok)
          throw b;
        return b;
      });
    }, Object.assign(this, t);
  }
  encodeQueryParam(t, e) {
    return `${encodeURIComponent(t)}=${encodeURIComponent(typeof e == "number" ? e : `${e}`)}`;
  }
  addQueryParam(t, e) {
    return this.encodeQueryParam(e, t[e]);
  }
  addArrayQueryParam(t, e) {
    return t[e].map((c) => this.encodeQueryParam(e, c)).join("&");
  }
  toQueryString(t) {
    const e = t || {};
    return Object.keys(e).filter((c) => typeof e[c] < "u").map((c) => Array.isArray(e[c]) ? this.addArrayQueryParam(e, c) : this.addQueryParam(e, c)).join("&");
  }
  addQueryParams(t) {
    const e = this.toQueryString(t);
    return e ? `?${e}` : "";
  }
  mergeRequestParams(t, e) {
    return {
      ...this.baseApiParams,
      ...t,
      ...e || {},
      headers: {
        ...this.baseApiParams.headers || {},
        ...t.headers || {},
        ...e && e.headers || {}
      }
    };
  }
}
class C extends q {
  constructor() {
    super(...arguments), this.advisor = {
      /**
       * No description
       *
       * @tags clientAlias#generateMapping
       * @name GenerateMapping
       * @summary upcoming...
       * @request POST:/advisor/generateMapping
       * @secure
       */
      generateMapping: (t, e = {}) => this.request({
        path: "/advisor/generateMapping",
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsAdvisor
       * @request OPTIONS:/advisor/generateMapping
       */
      optionsAdvisor: (t = {}) => this.request({
        path: "/advisor/generateMapping",
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    }, this.apikey = {
      /**
       * No description
       *
       * @tags clientAlias#list
       * @name List
       * @summary List API client keys.
       * @request GET:/apikey/readKeys
       * @secure
       */
      list: (t, e = {}) => this.request({
        path: "/apikey/readKeys",
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsApikey
       * @request OPTIONS:/apikey/readKeys
       */
      optionsApikey: (t = {}) => this.request({
        path: "/apikey/readKeys",
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      upsert: (t, e = {}) => this.request({
        path: "/apikey/upsertKey",
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsApikey2
       * @request OPTIONS:/apikey/upsertKey
       * @originalName optionsApikey
       * @duplicate
       */
      optionsApikey2: (t = {}) => this.request({
        path: "/apikey/upsertKey",
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    }, this.auth = {
      /**
       * No description
       *
       * @tags clientAlias#getJWT
       * @name GetJwt
       * @summary upcoming...
       * @request POST:/auth/idGetToken
       */
      getJwt: (t, e = {}) => this.request({
        path: "/auth/idGetToken",
        method: "POST",
        body: t,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsAuth
       * @request OPTIONS:/auth/idGetToken
       */
      optionsAuth: (t = {}) => this.request({
        path: "/auth/idGetToken",
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    }, this.emails = {
      /**
       * No description
       *
       * @tags clientAlias#upsert
       * @name Upsert
       * @request POST:/emails/upsertEmail
       */
      upsert: (t, e = {}) => this.request({
        path: "/emails/upsertEmail",
        method: "POST",
        body: t,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsEmails
       * @request OPTIONS:/emails/upsertEmail
       */
      optionsEmails: (t = {}) => this.request({
        path: "/emails/upsertEmail",
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    }, this.info = {
      /**
       * No description
       *
       * @name InfoList
       * @request GET:/info
       */
      infoList: (t = {}) => this.request({
        path: "/info",
        method: "GET",
        type: "application/json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsInfo
       * @request OPTIONS:/info
       */
      optionsInfo: (t = {}) => this.request({
        path: "/info",
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    }, this.infoAuth = {
      /**
       * No description
       *
       * @name InfoAuthList
       * @request GET:/info-auth
       * @secure
       */
      infoAuthList: (t = {}) => this.request({
        path: "/info-auth",
        method: "GET",
        secure: !0,
        type: "application/json",
        ...t
      }),
      /**
       * No description
       *
       * @name OptionsInfoAuth
       * @request OPTIONS:/info-auth
       */
      optionsInfoAuth: (t = {}) => this.request({
        path: "/info-auth",
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    }, this.semaphore = {
      /**
       * No description
       *
       * @tags clientAlias#read
       * @name Read
       * @summary Returns a semaphore's settings
       * @request GET:/semaphore
       * @secure
       */
      read: (t, e = {}) => this.request({
        path: "/semaphore",
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @tags clientAlias#upsert
       * @name Upsert
       * @summary Creates or updates a semaphore's settings. Omit the id in input to create a new semaphore.
       * @request POST:/semaphore
       * @secure
       */
      upsert: (t, e = {}) => this.request({
        path: "/semaphore",
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore
       * @request OPTIONS:/semaphore
       */
      optionsSemaphore: (t = {}) => this.request({
        path: "/semaphore",
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
      /**
       * No description
       *
       * @tags clientAlias#list
       * @name List
       * @summary List semaphores. Use .startKey to page through results
       * @request GET:/semaphore/list
       * @secure
       */
      list: (t, e = {}) => this.request({
        path: "/semaphore/list",
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore2
       * @request OPTIONS:/semaphore/list
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore2: (t = {}) => this.request({
        path: "/semaphore/list",
        method: "OPTIONS",
        type: "application/json",
        ...t
      }),
      /**
       * No description
       *
       * @tags clientAlias#acquire
       * @name Acquire
       * @summary upcoming...
       * @request POST:/semaphore/{semaphoreId}/acquire
       * @secure
       */
      acquire: (t, e, s = {}) => this.request({
        path: `/semaphore/${t}/acquire`,
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        ...s
      }),
      /**
       * No description
       *
       * @tags clientAlias#acquireSync
       * @name AcquireSync
       * @summary Synchronously acquire a semaphore lock. Immediately returns either an `acquired` or `rejected` status.
       * @request POST:/semaphore/{semaphoreId}/acquireSync
       * @secure
       */
      acquireSync: (t, e, s = {}) => this.request({
        path: `/semaphore/${t}/acquireSync`,
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...s
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore3
       * @request OPTIONS:/semaphore/{semaphoreId}/acquireSync
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore3: (t, e = {}) => this.request({
        path: `/semaphore/${t}/acquireSync`,
        method: "OPTIONS",
        type: "application/json",
        ...e
      }),
      /**
       * No description
       *
       * @tags clientAlias#activate
       * @name Activate
       * @summary Synchronously acquire a semaphore lock. Immediately returns either an `acquired` or `rejected` status.
       * @request POST:/semaphore/{semaphoreId}/activate
       * @secure
       */
      activate: (t, e, s = {}) => this.request({
        path: `/semaphore/${t}/activate`,
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...s
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore4
       * @request OPTIONS:/semaphore/{semaphoreId}/activate
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore4: (t, e = {}) => this.request({
        path: `/semaphore/${t}/activate`,
        method: "OPTIONS",
        type: "application/json",
        ...e
      }),
      /**
       * No description
       *
       * @tags clientAlias#purgeQueue
       * @name PurgeQueue
       * @summary purge message queue
       * @request DELETE:/semaphore/{semaphoreId}/purge
       * @secure
       */
      purgeQueue: (t, e = {}) => this.request({
        path: `/semaphore/${t}/purge`,
        method: "DELETE",
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore5
       * @request OPTIONS:/semaphore/{semaphoreId}/purge
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore5: (t, e = {}) => this.request({
        path: `/semaphore/${t}/purge`,
        method: "OPTIONS",
        type: "application/json",
        ...e
      }),
      /**
       * No description
       *
       * @tags clientAlias#readQueue
       * @name ReadQueue
       * @summary Returns a semaphore's queue contents
       * @request GET:/semaphore/{semaphoreId}/readQueue
       * @secure
       */
      readQueue: (t, e, s = {}) => this.request({
        path: `/semaphore/${t}/readQueue`,
        method: "GET",
        query: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...s
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore6
       * @request OPTIONS:/semaphore/{semaphoreId}/readQueue
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore6: (t, e = {}) => this.request({
        path: `/semaphore/${t}/readQueue`,
        method: "OPTIONS",
        type: "application/json",
        ...e
      }),
      /**
       * No description
       *
       * @tags clientAlias#release
       * @name Release
       * @summary Release a semaphore lock.
       * @request POST:/semaphore/{semaphoreId}/release
       * @secure
       */
      release: (t, e, s = {}) => this.request({
        path: `/semaphore/${t}/release`,
        method: "POST",
        body: e,
        secure: !0,
        type: "application/json",
        format: "json",
        ...s
      }),
      /**
       * No description
       *
       * @name OptionsSemaphore7
       * @request OPTIONS:/semaphore/{semaphoreId}/release
       * @originalName optionsSemaphore
       * @duplicate
       */
      optionsSemaphore7: (t, e = {}) => this.request({
        path: `/semaphore/${t}/release`,
        method: "OPTIONS",
        type: "application/json",
        ...e
      })
    }, this.user = {
      /**
       * No description
       *
       * @tags clientAlias#read
       * @name Read
       * @summary upcoming...
       * @request GET:/user
       * @secure
       */
      read: (t, e = {}) => this.request({
        path: "/user",
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
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
      create: (t, e = {}) => this.request({
        path: "/user",
        method: "POST",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
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
      update: (t, e = {}) => this.request({
        path: "/user",
        method: "PUT",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsUser
       * @request OPTIONS:/user
       */
      optionsUser: (t = {}) => this.request({
        path: "/user",
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      activityStream: (t, e = {}) => this.request({
        path: "/user/activityStream",
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsUser2
       * @request OPTIONS:/user/activityStream
       * @originalName optionsUser
       * @duplicate
       */
      optionsUser2: (t = {}) => this.request({
        path: "/user/activityStream",
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      current: (t, e = {}) => this.request({
        path: "/user/current",
        method: "GET",
        query: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsUser3
       * @request OPTIONS:/user/current
       * @originalName optionsUser
       * @duplicate
       */
      optionsUser3: (t = {}) => this.request({
        path: "/user/current",
        method: "OPTIONS",
        type: "application/json",
        ...t
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
      updatePassword: (t, e = {}) => this.request({
        path: "/user/password",
        method: "PUT",
        body: t,
        secure: !0,
        type: "application/json",
        format: "json",
        ...e
      }),
      /**
       * No description
       *
       * @name OptionsUser4
       * @request OPTIONS:/user/password
       * @originalName optionsUser
       * @duplicate
       */
      optionsUser4: (t = {}) => this.request({
        path: "/user/password",
        method: "OPTIONS",
        type: "application/json",
        ...t
      })
    };
  }
}
class E extends C {
}
const j = {
  dev: "https://api-eu-dev.websemaphore.com/v1",
  prod: "https://api.websemaphore.com/v1"
}, x = (o) => {
  let t, e = (o == null ? void 0 : o.token) || "";
  const s = (...n) => {
    o != null && o.logLevel && console.log("WebSemaphoreHttpClientManager", ...n);
  };
  return {
    initialize: (n) => {
      let { baseUrl: p, fetch: u } = n || {};
      return p = p || "prod", j[p] && (p = j[p]), s(p), t = new E({
        baseUrl: p,
        securityWorker: (a) => a ? { headers: { Authorization: a.token } } : {},
        customFetch: u || ((...a) => fetch(...a))
      }), n != null && n.token && t.setSecurityData({ token: n.token }), t;
    },
    getCurrentToken() {
      return e;
    },
    updateToken(n) {
      e = n, t.setSecurityData({ token: n });
    },
    async authorize() {
      try {
        const n = await t.user.current();
        return s(`Logged in with ${n.data.id}`), n.data;
      } catch (n) {
        throw n;
      }
    }
  };
};
function T(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var O = { exports: {} };
(function(o) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (e = !1));
  function c(a, i, h) {
    this.fn = a, this.context = i, this.once = h || !1;
  }
  function n(a, i, h, l, f) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var y = new c(h, l || a, f), m = e ? e + i : i;
    return a._events[m] ? a._events[m].fn ? a._events[m] = [a._events[m], y] : a._events[m].push(y) : (a._events[m] = y, a._eventsCount++), a;
  }
  function p(a, i) {
    --a._eventsCount === 0 ? a._events = new s() : delete a._events[i];
  }
  function u() {
    this._events = new s(), this._eventsCount = 0;
  }
  u.prototype.eventNames = function() {
    var i = [], h, l;
    if (this._eventsCount === 0)
      return i;
    for (l in h = this._events)
      t.call(h, l) && i.push(e ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(h)) : i;
  }, u.prototype.listeners = function(i) {
    var h = e ? e + i : i, l = this._events[h];
    if (!l)
      return [];
    if (l.fn)
      return [l.fn];
    for (var f = 0, y = l.length, m = new Array(y); f < y; f++)
      m[f] = l[f].fn;
    return m;
  }, u.prototype.listenerCount = function(i) {
    var h = e ? e + i : i, l = this._events[h];
    return l ? l.fn ? 1 : l.length : 0;
  }, u.prototype.emit = function(i, h, l, f, y, m) {
    var v = e ? e + i : i;
    if (!this._events[v])
      return !1;
    var r = this._events[v], g = arguments.length, b, d;
    if (r.fn) {
      switch (r.once && this.removeListener(i, r.fn, void 0, !0), g) {
        case 1:
          return r.fn.call(r.context), !0;
        case 2:
          return r.fn.call(r.context, h), !0;
        case 3:
          return r.fn.call(r.context, h, l), !0;
        case 4:
          return r.fn.call(r.context, h, l, f), !0;
        case 5:
          return r.fn.call(r.context, h, l, f, y), !0;
        case 6:
          return r.fn.call(r.context, h, l, f, y, m), !0;
      }
      for (d = 1, b = new Array(g - 1); d < g; d++)
        b[d - 1] = arguments[d];
      r.fn.apply(r.context, b);
    } else {
      var k = r.length, w;
      for (d = 0; d < k; d++)
        switch (r[d].once && this.removeListener(i, r[d].fn, void 0, !0), g) {
          case 1:
            r[d].fn.call(r[d].context);
            break;
          case 2:
            r[d].fn.call(r[d].context, h);
            break;
          case 3:
            r[d].fn.call(r[d].context, h, l);
            break;
          case 4:
            r[d].fn.call(r[d].context, h, l, f);
            break;
          default:
            if (!b)
              for (w = 1, b = new Array(g - 1); w < g; w++)
                b[w - 1] = arguments[w];
            r[d].fn.apply(r[d].context, b);
        }
    }
    return !0;
  }, u.prototype.on = function(i, h, l) {
    return n(this, i, h, l, !1);
  }, u.prototype.once = function(i, h, l) {
    return n(this, i, h, l, !0);
  }, u.prototype.removeListener = function(i, h, l, f) {
    var y = e ? e + i : i;
    if (!this._events[y])
      return this;
    if (!h)
      return p(this, y), this;
    var m = this._events[y];
    if (m.fn)
      m.fn === h && (!f || m.once) && (!l || m.context === l) && p(this, y);
    else {
      for (var v = 0, r = [], g = m.length; v < g; v++)
        (m[v].fn !== h || f && !m[v].once || l && m[v].context !== l) && r.push(m[v]);
      r.length ? this._events[y] = r.length === 1 ? r[0] : r : p(this, y);
    }
    return this;
  }, u.prototype.removeAllListeners = function(i) {
    var h;
    return i ? (h = e ? e + i : i, this._events[h] && p(this, h)) : (this._events = new s(), this._eventsCount = 0), this;
  }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = e, u.EventEmitter = u, o.exports = u;
})(O);
var L = O.exports;
const _ = /* @__PURE__ */ T(L), S = () => {
  const o = {};
  let t = new Promise((e, s) => {
    o.resolve = e, o.reject = s;
  });
  return t.resolve = o.resolve, t.reject = o.reject, t;
}, I = {
  dev: "wss://wsapi-eu-dev.websemaphore.com/v1",
  prod: "wss://wsapi.websemaphore.com/v1"
};
class N extends _ {
  constructor(t, e) {
    super(), this.pingCounter = 0, this.outboundQueue = [], this.token = "", this.url = "", this.noReconnect = !1, this.logLevel = "", this.boundListeners = [];
    const s = e != null && e.websockets ? e.websockets : globalThis.WebSocket;
    this.WSImplementation = s;
    const c = (e == null ? void 0 : e.env) || "prod";
    if (this.url = (e == null ? void 0 : e.url) || I[c], this.socket = null, this.upd = t, this.toggle = this.toggle.bind(this), this.send = this.send.bind(this), this.logLevel = this.logLevel, !s)
      throw new Error("No websockets implementation provided or available natively");
  }
  log(...t) {
    this.logLevel && console.log("WebSemaphoreWebsocketsTransportClient", ...t);
  }
  isConnected() {
    var t;
    return this.log("Ready state: ", (t = this.socket) == null ? void 0 : t.readyState), this.socket && this.socket.readyState === this.socket.OPEN;
  }
  initPing() {
    this.pingInterval = setInterval(() => {
      var t;
      (t = this.socket) == null || t.send("ping"), this.pingCounter++, this.log("ping, pingCounter == ", this.pingCounter);
    }, 1e4);
  }
  stopPing() {
    clearInterval(this.pingInterval);
  }
  processPong(t) {
    t.data === "pong" && (this.pingCounter--, this.log("pong, pingCounter == ", this.pingCounter, (/* @__PURE__ */ new Date()).toISOString()));
  }
  logError(t) {
    this.log(t);
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
    ].map((t) => ({ name: t.name, handler: t.handler.bind(this) })), this.boundListeners.forEach((t) => {
      var e;
      return (e = this.socket) == null ? void 0 : e.addEventListener(t.name, t.handler);
    });
  }
  removeEventListeners() {
    if (!this.socket)
      throw new Error("Socket is not available");
    this.boundListeners.forEach(
      (t) => {
        var e;
        return (e = this.socket) == null ? void 0 : e.removeEventListener(t.name, t.handler);
      }
    ), this.noReconnect = !0;
  }
  forwardEvents(t) {
    t.data !== "pong" && this.emit("message", t);
  }
  onClose() {
    this.stopPing(), !this.noReconnect && this.token ? this.toggle(this.token) : this.removeEventListeners(), this.noReconnect = !1;
  }
  async toggle(t = "") {
    var c, n;
    this.token = t;
    const e = this.upd(this.url, this.token), s = !t;
    if (this.log("Websemaphore Websockets connection is toggling", s ? "off" : "on"), !(this.url === e && t == this.token && ((c = this.socket) == null ? void 0 : c.readyState) === ((n = this.socket) == null ? void 0 : n.OPEN)))
      return this.url = e, s && await this.flush(), this.socket ? this.socket.close() : (this.socket = new this.WSImplementation(this.url), this.addEventListeners()), Promise.resolve();
  }
  send(t) {
    var e;
    if (this.log("Sending", t), !this.isConnected()) {
      this.outboundQueue.unshift(t);
      return;
    }
    typeof t != "string" && (t = JSON.stringify(t)), (e = this.socket) == null || e.send(t);
  }
  async flush() {
    const t = S(), e = this.socket;
    let s = 0;
    const c = this.outboundQueue || [];
    for (this.log("Flushing outbound queue has items:", c.length); c.length; )
      this.send(c.pop());
    const n = () => {
      if (this.log("Flushing #", s++), !this.isConnected())
        return t.resolve();
      (e == null ? void 0 : e.bufferedAmount) ? (this.log("Items in buffer #", s++), setTimeout(() => {
        n();
      }, 500)) : (this.log("ResolveWhenDone Done"), t.resolve());
    };
    return n(), t;
  }
  // Rest of your code...
}
class W {
  constructor(t) {
    if (this.logLevel = "", this.wsClient = t.wsClient, this.logLevel = t.logLevel || this.logLevel, !this.wsClient)
      throw new Error("No websockets implementation available. If using in nodejs try `npm i ws` or equivalent");
    this.cache = {
      inFlight: {},
      history: []
    }, this.wsClient.addListener("message", (e) => {
      this._processIncoming(e.data);
    });
  }
  acquire({ semaphoreId: t, channelId: e, sync: s, body: c }) {
    let n = 0;
    const p = Date.now().toString() + "-" + n++;
    this.wsClient.send({
      action: s ? "lock.acquireSync" : "lock.acquire",
      payload: JSON.stringify({
        id: p,
        body: c || "{}"
      }),
      semaphoreId: t,
      channelId: e
    });
    const u = S();
    return this.cache.inFlight[p] = {
      promise: u,
      status: "waiting",
      release: () => {
        throw new Error("Cannot call release before the lock is acquired or rejected");
      }
    }, u.then((a) => ({
      status: a.status,
      payload: a.payload,
      release: () => this.release({ semaphoreId: t, channelId: e, messageId: p })
    }));
  }
  log(...t) {
    this.logLevel && console.log("WebSemaphoreWebsocketsClient", ...t);
  }
  _processIncoming(t) {
    this.log("Got a message from WebSemaphore", t);
    const e = JSON.parse(t), s = e.event;
    if (e.type === "lock" && s == "acquired") {
      const c = this.cache.inFlight[e.payload.id];
      c.promise.resolve({
        ...c,
        status: e.event,
        payload: e.payload
      });
    }
  }
  release({ semaphoreId: t, channelId: e, messageId: s }) {
    this.wsClient.send({
      action: "lock.release",
      semaphoreId: t,
      channelId: e
    }), this.log("Releasing..."), delete this.cache.inFlight[s], this.cache.history.push(s);
  }
  client() {
    return this.wsClient;
  }
  setClient(t) {
    this.wsClient = t;
  }
  getCache() {
    return this.cache;
  }
}
const A = (o) => {
  const t = o != null && o.websockets ? o.websockets : globalThis.WebSocket, e = new N(
    (p, u) => `${p}?token=${encodeURIComponent(u)}`,
    { websockets: t, logLevel: o == null ? void 0 : o.logLevel }
  );
  let s = new W({ wsClient: e, logLevel: o == null ? void 0 : o.logLevel });
  return {
    connect: async (p) => {
      if (!p || !p.replace(/^ApiKey./, ""))
        throw new Error("Couln't connect (did you pass a token?)");
      const u = S();
      if (await e.toggle(p), !e.socket)
        throw new Error("Websocket was not created, the provided implementation might be incompatible.");
      return e.socket.addEventListener && e.socket.addEventListener("error", (a) => {
        o != null && o.logLevel && console.log("Couldn't connect, aborted...", a), u.reject(a);
      }), e.socket.addEventListener("open", (a) => {
        o != null && o.logLevel && console.log("Connected..."), u.resolve(s);
      }), u;
    },
    disconnect: () => e.toggle(),
    wsClient: e,
    client: s
  };
};
export {
  C as Api,
  P as ContentType,
  q as HttpClient,
  x as WebSemaphoreHttpClientManager,
  W as WebSemaphoreWebsocketsClient,
  A as WebSemaphoreWebsocketsClientManager,
  E as WebsemaphoreHttpClient
};
