(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/BrandLogo.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrandLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function BrandLogo({ size = 44, iconSrc = "/logos/Fav.svg", fallbackIconSrc = "/logos/Fav.png", showText = true, titleClass = "text-xl font-bold text-gray-900", subtitleClass = "text-xs font-medium text-gray-600", textWrapperClass = "", compact = false }) {
    _s();
    const [src, setSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(iconSrc);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            showText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${compact ? "leading-tight" : ""} ${textWrapperClass}`.trim(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: titleClass,
                        children: "SeaNeB"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/BrandLogo.jsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(BrandLogo, "bwssg3hPt5U0nt8OZWS6uWAdrmE=");
_c = BrandLogo;
var _c;
__turbopack_context__.k.register(_c, "BrandLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/authAppUrl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_APP_BASE_URL",
    ()=>AUTH_APP_BASE_URL,
    "getAuthAppUrl",
    ()=>getAuthAppUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/cookie.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Simple cookie helper for storing JSON and string values
const isBrowser = ("TURBOPACK compile-time value", "object") !== "undefined";
const envCookiePath = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_COOKIE_PATH || "/";
const envCookieDomain = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_COOKIE_DOMAIN || "";
const envSameSite = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_COOKIE_SAMESITE || "Lax";
const COOKIE_CHANGE_EVENT = "property:cookie-change";
const STORAGE_PREFIX = "property:volatile:";
if ("TURBOPACK compile-time truthy", 1) {
    try {
        const removeIfExists = (storage, key)=>{
            try {
                storage.removeItem(key);
            } catch  {
            // ignore storage errors
            }
        };
        const authKeys = [
            "access_token",
            "refresh_token",
            "refresh_token_property",
            "csrf_token",
            "csrf_token_property",
            "auth_session"
        ];
        for (const key of authKeys){
            removeIfExists(window.sessionStorage, key);
            removeIfExists(window.localStorage, key);
            removeIfExists(window.sessionStorage, `${STORAGE_PREFIX}${key}`);
            removeIfExists(window.localStorage, `${STORAGE_PREFIX}${key}`);
        }
        const keys = [];
        for(let i = 0; i < window.sessionStorage.length; i += 1){
            const key = window.sessionStorage.key(i);
            if (String(key || "").startsWith(STORAGE_PREFIX)) {
                keys.push(String(key));
            }
        }
        for (const key of keys){
            const suffix = key.slice(STORAGE_PREFIX.length).toLowerCase();
            if (suffix === "access_token" || suffix === "refresh_token" || suffix === "refresh_token_property" || suffix === "csrf_token" || suffix === "csrf_token_property" || suffix.startsWith("access_token_") || suffix.startsWith("refresh_token_") || suffix.startsWith("csrf_token_")) {
                removeIfExists(window.sessionStorage, key);
            }
        }
    } catch  {
    // ignore storage read/write errors
    }
}
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
    if (!safeDomain || !isBrowser) return safeDomain;
    const host = String(window.location.hostname || "").toLowerCase();
    const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "::1" || host.endsWith(".localhost");
    // Domain cookies on localhost often break auth sharing in local multi-port setup.
    if (isLocalHost) return "";
    return safeDomain;
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.dispatchEvent(new CustomEvent(COOKIE_CHANGE_EVENT, {
            detail: {
                name
            }
        }));
    } catch  {
    // Ignore event dispatch issues in older environments.
    }
};
const usesRealCookie = (name)=>isEssentialCookieName(name);
const getStorageKey = (name)=>`${STORAGE_PREFIX}${String(name || "").trim()}`;
const setVolatileValue = (name, value)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.setItem(getStorageKey(name), String(value ?? ""));
    } catch  {
    // ignore storage errors
    }
};
const getVolatileValue = (name)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const value = window.sessionStorage.getItem(getStorageKey(name));
        return value == null ? null : value;
    } catch  {
        return null;
    }
};
const removeVolatileValue = (name)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(getStorageKey(name));
    } catch  {
    // ignore storage errors
    }
};
const clearRealCookieOnly = (name, options = {})=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { path, domain, sameSite, secure } = resolveCookieOptions(options);
    let cookie = `${encodeURIComponent(name)}=; path=${path}; max-age=0`;
    if (domain) cookie += `; domain=${domain}`;
    if (sameSite) cookie += `; SameSite=${sameSite}`;
    if (secure) cookie += "; Secure";
    document.cookie = cookie;
};
const setCookie = (name, value, options = {})=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (isBlockedAuthCookieWrite(name)) {
        // Auth cookies are backend-managed. Frontend must not write or cache them.
        return;
    }
    if (!usesRealCookie(name)) {
        setVolatileValue(name, value);
        clearRealCookieOnly(name, options);
        emitCookieChange(name);
        return;
    }
    removeVolatileValue(name);
    const { maxAge, path, domain, sameSite, secure } = resolveCookieOptions(options);
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`;
    if (typeof maxAge === "number") cookie += `; max-age=${maxAge}`;
    if (domain) cookie += `; domain=${domain}`;
    if (sameSite) cookie += `; SameSite=${sameSite}`;
    if (secure) cookie += "; Secure";
    document.cookie = cookie;
    emitCookieChange(name);
};
const getCookie = (name)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!usesRealCookie(name)) {
        const fromStorage = getVolatileValue(name);
        if (fromStorage != null) return fromStorage;
    }
    const pairs = document.cookie.split("; ");
    for (const p of pairs){
        if (!p) continue;
        // FIX: Split only on the FIRST "=" to handle values that contain "="
        const eqIndex = p.indexOf("=");
        if (eqIndex < 0) continue;
        const k = p.substring(0, eqIndex);
        const v = p.substring(eqIndex + 1);
        if (decodeURIComponent(k) === name) {
            const decoded = decodeURIComponent(v || "");
            if (!usesRealCookie(name)) {
                setVolatileValue(name, decoded);
                clearRealCookieOnly(name);
            }
            return decoded;
        }
    }
    return null;
};
const removeCookie = (name, options = {})=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const key = String(name || "").trim().toLowerCase();
    if (isAuthCookieName(name) && key !== "csrf_token_property") return;
    removeVolatileValue(name);
    const { path, domain, sameSite, secure } = resolveCookieOptions(options);
    let cookie = `${encodeURIComponent(name)}=; path=${path}; max-age=0`;
    if (domain) cookie += `; domain=${domain}`;
    if (sameSite) cookie += `; SameSite=${sameSite}`;
    if (secure) cookie += "; Secure";
    document.cookie = cookie;
    emitCookieChange(name);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/apiBaseUrl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "API_REMOTE_BASE_URL",
    ()=>API_REMOTE_BASE_URL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEV_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_DEV_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_DEV_URL || "https://dev.seaneb.com/api/v1";
