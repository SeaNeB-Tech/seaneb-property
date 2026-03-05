module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/ui/BrandLogo.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrandLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function BrandLogo({ size = 44, iconSrc = "/logos/Fav.svg", fallbackIconSrc = "/logos/Fav.png", showText = true, titleClass = "text-xl font-bold text-gray-900", subtitleClass = "text-xs font-medium text-gray-600", textWrapperClass = "", compact = false }) {
    const [src, setSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(iconSrc);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                src: src,
                alt: "SeaNeB",
                width: size,
                height: size,
                className: "object-contain shrink-0",
                onError: ()=>{
                    if (src !== fallbackIconSrc) setSrc(fallbackIconSrc);
                },
                priority: true
            }, void 0, false, {
                fileName: "[project]/src/components/ui/BrandLogo.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            showText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${compact ? "leading-tight" : ""} ${textWrapperClass}`.trim(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: titleClass,
                        children: "SeaNeB"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/BrandLogo.jsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: subtitleClass,
                        children: "Real Estate"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/BrandLogo.jsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/BrandLogo.jsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/BrandLogo.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/authAppUrl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_APP_BASE_URL",
    ()=>AUTH_APP_BASE_URL,
    "getAuthAppUrl",
    ()=>getAuthAppUrl
]);
const ENV_AUTH_APP_URL = ("TURBOPACK compile-time value", "http://159.65.154.221:1002");
const PROD_AUTH_APP_URL = "http://159.65.154.221:1002";
const normalizeUrl = (value)=>String(value || "").replace(/\/+$/, "");
const normalizeAuthPort = (value)=>{
    const normalized = normalizeUrl(value);
    if (!normalized) return normalized;
    try {
        const parsed = new URL(normalized);
        // Keep backward compatibility with old auth/listing ports.
        if (parsed.port === "3000" || parsed.port === "8877" || parsed.port === "1001") {
            parsed.port = "1002";
            return normalizeUrl(parsed.toString());
        }
    } catch  {
        return normalized;
    }
    return normalized;
};
const AUTH_APP_BASE_URL = normalizeAuthPort(ENV_AUTH_APP_URL) || PROD_AUTH_APP_URL;
const getAuthAppUrl = (path = "/")=>{
    const safePath = path.startsWith("/") ? path : `/${path}`;
    return `${AUTH_APP_BASE_URL}${safePath}`;
};
}),
"[project]/src/services/cookie.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCookie",
    ()=>getCookie,
    "getJsonCookie",
    ()=>getJsonCookie,
    "removeCookie",
    ()=>removeCookie,
    "setCookie",
    ()=>setCookie,
    "setJsonCookie",
    ()=>setJsonCookie
]);
// Simple cookie helper for storing JSON and string values
const isBrowser = ("TURBOPACK compile-time value", "undefined") !== "undefined";
const envCookiePath = process.env.NEXT_PUBLIC_COOKIE_PATH || "/";
const envCookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "";
const envSameSite = process.env.NEXT_PUBLIC_COOKIE_SAMESITE || "Lax";
const COOKIE_CHANGE_EVENT = "property:cookie-change";
const STORAGE_PREFIX = "property:volatile:";
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const isAuthCookieName = (name)=>{
    const key = String(name || "").trim().toLowerCase();
    if (!key) return false;
    return key === "csrf_token" || key === "refresh_token" || key === "access_token" || key === "auth_session" || key === "refesh_token" || key.startsWith("csrf_token_") || key.startsWith("refresh_token_") || key.startsWith("access_token_") || key.startsWith("auth_session_") || key.startsWith("refesh_token_");
};
const isEssentialCookieName = (name)=>{
    const key = String(name || "").trim().toLowerCase();
    return key === "refresh_token" || key === "refresh_token_property" || key === "refesh_token" || key === "csrf_token" || key === "csrf_token_property";
};
const isBlockedAuthCookieWrite = (name)=>{
    return isAuthCookieName(name);
};
const normalizePath = (path)=>{
    if (!path || typeof path !== "string") return "/";
    return path.startsWith("/") ? path : `/${path}`;
};
const resolveDomain = (domain)=>{
    const safeDomain = String(domain || "").trim();
    if ("TURBOPACK compile-time truthy", 1) return safeDomain;
    //TURBOPACK unreachable
    ;
    const host = undefined;
    const isLocalHost = undefined;
};
const resolveCookieOptions = (options = {})=>{
    const path = normalizePath(options.path || envCookiePath);
    const domain = resolveDomain(options.domain ?? envCookieDomain);
    const sameSite = options.sameSite ?? envSameSite;
    const secure = typeof options.secure === "boolean" ? options.secure : isBrowser && window.location.protocol === "https:";
    return {
        ...options,
        path,
        domain,
        sameSite,
        secure
    };
};
const emitCookieChange = (name)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const usesRealCookie = (name)=>isEssentialCookieName(name);
const getStorageKey = (name)=>`${STORAGE_PREFIX}${String(name || "").trim()}`;
const setVolatileValue = (name, value)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const getVolatileValue = (name)=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
};
const removeVolatileValue = (name)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const clearRealCookieOnly = (name, options = {})=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const path = undefined, domain = undefined, sameSite = undefined, secure = undefined;
    let cookie;
};
const setCookie = (name, value, options = {})=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const maxAge = undefined, path = undefined, domain = undefined, sameSite = undefined, secure = undefined;
    let cookie;
};
const getCookie = (name)=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const pairs = undefined;
    const p = undefined;
};
const removeCookie = (name, options = {})=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const key = undefined;
    const path = undefined, domain = undefined, sameSite = undefined, secure = undefined;
    let cookie;
};
const setJsonCookie = (name, obj, options = {})=>{
    try {
        setCookie(name, JSON.stringify(obj), options);
    } catch (e) {
    // ignore
    }
};
const getJsonCookie = (name)=>{
    try {
        const v = getCookie(name);
        if (!v) return null;
        return JSON.parse(v);
    } catch (e) {
        return null;
    }
};
const cookieService = {
    setCookie,
    getCookie,
    removeCookie,
    setJsonCookie,
    getJsonCookie
};
const __TURBOPACK__default__export__ = cookieService;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/apiBaseUrl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "API_REMOTE_BASE_URL",
    ()=>API_REMOTE_BASE_URL
]);
const DEV_API_URL = process.env.API_DEV_URL || process.env.NEXT_PUBLIC_API_DEV_URL || "https://dev.seaneb.com/api/v1";
const CENTRAL_API_URL = process.env.API_CENTRAL_URL || process.env.NEXT_PUBLIC_API_CENTRAL_URL || "https://central-api.seaneb.com/api/v1";
const NODE_ENV = String(("TURBOPACK compile-time value", "development") || "").trim();
const ENV_SELECTED_API_URL = NODE_ENV === "development" ? DEV_API_URL : CENTRAL_API_URL;
const RAW_API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ENV_SELECTED_API_URL;
const API_REMOTE_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");
const API_BASE_URL = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : API_REMOTE_BASE_URL;
}),
"[project]/src/lib/api/client.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearInMemoryAccessToken",
    ()=>clearInMemoryAccessToken,
    "default",
    ()=>__TURBOPACK__default__export__,
    "ensureAccessToken",
    ()=>ensureAccessToken,
    "getAuthDiagnostics",
    ()=>getAuthDiagnostics,
    "getInMemoryAccessToken",
    ()=>getInMemoryAccessToken,
    "hasCsrfCookie",
    ()=>hasCsrfCookie,
    "refreshAccessToken",
    ()=>refreshAccessToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiBaseUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiBaseUrl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authAppUrl.js [app-ssr] (ecmascript)");
