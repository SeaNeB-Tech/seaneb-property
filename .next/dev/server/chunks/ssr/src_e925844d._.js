module.exports = [
"[project]/src/components/ui/TempUserAvatar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TempUserAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
};
function TempUserAvatar({ size = "md", className = "" }) {
    const sizeClass = sizeMap[size] || sizeMap.md;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `relative inline-flex ${sizeClass} items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 shadow-[0_8px_20px_var(--shadow-avatar-glow)] ${className}`,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            className: "h-[68%] w-[68%] text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "12",
                    cy: "8.5",
                    r: "3.2",
                    fill: "currentColor"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/TempUserAvatar.jsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M5.5 18.5C6.2 15.7 8.7 14 12 14s5.8 1.7 6.5 4.5",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/TempUserAvatar.jsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/TempUserAvatar.jsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/TempUserAvatar.jsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/data/navbarLinks.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"name":"Home","href":"/home"},{"name":"About","href":"/about"},{"name":"Solution","href":"/solution"},{"name":"Blogs","href":"/blogs"},{"name":"Partner","href":"/partner"},{"name":"Contact","href":"/contact"}]);}),
"[project]/src/components/ui/MainNavbar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainNavbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BrandLogo$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BrandLogo.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TempUserAvatar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/TempUserAvatar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$navbarLinks$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data/navbarLinks.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cookie.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authAppUrl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authSession.service.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuthState.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
function isPathActive(pathname, href) {
    if (!href || href.startsWith("#") || href.startsWith("http")) return false;
    if (href === "/home") return pathname === "/" || pathname === "/home";
    return pathname === href || pathname.startsWith(`${href}/`);
}
function NavbarItem({ item, isActive, onNavigate }) {
    const isExternal = item.href.startsWith("http");
    const isAnchor = item.href.startsWith("#");
    const useAnchorTag = isExternal || item.download || isAnchor;
    const baseClass = "relative px-3 py-1.5 text-base font-medium transition duration-200";
    const activeClass = isActive ? "text-white after:absolute after:bottom-[-7px] after:left-1/2 after:h-[2px] after:w-10 after:-translate-x-1/2 after:rounded-full after:bg-amber-300 after:content-['']" : "text-slate-300 hover:text-white after:absolute after:bottom-[-7px] after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-amber-300 after:transition-all after:duration-200 after:content-[''] hover:after:w-8";
    if (useAnchorTag) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: item.href,
            download: item.download ? true : undefined,
            target: isExternal ? "_blank" : undefined,
            rel: isExternal ? "noopener noreferrer" : undefined,
            className: `${baseClass} ${activeClass}`,
            onClick: onNavigate,
            children: item.name
        }, void 0, false, {
            fileName: "[project]/src/components/ui/MainNavbar.jsx",
            lineNumber: 32,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: item.href,
        className: `${baseClass} ${activeClass}`,
        onClick: onNavigate,
        children: item.name
    }, void 0, false, {
        fileName: "[project]/src/components/ui/MainNavbar.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
function MainNavbar() {
    const [isProfileOpen, setIsProfileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isHomeRoute = pathname === "/" || pathname === "/home";
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthState"])();
    const userEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCookie"])("verified_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCookie"])("user_email") || "";
    const userLabel = userEmail || "Guest User";
    const dashboardUrl = "/dashboard";
    const loginUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authAppUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthAppUrl"])("/auth/login");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMobileMenuOpen(false);
    }, [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onClickOutside = (event)=>{
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return ()=>document.removeEventListener("mousedown", onClickOutside);
    }, []);
    const handleLogout = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authSession$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutAndClearAuthSession"])();
        } finally{
            setIsProfileOpen(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `top-0 z-50 border-b border-white/20 backdrop-blur-xl ${isHomeRoute ? "absolute left-0 right-0 bg-transparent" : "sticky bg-[#2a2419]/92"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/home",
                                className: `rounded-xl px-2 py-1 transition ${isHomeRoute ? "hover:bg-white/10" : "hover:bg-white/10"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BrandLogo$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    size: 48,
                                    titleClass: "text-white text-lg font-bold",
                                    subtitleClass: "text-amber-200/70 text-xs",
                                    textWrapperClass: "block",
                                    compact: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-200/20 px-3 py-1 text-xs font-semibold text-amber-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-1.5 w-1.5 rounded-full bg-amber-300"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        "India"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-2 lg:flex",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$navbarLinks$2e$json__$28$json$29$__["default"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavbarItem, {
                                item: item,
                                isActive: isPathActive(pathname, item.href)
                            }, `${item.name}-${item.href}`, false, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center gap-3",
                        ref: dropdownRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "#download",
                                className: "hidden rounded-full border border-amber-300/70 bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 sm:inline-block",
                                children: "Get the App"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setIsProfileOpen((open)=>!open),
                                className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2 py-1 text-white transition hover:border-white/35 hover:bg-white/10",
                                "aria-label": "Profile menu",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TempUserAvatar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        size: "sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden pr-1 text-xs font-semibold sm:inline",
                                        children: isAuthenticated ? "Account" : "Sign In"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            isProfileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-14 z-50 w-[min(92vw,21rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_22px_50px_rgba(2,6,23,0.25)]",
                                children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-r from-sky-50 to-indigo-50 px-5 py-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TempUserAvatar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        size: "lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                        lineNumber: 152,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "truncate text-base font-bold text-slate-900",
                                                                children: userLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                                lineNumber: 154,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "truncate text-xs text-slate-500",
                                                                children: userEmail || "Signed in user"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                                lineNumber: 155,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                        lineNumber: 153,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                lineNumber: 151,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: dashboardUrl,
                                                    onClick: ()=>setIsProfileOpen(false),
                                                    className: "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "My Account"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                            lineNumber: 165,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400",
                                                            children: "\u203A"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                            lineNumber: 166,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                    lineNumber: 160,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleLogout,
                                                    className: "mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Sign Out"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                            lineNumber: 173,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-rose-300",
                                                            children: "\u203A"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                            lineNumber: 174,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "px-3 pb-1 pt-2 text-[11px] font-medium text-slate-400",
                                                    children: "Temporary profile logo enabled"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                    lineNumber: 176,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                            lineNumber: 159,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 rounded-xl bg-slate-50 p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TempUserAvatar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    size: "lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                    lineNumber: 182,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-bold text-slate-900",
                                                            children: "Welcome to SeaNeB"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                            lineNumber: 184,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-500",
                                                            children: "Access your account to continue"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                            lineNumber: 185,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                                    lineNumber: 183,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                            lineNumber: 181,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: loginUrl,
                                            onClick: ()=>setIsProfileOpen(false),
                                            className: "mt-3 block rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800",
                                            children: "Sign In"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-center text-[11px] text-slate-400",
                                            children: "Temporary person logo is shown until user photo is added"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                    lineNumber: 180,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setIsMobileMenuOpen((open)=>!open),
                                className: "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition hover:bg-white/10 lg:hidden",
                                "aria-label": "Toggle menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg leading-none",
                                    children: isMobileMenuOpen ? "\u2715" : "\u2261"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/15 bg-slate-950/95 px-4 py-3 sm:px-6 lg:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "grid grid-cols-2 gap-2",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$navbarLinks$2e$json__$28$json$29$__["default"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavbarItem, {
                                item: item,
                                isActive: isPathActive(pathname, item.href),
                                onNavigate: ()=>setIsMobileMenuOpen(false)
                            }, `mobile-${item.name}-${item.href}`, false, {
                                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                                lineNumber: 218,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "#download",
                        onClick: ()=>setIsMobileMenuOpen(false),
                        className: "mt-3 block rounded-xl bg-amber-300 px-4 py-2 text-center text-sm font-semibold text-slate-950",
                        children: "Get the App"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/MainNavbar.jsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/MainNavbar.jsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/MainNavbar.jsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/services/product.service.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultProductKey",
    ()=>getDefaultProductKey,
    "getDefaultProductName",
    ()=>getDefaultProductName,
    "getProducts",
    ()=>getProducts,
    "setDefaultProductKey",
    ()=>setDefaultProductKey
]);
// product.service.js
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cookie.js [app-ssr] (ecmascript)");
;
;
// Single allowed product across app.
const PRODUCT_KEY = "property";
const PRODUCT_NAME = "property";
let inMemoryProductKey = PRODUCT_KEY;
const normalizeKey = (key)=>String(key || "").trim().toLowerCase();
const isAllowedKey = (key)=>normalizeKey(key) === PRODUCT_KEY;
const selectSingleProperty = (items = [])=>{
    const list = Array.isArray(items) ? items : [];
    const property = list.find((item)=>normalizeKey(item?.product_key) === PRODUCT_KEY);
    if (property) {
        return [
            {
                ...property,
                product_key: PRODUCT_KEY,
                product_name: PRODUCT_NAME
            }
        ];
    }
    return [
        {
            product_key: PRODUCT_KEY,
            product_name: PRODUCT_NAME
        }
    ];
};
const getStoredProductKey = ()=>isAllowedKey(inMemoryProductKey) ? inMemoryProductKey : "";
const setDefaultProductKey = ()=>{
    inMemoryProductKey = PRODUCT_KEY;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeCookie"])("product_key");
};
const getDefaultProductKey = ()=>{
    const key = getStoredProductKey() || PRODUCT_KEY;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    setDefaultProductKey();
    return key;
};
const getDefaultProductName = ()=>PRODUCT_NAME;
const createDefaultProduct = async ()=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/products", {
            product_key: PRODUCT_KEY,
            product_name: PRODUCT_NAME
        });
        return true;
    } catch (err) {
        if (err?.response?.status === 409) return true;
        return false;
    }
};
const getProducts = async ()=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/products", {
            params: {
                product_key: PRODUCT_KEY
            }
        });
        let data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        data = data.filter((item)=>normalizeKey(item?.product_key) === PRODUCT_KEY);
        if (data.length === 0) {
            const created = await createDefaultProduct();
            if (created) {
                const refetch = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/products", {
                    params: {
                        product_key: PRODUCT_KEY
                    }
                });
                data = Array.isArray(refetch.data) ? refetch.data : refetch.data?.data ?? [];
                data = data.filter((item)=>normalizeKey(item?.product_key) === PRODUCT_KEY);
            }
        }
        const finalData = selectSingleProperty(data);
        setDefaultProductKey();
        return finalData;
    } catch (err) {
        return selectSingleProperty([]);
    }
};
}),
"[project]/src/services/location.service.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAreas",
    ()=>getAreas,
    "getBusinessDetailsBySeanebId",
    ()=>getBusinessDetailsBySeanebId,
    "getBusinessesByArea",
    ()=>getBusinessesByArea,
    "getCities",
    ()=>getCities,
    "getCountries",
    ()=>getCountries,
    "getStates",
    ()=>getStates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$product$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/product.service.js [app-ssr] (ecmascript)");