const CENTRAL_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_CENTRAL_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_CENTRAL_URL || "https://central-api.seaneb.com/api/v1";
const NODE_ENV = String(("TURBOPACK compile-time value", "development") || "").trim();
const ENV_SELECTED_API_URL = NODE_ENV === "development" ? DEV_API_URL : CENTRAL_API_URL;
const RAW_API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_BASE_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL || ENV_SELECTED_API_URL;
const API_REMOTE_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");
const API_BASE_URL = ("TURBOPACK compile-time truthy", 1) ? "/api" : "TURBOPACK unreachable";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiBaseUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiBaseUrl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authAppUrl.js [app-client] (ecmascript)");
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const returnTo = encodeURIComponent(window.location.href);
    window.location.href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthAppUrl"])(`/auth/login?returnTo=${returnTo}`);
};
const readToken = (res)=>{
    const data = res?.data || {};
    return data?.access_token || data?.accessToken || data?.data?.access_token || data?.data?.accessToken || data?.data?.token?.access_token || data?.data?.token?.accessToken || data?.result?.access_token || data?.result?.accessToken || data?.token || data?.jwt || "";
};
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiBaseUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"],
    withCredentials: true
});
const refreshClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiBaseUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"],
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/api.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.js [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/authSession.service.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cookie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.js [app-client] (ecmascript)");
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
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasCsrfCookie"])()) return false;
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/profile/me", {
        withCredentials: true,
        skipAuthRedirect: true,
        requireAuth: false,
        skipRefresh: true
    });
    return Number(res?.status || 0) === 200;
};
const checkAuthenticatedSession = async ({ strict = false } = {})=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasCsrfCookie"])()) return false;
    // Public pages should avoid repeated network bursts after recent unauthorized response.
    if (!strict && Date.now() - lastUnauthorizedAt < UNAUTHORIZED_COOLDOWN_MS) return false;
    if (authCheckPromise) return authCheckPromise;
    authCheckPromise = (async ()=>{
        try {
            // If token exists in memory, verify session first.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInMemoryAccessToken"])()) {
                const ok = await verifyProfileSession();
                if (ok) return true;
            }
            // Strict flow for protected routes: refresh only when csrf cookie exists.
            if (strict) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshAccessToken"])();
                return await verifyProfileSession();
            }
            return await verifyProfileSession();
        } catch (err) {
            const status = Number(err?.response?.status || 0);
            // Refresh is only attempted after explicit unauthorized (401).
            if (status === 401 && strict) {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshAccessToken"])();
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearInMemoryAccessToken"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeCookie"])("csrf_token_property");
    notifyAuthChanged();
};
const logoutAndClearAuthSession = async ()=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/auth/logout", {}, {
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    } catch  {
    // Ignore event dispatch issues.
    }
};
const subscribeAuthState = (callback)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const listener = ()=>callback();
    window.addEventListener("focus", listener);
    window.addEventListener(COOKIE_CHANGE_EVENT, listener);
    window.addEventListener(AUTH_CHANGE_EVENT, listener);
    return ()=>{
        window.removeEventListener("focus", listener);
        window.removeEventListener(COOKIE_CHANGE_EVENT, listener);
        window.removeEventListener(AUTH_CHANGE_EVENT, listener);
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAuthState.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthState",
    ()=>useAuthState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authSession.service.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useAuthState() {
    _s();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuthState.useEffect": ()=>{
            let isMounted = true;
            const setAuthState = {
                "useAuthState.useEffect.setAuthState": (nextValue)=>{
                    if (isMounted) setIsAuthenticated(nextValue);
                }
            }["useAuthState.useEffect.setAuthState"];
            const syncAuthState = {
                "useAuthState.useEffect.syncAuthState": async ()=>{
                    try {
                        const authenticated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkAuthenticatedSession"])();
                        setAuthState(Boolean(authenticated));
                    } catch  {
                        setAuthState(false);
                    }
                }
            }["useAuthState.useEffect.syncAuthState"];
            void syncAuthState();
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeAuthState"])({
                "useAuthState.useEffect.unsubscribe": ()=>{
                    void syncAuthState();
                }
            }["useAuthState.useEffect.unsubscribe"]);
            return ({
                "useAuthState.useEffect": ()=>{
                    isMounted = false;
                    unsubscribe();
                }
            })["useAuthState.useEffect"];
        }
    }["useAuthState.useEffect"], []);
    return isAuthenticated;
}
_s(useAuthState, "JkS3Meyzlj18m4l86SBr9YDqEkQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/GlobalFooter.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BrandLogo$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BrandLogo.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authAppUrl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuthState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuthState.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const loginUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthAppUrl"])("/auth/login");
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: "h-4 w-4 fill-current",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isDashboardRoute = pathname?.startsWith("/dashboard");
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuthState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthState"])();
    if (isDashboardRoute) return null;
    const visibleFooterGroups = footerGroups.map((group)=>({
            ...group,
            links: group.links.filter((link)=>{
                if (!link.href.startsWith("/dashboard")) return true;
                return isAuthenticated;
            })
        }));
    const footerTextLinkClass = "relative text-sm text-slate-300 transition-colors hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--error)] after:transition-[width] after:duration-300 after:content-[''] hover:after:w-full";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-slate-200 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BrandLogo$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: 42,
                                titleClass: "text-lg font-bold text-white",
                                subtitleClass: "text-xs font-medium text-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-md text-sm leading-relaxed text-slate-300",
                                children: "SeaNeB helps buyers, renters, and brokers discover verified residential and commercial properties with a smoother search experience."
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex gap-2",
                                children: socialLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7",
                        children: visibleFooterGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "mb-3 text-sm font-semibold uppercase tracking-wide text-white",
                                        children: group.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2.5",
                                        children: group.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: link.href.startsWith("http") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: link.href,
                                                    className: footerTextLinkClass,
                                                    children: link.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/GlobalFooter.jsx",
                                                    lineNumber: 151,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(GlobalFooter, "LceMrDLBTlTAuTZ7B7JSHF+wYIM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuthState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthState"]
    ];
});
_c = GlobalFooter;
var _c;
__turbopack_context__.k.register(_c, "GlobalFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_9d39bd0b._.js.map