;
;
;
const REFRESH_ENDPOINT = "/auth/refresh";
const DEFAULT_PRODUCT_KEY = "property";
let inMemoryAccessToken = "";
let refreshPromise = null;
let lastRefreshStatus = "idle";
let lastRefreshAt = 0;
let lastRefreshHttpStatus = 0;
let lastRefreshError = "";
const getCookie = (name)=>{
    if (typeof document === "undefined") return "";
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (const entry of cookies){
        const idx = entry.indexOf("=");
        if (idx < 0) continue;
        const key = decodeURIComponent(entry.slice(0, idx));
        const value = decodeURIComponent(entry.slice(idx + 1));
        if (key === name) return value;
    }
    return "";
};
const getCsrfToken = ()=>String(getCookie("csrf_token_property") || "").trim();
const getAccessToken = ()=>inMemoryAccessToken;
const getProductKey = ()=>(getCookie("product_key") || DEFAULT_PRODUCT_KEY).toLowerCase().trim();
const setAccessToken = (token)=>{
    inMemoryAccessToken = String(token || "").trim();
};
const redirectToLogin = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const returnTo = undefined;
};
const readToken = (res)=>{
    const data = res?.data || {};
    return data?.access_token || data?.accessToken || data?.data?.access_token || data?.data?.accessToken || data?.data?.token?.access_token || data?.data?.token?.accessToken || data?.result?.access_token || data?.result?.accessToken || data?.token || data?.jwt || "";
};
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiBaseUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"],
    withCredentials: true
});
const refreshClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiBaseUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"],
    withCredentials: true
});
const performRefreshAccessToken = async ()=>{
    const productKey = getProductKey();
    const csrf = getCsrfToken();
    if (!csrf) {
        lastRefreshStatus = "failed";
        lastRefreshAt = Date.now();
        lastRefreshHttpStatus = 0;
        lastRefreshError = "Missing csrf_token_property cookie";
        throw new Error("Missing csrf_token_property cookie");
    }
    let lastError = null;
    const headers = {
        "x-product-key": productKey,
        "x-csrf-token": csrf
    };
    try {
        lastRefreshStatus = "pending";
        lastRefreshAt = Date.now();
        lastRefreshHttpStatus = 0;
        lastRefreshError = "";
        const res = await refreshClient.post(REFRESH_ENDPOINT, {
            product_key: productKey
        }, {
            headers
        });
        const token = readToken(res);
        if (!token) throw new Error("No access token from refresh");
        setAccessToken(token);
        lastRefreshStatus = "success";
        lastRefreshAt = Date.now();
        lastRefreshHttpStatus = Number(res?.status || 0);
        lastRefreshError = "";
        return true;
    } catch (err) {
        lastError = err;
        lastRefreshStatus = "failed";
        lastRefreshAt = Date.now();
        lastRefreshHttpStatus = Number(err?.response?.status || 0);
        lastRefreshError = String(err?.response?.data?.error?.message || err?.response?.data?.message || err?.message || "Refresh failed");
    }
    throw lastError || new Error("Refresh failed");
};
const ensureAccessToken = async ()=>{
    return Boolean(getAccessToken());
};
const hasCsrfCookie = ()=>Boolean(getCsrfToken());
const refreshAccessToken = async ()=>{
    if (!hasCsrfCookie()) {
        lastRefreshStatus = "failed";
        lastRefreshAt = Date.now();
        lastRefreshHttpStatus = 0;
        lastRefreshError = "Missing csrf_token_property cookie";
        throw new Error("Missing csrf_token_property cookie");
    }
    if (!refreshPromise) {
        refreshPromise = performRefreshAccessToken().finally(()=>{
            refreshPromise = null;
        });
    }
    await refreshPromise;
    return true;
};
api.interceptors.request.use((config)=>{
    config.withCredentials = true;
    config.headers = config.headers || {};
    const csrf = getCsrfToken();
    const token = getAccessToken();
    const productKey = getProductKey();
    if (csrf) config.headers["x-csrf-token"] = csrf;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers["x-product-key"] = productKey;
    return config;
});
api.interceptors.response.use((res)=>res, async (error)=>{
    const original = error?.config || {};
    const status = error?.response?.status;
    const isRefreshRequest = String(original?.url || "").includes(REFRESH_ENDPOINT);
    if (status !== 401 || original._retry || isRefreshRequest) {
        return Promise.reject(error);
    }
    original._retry = true;
    try {
        await refreshAccessToken();
        return api(original);
    } catch  {
        setAccessToken("");
        const shouldRedirect = original?.requireAuth === true && original?.skipAuthRedirect !== true;
        if (shouldRedirect) {
            redirectToLogin();
        }
        return Promise.reject(error);
    }
});
const __TURBOPACK__default__export__ = api;
const getInMemoryAccessToken = ()=>getAccessToken();
const clearInMemoryAccessToken = ()=>setAccessToken("");
const getAuthDiagnostics = ()=>({
        hasAccessTokenInMemory: Boolean(getAccessToken()),
        hasCsrfCookie: Boolean(getCsrfToken()),
        refreshInFlight: Boolean(refreshPromise),
        lastRefreshStatus,
        lastRefreshAt,
        lastRefreshHttpStatus,
        lastRefreshError
    });
}),
"[project]/src/services/api.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.js [app-ssr] (ecmascript)");
;
}),
"[project]/src/services/authSession.service.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAuthenticatedSession",
    ()=>checkAuthenticatedSession,
    "clearAuthSessionCookies",
    ()=>clearAuthSessionCookies,
    "logoutAndClearAuthSession",
    ()=>logoutAndClearAuthSession,
    "notifyAuthChanged",
    ()=>notifyAuthChanged,
    "subscribeAuthState",
    ()=>subscribeAuthState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cookie.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.js [app-ssr] (ecmascript)");