;
;
const CACHE_TTL_MS = 5 * 60 * 1000;
const locationApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
const memoryCache = new Map();
const inflightRequests = new Map();
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const toText = (value)=>String(value || "").trim();
const toSlug = (value)=>toText(value).toLowerCase().replace(/\s+/g, "-");
const toTitle = (value)=>toText(value).replace(/[-_]/g, " ").replace(/\b\w/g, (char)=>char.toUpperCase());
const unique = (list)=>Array.from(new Set(list.filter(Boolean)));
const canUseSessionStorage = ()=>false;
const toCacheRecord = (data)=>({
        data,
        expiresAt: Date.now() + CACHE_TTL_MS
    });
const readSessionCache = (key)=>{
    if (!canUseSessionStorage()) return null;
    //TURBOPACK unreachable
    ;
};
const writeSessionCache = (key, record)=>{
    if (!canUseSessionStorage()) return;
    //TURBOPACK unreachable
    ;
};
const getCachedData = (path)=>{
    const mem = memoryCache.get(path);
    if (mem && Date.now() <= mem.expiresAt) return mem.data;
    const session = readSessionCache(path);
    if (session) {
        memoryCache.set(path, session);
        return session.data;
    }
    if (mem) memoryCache.delete(path);
    return null;
};
const setCachedData = (path, data)=>{
    const record = toCacheRecord(data);
    memoryCache.set(path, record);
    writeSessionCache(path, record);
};
const getProductKeyCandidates = ()=>{
    const base = toText((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$product$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultProductKey"])()) || "property";
    return unique([
        base
    ]);
};
const normalizeList = (payload)=>{
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.countries)) return payload.countries;
    if (Array.isArray(payload?.states)) return payload.states;
    if (Array.isArray(payload?.cities)) return payload.cities;
    if (Array.isArray(payload?.areas)) return payload.areas;
    if (Array.isArray(payload?.businesses)) return payload.businesses;
    return [];
};
const getTypedSlug = (row, type)=>{
    if (type === "country") {
        return row.country_slug || row.slug || row.code || row.iso2 || row.iso_code;
    }
    if (type === "state") {
        return row.state_slug || row.slug;
    }
    if (type === "city") {
        return row.city_slug || row.slug;
    }
    if (type === "area") {
        return row.area_slug || row.slug;
    }
    return row.slug || row.country_slug || row.state_slug || row.city_slug || row.area_slug || row.code || row.iso2 || row.iso_code;
};
const getTypedName = (row, type)=>{
    if (type === "country") return row.country_name || row.name || row.label || row.title;
    if (type === "state") return row.state_name || row.name || row.label || row.title;
    if (type === "city") return row.city_name || row.name || row.label || row.title;
    if (type === "area") return row.area_name || row.name || row.label || row.title;
    return row.name || row.country_name || row.state_name || row.city_name || row.area_name || row.title || row.label;
};
const normalizeLocation = (item, type)=>{
    const row = item || {};
    const slug = getTypedSlug(row, type);
    const name = getTypedName(row, type);
    const normalizedSlug = toSlug(slug || name);
    return {
        slug: normalizedSlug,
        name: toText(name) || toTitle(normalizedSlug),
        type,
        raw: row
    };
};
const fetchLocationPath = async (path)=>{
    const cached = getCachedData(path);
    if (cached) return cached;
    if (inflightRequests.has(path)) {
        return inflightRequests.get(path);
    }
    const requestPromise = locationApi.get(path, {
        timeout: 8000
    }).then((response)=>{
        const normalized = normalizeList(response?.data);
        setCachedData(path, normalized);
        return normalized;
    }).finally(()=>{
        inflightRequests.delete(path);
    });
    inflightRequests.set(path, requestPromise);
    return requestPromise;
};
const requestLocation = async (pathFactory)=>{
    const productKeys = getProductKeyCandidates();
    let lastError = null;
    for (const productKey of productKeys){
        try {
            const path = pathFactory(productKey);
            const data = await fetchLocationPath(path);
            return {
                productKey,
                data
            };
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
};
const fetchLocationRawPath = async (path)=>{
    const cached = getCachedData(path);
    if (cached) return cached;
    if (inflightRequests.has(path)) {
        return inflightRequests.get(path);
    }
    const requestPromise = locationApi.get(path, {
        timeout: 8000
    }).then((response)=>{
        const payload = response?.data ?? null;
        setCachedData(path, payload);
        return payload;
    }).finally(()=>{
        inflightRequests.delete(path);
    });
    inflightRequests.set(path, requestPromise);
    return requestPromise;
};
const requestLocationRaw = async (pathFactory)=>{
    const productKeys = getProductKeyCandidates();
    let lastError = null;
    for (const productKey of productKeys){
        try {
            const path = pathFactory(productKey);
            const data = await fetchLocationRawPath(path);
            return {
                productKey,
                data
            };
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
};
const getCountries = async ()=>{
    const result = await requestLocation((productKey)=>`/location/${productKey}/countries`);
    return result.data.map((item)=>normalizeLocation(item, "country"));
};
const getStates = async (countrySlug)=>{
    const country = toSlug(countrySlug);
    const result = await requestLocation((productKey)=>`/location/${productKey}/${country}/states`);
    return result.data.map((item)=>normalizeLocation(item, "state"));
};
const getCities = async (countrySlug, stateSlug)=>{
    const country = toSlug(countrySlug);
    const state = toSlug(stateSlug);
    const result = await requestLocation((productKey)=>`/location/${productKey}/${country}/${state}/cities`);
    return result.data.map((item)=>normalizeLocation(item, "city"));
};
const getAreas = async (countrySlug, stateSlug, citySlug)=>{
    const country = toSlug(countrySlug);
    const state = toSlug(stateSlug);
    const city = toSlug(citySlug);
    const result = await requestLocation((productKey)=>`/location/${productKey}/${country}/${state}/${city}/areas`);
    return result.data.map((item)=>normalizeLocation(item, "area"));
};
const normalizeBusiness = (item)=>{
    const row = item || {};
    const name = row.display_name || row.business_name || row.name || row.title || "Business";
    const slug = row.business_slug || row.slug || row.seaneb_id || toSlug(name);
    const areaName = row.area_name || row.area || "";
    const cityName = row.city_name || row.city || "";
    const location = row.address || [
        areaName,
        cityName
    ].filter(Boolean).join(", ");
    const rawPrice = row.price || row.min_price || row.starting_price || row.price_from || row.price_to || "";
    return {
        id: row.business_id || row.id || slug,
        title: toText(name),
        slug: toText(slug),
        location: toText(location),
        type: toText(row.business_type || row.category || row.type || "property"),
        price: toText(rawPrice),
        image: row.business_logo || row.image || row.cover_image || row.logo || row.thumbnail || "/assets/propertyimages/image.png",
        raw: row
    };
};
const getBusinessesByArea = async (countrySlug, stateSlug, citySlug, areaSlug)=>{
    const country = toSlug(countrySlug);
    const state = toSlug(stateSlug);
    const city = toSlug(citySlug);
    const area = toSlug(areaSlug);
    const result = await requestLocation((productKey)=>`/location/${productKey}/${country}/${state}/${city}/${area}/businesses`);
    return result.data.map(normalizeBusiness);
};
const normalizeBusinessDetailPayload = (payload)=>{
    if (!payload) return null;
    if (payload?.data?.data) return payload.data.data;
    if (payload?.data) return payload.data;
    return payload;
};
const getBusinessDetailsBySeanebId = async (seanebId)=>{
    const id = toText(seanebId);
    if (!id) return null;
    const result = await requestLocationRaw((productKey)=>`/location/${productKey}/business/${encodeURIComponent(id)}`);
    const first = normalizeBusinessDetailPayload(result?.data);
    return first || null;
};
}),
"[project]/src/components/pages/locationTailwindClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "locationTw",
    ()=>locationTw
]);
const locationTw = {
    dynamicContainer: "mx-auto max-w-[1120px] px-4",
    heroDarkFull: "w-full bg-[linear-gradient(180deg,var(--color-gradient-hero-dark-mid)_0%,var(--color-gradient-hero-dark-mid-2)_50%,var(--color-gradient-hero-dark-end)_100%)] py-[4.5rem] mb-12 [@media(max-width:640px)]:py-12 [@media(max-width:640px)]:mb-8",
    heroInner: "mx-auto max-w-[1120px] px-4 [color:var(--text-inverse)]",
    breadcrumb: "mb-3 text-sm [color:var(--gray-300)]",
    heroTitle: "mb-3 font-bold tracking-[-0.5px] [color:var(--text-inverse)] text-[2.4rem] [@media(max-width:1024px)]:text-[2rem] [@media(max-width:768px)]:text-[1.85rem] [@media(max-width:640px)]:text-[1.65rem]",
    heroDesc: "max-w-[640px] text-base leading-[1.6] [color:var(--gray-200)] [@media(max-width:768px)]:text-sm",
    section: "py-16 [@media(max-width:768px)]:py-8",
    sectionLight: "bg-[var(--gray-50)] py-16 [@media(max-width:768px)]:py-8",
    sectionTitle: "mb-4 text-2xl font-semibold [color:var(--text-primary)]",
    sectionSubTitle: "mb-3 text-xl font-semibold [color:var(--text-primary)]",
    sectionDesc: "mb-10 text-base [color:var(--text-secondary)]",
    pillGrid: "flex flex-wrap gap-3",
    pill: "cursor-pointer rounded-full border border-transparent bg-[var(--gray-100)] px-[1.4rem] py-[0.55rem] text-[0.9rem] font-medium [color:var(--text-primary)] transition-all hover:border-[var(--error)] hover:bg-[var(--error)] hover:[color:var(--text-inverse)] [@media(max-width:640px)]:px-[1.1rem] [@media(max-width:640px)]:py-[0.45rem] [@media(max-width:640px)]:text-[0.85rem]",
    list: "list-none p-0 [&>li]:mb-3 [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li]:text-[0.95rem] [&>li]:[color:var(--text-secondary)] [&>li]:before:content-['\\2713'] [&>li]:before:shrink-0 [&>li]:before:font-bold [&>li]:before:[color:var(--success)]",
    ctaBanner: "mt-12 flex items-center justify-between gap-8 rounded-2xl bg-[var(--background)] p-10 shadow-lg [@media(max-width:1024px)]:p-8 [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:items-start [@media(max-width:768px)]:gap-6 [@media(max-width:640px)]:p-7",
    ctaTitle: "mb-[0.3rem] text-[1.3rem] font-bold [color:var(--text-primary)]",
    ctaDesc: "text-sm [color:var(--text-secondary)]",
    ctaBtn: "whitespace-nowrap rounded-full border-2 border-[var(--error)] bg-[var(--error)] px-[1.6rem] py-[0.65rem] font-semibold [color:var(--text-inverse)] transition-all hover:translate-y-[-2px] hover:border-[var(--color-button-danger-hover)] hover:bg-[var(--color-button-danger-hover)] [@media(max-width:640px)]:mt-4 [@media(max-width:640px)]:w-full [@media(max-width:640px)]:text-center",
    backLinkWrap: "py-8",
    backLink: "inline-flex items-center gap-2 text-sm [color:var(--text-secondary)] transition-all hover:[color:var(--brand-blue)] hover:underline",
    countryHero: "w-full bg-[linear-gradient(180deg,var(--color-gradient-hero-dark-start)_0%,var(--color-gradient-hero-dark-mid)_50%,var(--color-gradient-hero-dark-mid-2)_100%)] py-[4.5rem] [@media(max-width:768px)]:py-12 [@media(max-width:640px)]:mb-8",
    countryHeroInner: "mx-auto max-w-[1120px] px-4 [color:var(--text-inverse)]",
    countryHeroTitle: "mb-3 text-[2.6rem] font-bold tracking-[-0.5px] [@media(max-width:1024px)]:text-[2rem] [@media(max-width:768px)]:text-[1.85rem] [@media(max-width:640px)]:text-[1.65rem]",
    countryHeroDesc: "max-w-[720px] text-base leading-[1.6] [color:var(--gray-200)]",
    countrySection: "bg-[var(--background)] py-16",
    countrySectionTitle: "mb-2 text-center text-[2rem] font-bold [color:var(--text-primary)] [@media(max-width:768px)]:text-[1.85rem] [@media(max-width:640px)]:text-[1.6rem]",
    countrySectionDesc: "mb-10 text-center [color:var(--text-secondary)]",
    countryGrid: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]",
    countryCard: "rounded-[10px] border border-[var(--border)] bg-[var(--background)] p-5 text-center font-semibold capitalize transition-all hover:translate-y-[-2px] hover:border-[var(--error)] hover:bg-[var(--error-bg)] hover:[color:var(--error)]",
    countryCta: "bg-[linear-gradient(180deg,var(--text-primary)_0%,var(--color-country-cta-end)_100%)] px-4 py-16",
    countryCtaInner: "mx-auto max-w-[720px] text-center [color:var(--text-inverse)]",
    countryCtaTitle: "mb-3 text-[2rem] font-bold",
    countryCtaDesc: "mb-8 [color:var(--color-text-country-cta-desc)]",
    countryCtaBtn: "inline-block rounded-full border-2 border-[var(--error)] bg-[var(--error)] px-[2.2rem] py-[0.9rem] font-semibold [color:var(--text-inverse)] transition-all hover:translate-y-[-2px] hover:border-[var(--color-button-danger-hover)] hover:bg-[var(--color-button-danger-hover)] [@media(max-width:640px)]:mt-4 [@media(max-width:640px)]:w-full [@media(max-width:640px)]:text-center",
    wrapper: "mt-10 w-full",
    header: "mb-[1.6rem]",
    headerTitle: "mb-[0.4rem] text-[1.7rem] font-bold [color:var(--brand-dark)]",
    headerDesc: "text-sm [color:var(--text-secondary)]",
    listingGrid: "grid grid-cols-1 gap-5 sm:gap-[1.6rem] sm:grid-cols-2 lg:grid-cols-3",
    card: "cursor-pointer overflow-hidden rounded-2xl bg-[var(--background)] shadow-md transition-all duration-300 hover:translate-y-[-6px] hover:shadow-[0_14px_34px_var(--color-shadow-card-hover-strong)]",
    imageWrap: "relative h-[200px] w-full overflow-hidden bg-[var(--gray-200)] sm:h-[210px]",
    image: "h-full w-full object-cover",
    badge: "absolute left-[14px] top-[14px] rounded-full bg-[var(--color-overlay-badge-dark)] px-3 py-[6px] text-xs font-semibold [color:var(--text-inverse)]",
    cardBody: "px-[1.1rem] pb-[1.2rem] pt-4",
    cardTitle: "mb-[0.3rem] text-[1.05rem] font-bold [color:var(--brand-dark)]",
    cardLocation: "mb-[0.9rem] text-sm [color:var(--text-secondary)]",
    cardFooter: "flex items-center justify-between",
    cardPrice: "text-base font-bold [color:var(--success)]",
    cardAction: "text-sm font-semibold [color:var(--brand-blue)] hover:[color:var(--brand-blue-dark)]",
    detailWrapper: "min-h-screen bg-[var(--gray-50)] p-8",
    detailContainer: "mx-auto max-w-[900px] rounded-[10px] bg-[var(--background)] p-6 shadow-md",
    detailBreadcrumb: "mb-3 flex items-center gap-2 text-[0.9rem] [color:var(--text-muted)]",
    detailBreadcrumbLink: "[color:var(--brand-blue)] hover:[color:var(--brand-blue-dark)] hover:underline",
    detailTitle: "mb-2 text-2xl font-semibold [color:var(--text-primary)]",
    detailDesc: "mb-4 text-[0.95rem] leading-[1.6] [color:var(--text-secondary)]",
    detailRatingRow: "mb-4 flex flex-wrap items-center gap-4",
    detailRating: "flex items-center gap-1",
    detailRatingValue: "font-semibold [color:var(--text-primary)]",
    detailFeatures: "mt-4 flex list-none flex-col gap-2 p-0 [&>li]:flex [&>li]:items-center [&>li]:gap-3 [&>li]:text-[0.95rem] [&>li]:[color:var(--text-secondary)] [&>li]:before:content-['\\2713'] [&>li]:before:shrink-0 [&>li]:before:font-bold [&>li]:before:[color:var(--success)]",
    detailBackWrap: "mt-4"
};
}),
"[project]/src/components/pages/CountryPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CountryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/MainNavbar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/location.service.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/locationTailwindClasses.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function toTitle(slug) {
    return String(slug || "").replace(/[-_]/g, " ").replace(/\b\w/g, (char)=>char.toUpperCase());
}
function toSeoSlug(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}
function buildStateHref(countrySlug, stateSlug) {
    return countrySlug === "in" ? `/in/${stateSlug}` : `/in/${countrySlug}/${stateSlug}`;
}
function CountryPage({ countrySlug = "in" }) {
    const [states, setStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countryName, setCountryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(countrySlug));
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const normalizedCountrySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(countrySlug || "in").toLowerCase(), [
        countrySlug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        const load = async ()=>{
            setLoading(true);
            try {
                const [countries, statesData] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCountries"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStates"])(normalizedCountrySlug)
                ]);
                if (!mounted) return;
                const activeCountry = countries.find((country)=>country.slug === normalizedCountrySlug);
                setCountryName(activeCountry?.name || toTitle(normalizedCountrySlug));
                setStates(statesData);
            } catch (error) {
                if (!mounted) return;
                setCountryName(toTitle(normalizedCountrySlug));
                setStates([]);
            } finally{
                if (mounted) setLoading(false);
            }
        };
        load();
        return ()=>{
            mounted = false;
        };
    }, [
        normalizedCountrySlug
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/pages/CountryPage.jsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryHero,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryHeroInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].breadcrumb,
                            children: [
                                "Home / Countries / ",
                                countryName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryHeroTitle,
                            children: [
                                "Properties in ",
                                countryName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryHeroDesc,
                            children: [
                                "Discover verified residential and commercial properties across ",
                                countryName,
                                ". Buy, rent, or invest with confidence on SeaNeB."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CountryPage.jsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pages/CountryPage.jsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countrySection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].dynamicContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countrySectionTitle,
                            children: [
                                "Browse States in ",
                                countryName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countrySectionDesc,
                            children: "Explore real estate opportunities by state"
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryGrid,
                            children: !loading && states.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionDesc,
                                children: "No states available right now."
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CountryPage.jsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this) : states.map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: buildStateHref(normalizedCountrySlug, toSeoSlug(state.name || state.slug)),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryCard,
                                    children: state.name
                                }, state.slug, false, {
                                    fileName: "[project]/src/components/pages/CountryPage.jsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CountryPage.jsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pages/CountryPage.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryCta,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryCtaInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryCtaTitle,
                            children: [
                                "Want to List Your Property in ",
                                countryName,
                                "?"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryCtaDesc,
                            children: "Reach verified buyers and renters across the country."
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/partner",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].countryCtaBtn,
                            children: "Partner With SeaNeB"
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CountryPage.jsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CountryPage.jsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pages/CountryPage.jsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/pages/StatePage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/MainNavbar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/location.service.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/locationTailwindClasses.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function toTitle(slug) {
    return String(slug || "").replace(/[-_]/g, " ").replace(/\b\w/g, (char)=>char.toUpperCase());
}
function toSeoSlug(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}
function buildCityHref(countrySlug, stateSlug, citySlug) {
    return countrySlug === "in" ? `/in/${citySlug}-${stateSlug}` : `/in/${countrySlug}/${citySlug}-${stateSlug}`;
}
function StatePage({ countrySlug = "in", stateSlug }) {
    const [countryName, setCountryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(countrySlug));
    const [stateName, setStateName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(stateSlug));
    const [cities, setCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stateSeoSlug, setStateSeoSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toSeoSlug(stateSlug));
    const [stateApiSlug, setStateApiSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(String(stateSlug || "").toLowerCase());
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const normalizedCountrySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(countrySlug || "in").toLowerCase(), [
        countrySlug
    ]);
    const normalizedStateSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(stateSlug || "").toLowerCase(), [
        stateSlug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        const load = async ()=>{
            try {
                const [countries, states] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCountries"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStates"])(normalizedCountrySlug)
                ]);
                if (!mounted) return;
                const selectedCountry = countries.find((country)=>country.slug === normalizedCountrySlug);
                const selectedState = states.find((state)=>state.slug === normalizedStateSlug || toSeoSlug(state.name) === normalizedStateSlug);
                const resolvedApiStateSlug = selectedState?.slug || normalizedStateSlug;
                const resolvedSeoStateSlug = toSeoSlug(selectedState?.name || normalizedStateSlug);
                const citiesData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCities"])(normalizedCountrySlug, resolvedApiStateSlug);
                if (!mounted) return;
                setCountryName(selectedCountry?.name || toTitle(normalizedCountrySlug));
                setStateName(selectedState?.name || toTitle(resolvedSeoStateSlug));
                setStateSeoSlug(resolvedSeoStateSlug);
                setStateApiSlug(resolvedApiStateSlug);
                setCities(citiesData);
                const isIndiaPath = normalizedCountrySlug === "in";
                const cleanPath = isIndiaPath ? `/in/${resolvedSeoStateSlug}` : `/in/${normalizedCountrySlug}/${resolvedSeoStateSlug}`;
                if (pathname && pathname !== cleanPath) {
                    router.replace(cleanPath);
                }
            } catch (error) {
                if (!mounted) return;
                setCountryName(toTitle(normalizedCountrySlug));
                setStateName(toTitle(normalizedStateSlug));
                setStateSeoSlug(toSeoSlug(normalizedStateSlug));
                setStateApiSlug(normalizedStateSlug);
                setCities([]);
            }
        };
        if (normalizedStateSlug) {
            load();
        }
        return ()=>{
            mounted = false;
        };
    }, [
        normalizedCountrySlug,
        normalizedStateSlug,
        pathname,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/pages/StatePage.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroDarkFull,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].breadcrumb,
                            children: [
                                "Home / ",
                                countryName,
                                " / ",
                                stateName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/StatePage.jsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroTitle,
                            children: [
                                "Properties in ",
                                stateName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/StatePage.jsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroDesc,
                            children: [
                                "Buy, rent and invest in verified properties across ",
                                stateName,
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/StatePage.jsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/StatePage.jsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pages/StatePage.jsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].dynamicContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionTitle,
                                children: [
                                    "Cities in ",
                                    stateName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/StatePage.jsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].pillGrid,
                                children: cities.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionDesc,
                                    children: "No city data available right now."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/StatePage.jsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this) : cities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: buildCityHref(normalizedCountrySlug, stateApiSlug, toSeoSlug(city.name || city.slug)),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].pill,
                                        children: city.name
                                    }, city.slug, false, {
                                        fileName: "[project]/src/components/pages/StatePage.jsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/StatePage.jsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/StatePage.jsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionLight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionSubTitle,
                                children: [
                                    "Why Choose SeaNeB in ",
                                    stateName,
                                    "?"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/StatePage.jsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].list,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Verified listings"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/StatePage.jsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Trusted agents"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/StatePage.jsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Smart area search"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/StatePage.jsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Residential and commercial options"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/StatePage.jsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/StatePage.jsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/StatePage.jsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaBanner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaTitle,
                                        children: [
                                            "List Your Property in ",
                                            stateName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/StatePage.jsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaDesc,
                                        children: "Reach verified buyers and renters on SeaNeB."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/StatePage.jsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/StatePage.jsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/partner",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaBtn,
                                children: "Partner With Us"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/StatePage.jsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/StatePage.jsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].backLinkWrap,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].backLink,
                            href: normalizedCountrySlug === "in" ? "/in" : `/in/${normalizedCountrySlug}`,
                            children: [
                                "Back to ",
                                countryName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/StatePage.jsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/StatePage.jsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pages/StatePage.jsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/pages/CityPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/MainNavbar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/location.service.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/locationTailwindClasses.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function toTitle(slug) {
    return String(slug || "").replace(/[-_]/g, " ").replace(/\b\w/g, (char)=>char.toUpperCase());
}
function toSeoSlug(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}
function buildAreaHref(countrySlug, stateSlug, citySlug, areaSlug) {
    return countrySlug === "in" ? `/in/${areaSlug}-${citySlug}` : `/in/${countrySlug}/${areaSlug}-${citySlug}`;
}
function buildStateHref(countrySlug, stateSlug) {
    return countrySlug === "in" ? `/in/${stateSlug}` : `/in/${countrySlug}/${stateSlug}`;
}
function CityPage({ countrySlug = "in", stateSlug, citySlug }) {
    const [countryName, setCountryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(countrySlug));
    const [stateName, setStateName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(stateSlug));
    const [cityName, setCityName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(citySlug));
    const [areas, setAreas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stateSeoSlug, setStateSeoSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toSeoSlug(stateSlug));
    const [citySeoSlug, setCitySeoSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toSeoSlug(citySlug));
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const normalizedCountrySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(countrySlug || "in").toLowerCase(), [
        countrySlug
    ]);
    const normalizedStateSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(stateSlug || "").toLowerCase(), [
        stateSlug
    ]);
    const normalizedCitySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(citySlug || "").toLowerCase(), [
        citySlug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        const load = async ()=>{
            try {
                const [countries, states] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCountries"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStates"])(normalizedCountrySlug)
                ]);
                if (!mounted) return;
                const selectedState = states.find((item)=>item.slug === normalizedStateSlug || toSeoSlug(item.name) === normalizedStateSlug);
                const resolvedApiStateSlug = selectedState?.slug || normalizedStateSlug;
                const resolvedSeoStateSlug = toSeoSlug(selectedState?.name || normalizedStateSlug);
                const cities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCities"])(normalizedCountrySlug, resolvedApiStateSlug);
                const selectedCity = cities.find((item)=>item.slug === normalizedCitySlug || toSeoSlug(item.name) === normalizedCitySlug);
                const resolvedApiCitySlug = selectedCity?.slug || normalizedCitySlug;
                const resolvedSeoCitySlug = toSeoSlug(selectedCity?.name || normalizedCitySlug);
                const areaData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAreas"])(normalizedCountrySlug, resolvedApiStateSlug, resolvedApiCitySlug);
                if (!mounted) return;
                const selectedCountry = countries.find((item)=>item.slug === normalizedCountrySlug);
                setCountryName(selectedCountry?.name || toTitle(normalizedCountrySlug));
                setStateName(selectedState?.name || toTitle(resolvedSeoStateSlug));
                setCityName(selectedCity?.name || toTitle(resolvedSeoCitySlug));
                setStateSeoSlug(resolvedSeoStateSlug);
                setCitySeoSlug(resolvedSeoCitySlug);
                setAreas(areaData);
                const isIndiaPath = normalizedCountrySlug === "in";
                const cleanPath = isIndiaPath ? `/in/${resolvedSeoCitySlug}-${resolvedApiStateSlug}` : `/in/${normalizedCountrySlug}/${resolvedSeoCitySlug}-${resolvedApiStateSlug}`;
                if (pathname && pathname !== cleanPath) {
                    router.replace(cleanPath);
                }
            } catch (error) {
                if (!mounted) return;
                setCountryName(toTitle(normalizedCountrySlug));
                setStateName(toTitle(normalizedStateSlug));
                setCityName(toTitle(normalizedCitySlug));
                setStateSeoSlug(toSeoSlug(normalizedStateSlug));
                setCitySeoSlug(toSeoSlug(normalizedCitySlug));
                setAreas([]);
            }
        };
        if (normalizedStateSlug && normalizedCitySlug) {
            load();
        }
        return ()=>{
            mounted = false;
        };
    }, [
        normalizedCountrySlug,
        normalizedStateSlug,
        normalizedCitySlug,
        pathname,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/pages/CityPage.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroDarkFull,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].breadcrumb,
                            children: [
                                "Home / ",
                                countryName,
                                " / ",
                                stateName,
                                " / ",
                                cityName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CityPage.jsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroTitle,
                            children: [
                                "Properties in ",
                                cityName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CityPage.jsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroDesc,
                            children: [
                                "Explore verified residential and commercial properties across ",
                                cityName,
                                ". Buy, rent, or invest with confidence."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CityPage.jsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CityPage.jsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pages/CityPage.jsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].dynamicContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionTitle,
                                children: [
                                    "Areas in ",
                                    cityName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CityPage.jsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].pillGrid,
                                children: areas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionDesc,
                                    children: "No area data available for this city."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/CityPage.jsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this) : areas.map((area)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: buildAreaHref(normalizedCountrySlug, stateSeoSlug, citySeoSlug, toSeoSlug(area.name || area.slug)),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].pill,
                                        children: area.name
                                    }, area.slug, false, {
                                        fileName: "[project]/src/components/pages/CityPage.jsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CityPage.jsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CityPage.jsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionLight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionSubTitle,
                                children: [
                                    "Why Buy Property in ",
                                    cityName,
                                    "?"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CityPage.jsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].list,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Verified listings only"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CityPage.jsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Trusted local agents"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CityPage.jsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Smart area-based search"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CityPage.jsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Residential and commercial options"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CityPage.jsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CityPage.jsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CityPage.jsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaBanner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaTitle,
                                        children: [
                                            "List Your Property in ",
                                            cityName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CityPage.jsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaDesc,
                                        children: "Reach verified buyers and renters in your city."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CityPage.jsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CityPage.jsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/partner",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaBtn,
                                children: "Partner With Us"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CityPage.jsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CityPage.jsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].backLinkWrap,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].backLink,
                            href: buildStateHref(normalizedCountrySlug, stateSeoSlug),
                            children: [
                                "Back to ",
                                stateName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CityPage.jsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/CityPage.jsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pages/CityPage.jsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/pages/BusinessListingPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BusinessListingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/locationTailwindClasses.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const PROPERTY_IMAGE = "/assets/propertyimages/image.png";
function formatPrice(value) {
    const text = String(value || "").trim();
    return text || "Price on request";
}
function BusinessListingPage({ title, subtitle, businesses = [] }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].wrapper,
        "aria-labelledby": "property-listing-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "property-listing-title",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].headerTitle,
                        children: title || "Properties Near You"
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].headerDesc,
                        children: subtitle || "Browse verified residential and commercial properties curated for your selected area."
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].listingGrid,
                children: businesses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionDesc,
                    children: "No businesses found for this location."
                }, void 0, false, {
                    fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this) : businesses.map((business)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/${business.slug}?from=${encodeURIComponent(pathname || "/in")}`,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].card,
                        "aria-label": `View details of ${business.title}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].imageWrap,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: business.image || PROPERTY_IMAGE,
                                        alt: `${business.title} image`,
                                        fill: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].image,
                                        sizes: "(max-width: 768px) 100vw, 33vw"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].badge,
                                        children: business.type || "Property"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                        lineNumber: 51,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].cardBody,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].cardTitle,
                                        children: business.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                        lineNumber: 55,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].cardLocation,
                                        children: business.location || "Location not available"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].cardFooter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].cardPrice,
                                                children: formatPrice(business.price)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].cardAction,
                                                children: "View Details"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this)
                        ]
                    }, business.id, true, {
                        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                        lineNumber: 36,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pages/BusinessListingPage.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/pages/AreaPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AreaPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/MainNavbar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$BusinessListingPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/BusinessListingPage.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/locationTailwindClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/location.service.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function toTitle(slug) {
    return String(slug || "").replace(/[-_]/g, " ").replace(/\b\w/g, (char)=>char.toUpperCase());
}
function toSeoSlug(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}
function buildCityHref(countrySlug, stateSlug, citySlug) {
    return countrySlug === "in" ? `/in/${citySlug}-${stateSlug}` : `/in/${countrySlug}/${citySlug}-${stateSlug}`;
}
function AreaPage({ countrySlug = "in", stateSlug, citySlug, areaSlug }) {
    const [countryName, setCountryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(countrySlug));
    const [stateName, setStateName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(stateSlug));
    const [cityName, setCityName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(citySlug));
    const [areaName, setAreaName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toTitle(areaSlug));
    const [businesses, setBusinesses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stateSeoSlug, setStateSeoSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toSeoSlug(stateSlug));
    const [stateApiSlug, setStateApiSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(String(stateSlug || "").toLowerCase());
    const [citySeoSlug, setCitySeoSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(toSeoSlug(citySlug));
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const normalizedCountrySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(countrySlug || "in").toLowerCase(), [
        countrySlug
    ]);
    const normalizedStateSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(stateSlug || "").toLowerCase(), [
        stateSlug
    ]);
    const normalizedCitySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(citySlug || "").toLowerCase(), [
        citySlug
    ]);
    const normalizedAreaSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>String(areaSlug || "").toLowerCase(), [
        areaSlug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        const load = async ()=>{
            try {
                const [countries, states] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCountries"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStates"])(normalizedCountrySlug)
                ]);
                if (!mounted) return;
                let selectedState = states.find((item)=>item.slug === normalizedStateSlug || toSeoSlug(item.name) === normalizedStateSlug);
                let resolvedApiStateSlug = selectedState?.slug || normalizedStateSlug;
                let resolvedSeoStateSlug = toSeoSlug(selectedState?.name || normalizedStateSlug);
                let cities = [];
                let selectedCity = null;
                if (resolvedApiStateSlug) {
                    cities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCities"])(normalizedCountrySlug, resolvedApiStateSlug);
                    selectedCity = cities.find((item)=>item.slug === normalizedCitySlug || toSeoSlug(item.name) === normalizedCitySlug);
                }
                if (!selectedCity) {
                    for (const state of states){
                        const stateCities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCities"])(normalizedCountrySlug, state.slug);
                        const match = stateCities.find((item)=>item.slug === normalizedCitySlug || toSeoSlug(item.name) === normalizedCitySlug);
                        if (match) {
                            selectedState = state;
                            resolvedApiStateSlug = state.slug;
                            resolvedSeoStateSlug = toSeoSlug(state.name || state.slug);
                            cities = stateCities;
                            selectedCity = match;
                            break;
                        }
                    }
                }
                const resolvedApiCitySlug = selectedCity?.slug || normalizedCitySlug;
                const resolvedSeoCitySlug = toSeoSlug(selectedCity?.name || normalizedCitySlug);
                const areas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAreas"])(normalizedCountrySlug, resolvedApiStateSlug, resolvedApiCitySlug);
                const selectedArea = areas.find((item)=>item.slug === normalizedAreaSlug || toSeoSlug(item.name) === normalizedAreaSlug);
                const resolvedApiAreaSlug = selectedArea?.slug || normalizedAreaSlug;
                const resolvedSeoAreaSlug = toSeoSlug(selectedArea?.name || normalizedAreaSlug);
                const businessData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$location$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBusinessesByArea"])(normalizedCountrySlug, resolvedApiStateSlug, resolvedApiCitySlug, resolvedApiAreaSlug);
                if (!mounted) return;
                const selectedCountry = countries.find((item)=>item.slug === normalizedCountrySlug);
                setCountryName(selectedCountry?.name || toTitle(normalizedCountrySlug));
                setStateName(selectedState?.name || toTitle(resolvedSeoStateSlug));
                setCityName(selectedCity?.name || toTitle(resolvedSeoCitySlug));
                setAreaName(selectedArea?.name || toTitle(resolvedSeoAreaSlug));
                setStateSeoSlug(resolvedSeoStateSlug);
                setStateApiSlug(resolvedApiStateSlug);
                setCitySeoSlug(resolvedSeoCitySlug);
                setBusinesses(businessData);
                const isIndiaPath = normalizedCountrySlug === "in";
                const cleanPath = isIndiaPath ? `/in/${resolvedSeoAreaSlug}-${resolvedSeoCitySlug}` : `/in/${normalizedCountrySlug}/${resolvedSeoAreaSlug}-${resolvedSeoCitySlug}`;
                if (pathname && pathname !== cleanPath) {
                    router.replace(cleanPath);
                }
            } catch (error) {
                if (!mounted) return;
                setCountryName(toTitle(normalizedCountrySlug));
                setStateName(toTitle(normalizedStateSlug));
                setCityName(toTitle(normalizedCitySlug));
                setAreaName(toTitle(normalizedAreaSlug));
                setStateSeoSlug(toSeoSlug(normalizedStateSlug));
                setStateApiSlug(normalizedStateSlug);
                setCitySeoSlug(toSeoSlug(normalizedCitySlug));
                setBusinesses([]);
            }
        };
        if (normalizedCitySlug && normalizedAreaSlug) {
            load();
        }
        return ()=>{
            mounted = false;
        };
    }, [
        normalizedCountrySlug,
        normalizedStateSlug,
        normalizedCitySlug,
        normalizedAreaSlug,
        pathname,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MainNavbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/pages/AreaPage.jsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroDarkFull,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].breadcrumb,
                            children: [
                                "Home / ",
                                countryName,
                                " / ",
                                stateName,
                                " / ",
                                cityName,
                                " / ",
                                areaName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/AreaPage.jsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroTitle,
                            children: [
                                "Properties in ",
                                areaName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/AreaPage.jsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].heroDesc,
                            children: [
                                "Explore verified residential and commercial properties in ",
                                areaName,
                                ", ",
                                cityName,
                                ". Buy, rent, or invest confidently."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/AreaPage.jsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/AreaPage.jsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pages/AreaPage.jsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].dynamicContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionLight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].sectionSubTitle,
                                children: [
                                    "Why Buy Property in ",
                                    areaName,
                                    "?"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/AreaPage.jsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].list,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Premium residential locality"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Excellent connectivity"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Trusted local agents"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Verified property listings"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/AreaPage.jsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$BusinessListingPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: `Properties in ${areaName}`,
                        subtitle: `Live listings from ${areaName}, ${cityName}`,
                        businesses: businesses
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaBanner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaTitle,
                                        children: [
                                            "List Your Property in ",
                                            areaName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaDesc,
                                        children: [
                                            "Reach serious buyers and renters in ",
                                            cityName,
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/AreaPage.jsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/partner",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].ctaBtn,
                                children: "Partner With Us"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/AreaPage.jsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].backLinkWrap,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$locationTailwindClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationTw"].backLink,
                            href: buildCityHref(normalizedCountrySlug, stateApiSlug, citySeoSlug),
                            children: [
                                "Back to ",
                                cityName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/AreaPage.jsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/AreaPage.jsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pages/AreaPage.jsx",
                lineNumber: 203,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_e925844d._.js.map