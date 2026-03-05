(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__140a91e5._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
const normalizeUrl = (value)=>String(value || "").replace(/\/+$/, "");
const normalizeAuthAppUrl = (value)=>{
    const normalized = normalizeUrl(value);
    if (!normalized) return normalized;
    try {
        const parsed = new URL(normalized);
        if (parsed.port === "3000" || parsed.port === "8877" || parsed.port === "1001") {
            parsed.port = "1002";
            return normalizeUrl(parsed.toString());
        }
    } catch  {
        return normalized;
    }
    return normalized;
};
const AUTH_APP_BASE_URL = normalizeAuthAppUrl(("TURBOPACK compile-time value", "http://159.65.154.221:1002") || "http://159.65.154.221:1002");
const REFRESH_COOKIE_KEYS = [
    "refresh_token_property",
    "refresh_token_auto",
    "refresh_token",
    "auth_session",
    "auth_session_property",
    "csrf_token_property"
];
const hasAnyCookie = (request, names = [])=>names.some((name)=>Boolean(String(request.cookies.get(name)?.value || "").trim()));
const hasSessionCookie = (request)=>{
    const refreshToken = hasAnyCookie(request, REFRESH_COOKIE_KEYS);
    return Boolean(refreshToken);
};
function middleware(request) {
    const pathname = request.nextUrl.pathname;
    // Dashboard auth is enforced client-side via /auth/me + refresh flow.
    // Edge cookie checks are unreliable when auth cookies are scoped to /api paths.
    if (pathname.startsWith("/dashboard")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Allow requests with valid session to proceed.
    if (hasSessionCookie(request)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Avoid redirect loop - check if already coming from auth app
    const referer = request.headers.get("referer") || "";
    const isFromAuthApp = referer.includes(normalizeUrl(AUTH_APP_BASE_URL));
    // If coming from auth app and still no session, likely auth failed - let it through
    if (isFromAuthApp) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Redirect to login only once
    const loginUrl = new URL(`${AUTH_APP_BASE_URL}/auth/login`);
    loginUrl.searchParams.set("returnTo", request.nextUrl.href);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl, {
        status: 307
    });
}
const config = {
    matcher: [
        "/dashboard/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__140a91e5._.js.map