;
;
;
;
const AUTH_CHANGE_EVENT = "seaneb:auth-changed";
const COOKIE_CHANGE_EVENT = "property:cookie-change";
const UNAUTHORIZED_COOLDOWN_MS = 10_000;
let authCheckPromise = null;
let lastUnauthorizedAt = 0;
const verifyProfileSession = async ()=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasCsrfCookie"])()) return false;
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/profile/me", {
        withCredentials: true,
        skipAuthRedirect: true,
        requireAuth: false,
        skipRefresh: true
    });
    return Number(res?.status || 0) === 200;
};
const checkAuthenticatedSession = async ({ strict = false } = {})=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasCsrfCookie"])()) return false;
    // Public pages should avoid repeated network bursts after recent unauthorized response.
    if (!strict && Date.now() - lastUnauthorizedAt < UNAUTHORIZED_COOLDOWN_MS) return false;
    if (authCheckPromise) return authCheckPromise;
    authCheckPromise = (async ()=>{
        try {
            // If token exists in memory, verify session first.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInMemoryAccessToken"])()) {
                const ok = await verifyProfileSession();
                if (ok) return true;
            }
            // Strict flow for protected routes: refresh only when csrf cookie exists.
            if (strict) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refreshAccessToken"])();
                return await verifyProfileSession();
            }
            return await verifyProfileSession();
        } catch (err) {
            const status = Number(err?.response?.status || 0);
            // Refresh is only attempted after explicit unauthorized (401).
            if (status === 401 && strict) {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refreshAccessToken"])();
                    return await verifyProfileSession();
                } catch  {
                // Fall through to unauthorized handling below.
                }
            }
            if (status === 401 || status === 403) {
                lastUnauthorizedAt = Date.now();
            }
            return false;
        }
    })().finally(()=>{
        authCheckPromise = null;
    });
    return authCheckPromise;
};
const clearAuthSessionCookies = ()=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearInMemoryAccessToken"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeCookie"])("csrf_token_property");
    notifyAuthChanged();
};
const logoutAndClearAuthSession = async ()=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/logout", {}, {
            withCredentials: true,
            skipAuthRedirect: true
        });
    } catch  {
    // Always clear local auth state even when server logout fails.
    } finally{
        clearAuthSessionCookies();
    }
};
const notifyAuthChanged = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const subscribeAuthState = (callback)=>{
    if ("TURBOPACK compile-time truthy", 1) return ()=>{};
    //TURBOPACK unreachable
    ;
    const listener = undefined;
};
}),
"[project]/src/hooks/useAuthState.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthState",
    ()=>useAuthState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authSession.service.js [app-ssr] (ecmascript)");
"use client";
;
;
function useAuthState() {
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        const setAuthState = (nextValue)=>{
            if (isMounted) setIsAuthenticated(nextValue);
        };
        const syncAuthState = async ()=>{
            try {
                const authenticated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkAuthenticatedSession"])();
                setAuthState(Boolean(authenticated));
            } catch  {
                setAuthState(false);
            }
        };
        void syncAuthState();
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeAuthState"])(()=>{
            void syncAuthState();
        });
        return ()=>{
            isMounted = false;
            unsubscribe();
        };
    }, []);
    return isAuthenticated;
}
}),
"[project]/src/components/ui/GlobalFooter.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BrandLogo$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BrandLogo.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authAppUrl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuthState.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const loginUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthAppUrl"])("/auth/login");
const footerGroups = [
    {
        title: "Platform",
        links: [
            {
                label: "Home",
                href: "/home"
            },
            {
                label: "Browse India",
                href: "/in"
            },
            {
                label: "Login",
                href: loginUrl
            },
            {
                label: "Dashboard",
                href: "/dashboard"
            }
        ]
    },
    {
        title: "Company",
        links: [
            {
                label: "About SeaNeB",
                href: "/about"
            },
            {
                label: "Solution",
                href: "/solution"
            },
            {
                label: "Partner With Us",
                href: "/partner"
            },
            {
                label: "Blogs",
                href: "/blogs"
            },
            {
                label: "Careers",
                href: "#"
            }
        ]
    },
    {
        title: "Support",
        links: [
            {
                label: "Help Center",
                href: "/dashboard/help"
            },
            {
                label: "Contact",
                href: "/contact"
            },
            {
                label: "Privacy Policy",
                href: "#"
            },
            {
                label: "Terms & Conditions",
                href: "#"
            }
        ]
    }
];
const socialLinks = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13.5 8.25V6.9c0-.54.36-.9.9-.9H16V3h-2.1C11.67 3 10.5 4.17 10.5 6.39v1.86H8.25v3h2.25V21h3v-9.75H16.2l.45-3h-3.15z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 48,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/GlobalFooter.jsx",
            lineNumber: 47,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "X",
        href: "https://x.com/",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.9 3h2.84l-6.21 7.1L22.8 21h-5.7l-4.47-5.85L7.5 21H4.65l6.64-7.59L4.2 3h5.84l4.03 5.32L18.9 3zm-1 16.3h1.58L9.18 4.62H7.5L17.9 19.3z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 57,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/GlobalFooter.jsx",
            lineNumber: 56,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.94 8.5H4v11h2.94v-11zM5.47 3.75a1.71 1.71 0 1 0 0 3.42 1.71 1.71 0 0 0 0-3.42zM20 13.21c0-3.02-1.61-4.43-3.76-4.43-1.73 0-2.5.95-2.93 1.62V8.5h-2.94v11h2.94v-6.14c0-1.62.31-3.19 2.32-3.19 1.98 0 2.01 1.85 2.01 3.29v6.04H20v-6.29z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 66,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/GlobalFooter.jsx",
            lineNumber: 65,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21.58 7.19a2.96 2.96 0 0 0-2.08-2.09C17.66 4.5 12 4.5 12 4.5s-5.66 0-7.5.6A2.96 2.96 0 0 0 2.42 7.2 31.1 31.1 0 0 0 2 12a31.1 31.1 0 0 0 .42 4.81 2.96 2.96 0 0 0 2.08 2.09c1.84.6 7.5.6 7.5.6s5.66 0 7.5-.6a2.96 2.96 0 0 0 2.08-2.09A31.1 31.1 0 0 0 22 12a31.1 31.1 0 0 0-.42-4.81zM10 15.5v-7l6 3.5-6 3.5z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 75,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/GlobalFooter.jsx",
            lineNumber: 74,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm4.75-3a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 84,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/GlobalFooter.jsx",
            lineNumber: 83,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Pinterest",
        href: "https://www.pinterest.com/",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2a10 10 0 0 0-3.64 19.32c-.05-.82-.09-2.08.02-2.98.1-.77.66-4.93.66-4.93s-.17-.35-.17-.87c0-.82.48-1.44 1.07-1.44.5 0 .75.38.75.83 0 .5-.32 1.25-.49 1.95-.14.58.29 1.06.86 1.06 1.03 0 1.82-1.08 1.82-2.64 0-1.38-.99-2.34-2.4-2.34-1.64 0-2.61 1.23-2.61 2.5 0 .5.19 1.03.43 1.32a.17.17 0 0 1 .04.16c-.04.18-.14.58-.16.66-.03.11-.09.14-.21.09-.78-.36-1.27-1.5-1.27-2.42 0-1.97 1.43-3.79 4.12-3.79 2.17 0 3.86 1.55 3.86 3.62 0 2.16-1.36 3.9-3.24 3.9-.63 0-1.23-.33-1.43-.73l-.39 1.48c-.14.54-.52 1.22-.78 1.64A10 10 0 1 0 12 2z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 93,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/GlobalFooter.jsx",
            lineNumber: 92,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }
];
function GlobalFooter() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isDashboardRoute = pathname?.startsWith("/dashboard");
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthState"])();
    if (isDashboardRoute) return null;
    const visibleFooterGroups = footerGroups.map((group)=>({
            ...group,
            links: group.links.filter((link)=>{
                if (!link.href.startsWith("/dashboard")) return true;
                return isAuthenticated;
            })
        }));
    const footerTextLinkClass = "relative text-sm text-slate-300 transition-colors hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--error)] after:transition-[width] after:duration-300 after:content-[''] hover:after:w-full";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-slate-200 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BrandLogo$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                size: 42,
                                titleClass: "text-lg font-bold text-white",
                                subtitleClass: "text-xs font-medium text-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-md text-sm leading-relaxed text-slate-300",
                                children: "SeaNeB helps buyers, renters, and brokers discover verified residential and commercial properties with a smoother search experience."
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex gap-2",
                                children: socialLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: item.href,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        "aria-label": item.label,
                                        className: "inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-200 transition-colors hover:border-slate-300 hover:text-white",
                                        children: item.icon
                                    }, item.label, false, {
                                        fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7",
                        children: visibleFooterGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "mb-3 text-sm font-semibold uppercase tracking-wide text-white",
                                        children: group.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2.5",
                                        children: group.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: link.href.startsWith("http") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: link.href,
                                                    className: footerTextLinkClass,
                                                    children: link.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                                    lineNumber: 151,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: link.href,
                                                    className: footerTextLinkClass,
                                                    children: link.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                                    lineNumber: 158,
                                                    columnNumber: 23
                                                }, this)
                                            }, link.label, false, {
                                                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, group.title, true, {
                                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400 sm:px-6 lg:px-8",
                children: [
                    "Copyright ",
                    new Date().getFullYear(),
                    " SeaNeB. All rights reserved."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                lineNumber: 170,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/GlobalFooter.jsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__472b0595._.js.map