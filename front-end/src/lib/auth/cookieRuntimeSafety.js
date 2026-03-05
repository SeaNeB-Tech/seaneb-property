const inDev = () => String(process.env.NODE_ENV || "").trim() !== "production";

const warn = (message, context = {}) => {
  if (!inDev()) return;
  try {
    console.warn("[COOKIE_SAFETY]", message, context);
  } catch {
    // ignore warning failures
  }
};

const getSetCookieList = (headers) => {
  const getSetCookie = headers?.getSetCookie;
  if (typeof getSetCookie === "function") {
    return (getSetCookie.call(headers) || []).filter(Boolean);
  }
  const joined = String(headers?.get?.("set-cookie") || "").trim();
  if (!joined) return [];
  return joined
    .split(/,(?=\s*[!#$%&'*+\-.^_`|~0-9A-Za-z]+=)/g)
    .map((v) => v.trim())
    .filter(Boolean);
};

const parseCookieAttrs = (rawSetCookie) => {
  const segments = String(rawSetCookie || "")
    .split(";")
    .map((v) => v.trim())
    .filter(Boolean);
  if (segments.length === 0) return null;
  const first = segments[0];
  const idx = first.indexOf("=");
  if (idx <= 0) return null;
  const name = first.slice(0, idx).trim();
  const attrs = segments.slice(1).map((v) => v.toLowerCase());
  const sameSitePart = attrs.find((v) => v.startsWith("samesite=")) || "";
  return {
    name: name.toLowerCase(),
    secure: attrs.includes("secure"),
    sameSite: sameSitePart ? sameSitePart.replace("samesite=", "").trim() : "",
  };
};

export const validateCookiePolicyRuntime = ({
  refreshSecure,
  refreshSameSite,
  csrfSecure,
  csrfSameSite,
} = {}) => {
  const refreshSite = String(refreshSameSite || "").trim().toLowerCase();
  const csrfSite = String(csrfSameSite || "").trim().toLowerCase();

  if (refreshSite === "none" && !refreshSecure) {
    warn("refresh_token_property SameSite=None should require Secure=true", {
      refreshSameSite: refreshSite,
      refreshSecure: Boolean(refreshSecure),
    });
  }

  if (refreshSite && csrfSite && refreshSite !== csrfSite) {
    warn("csrf_token_property SameSite differs from refresh_token_property", {
      refreshSameSite: refreshSite,
      csrfSameSite: csrfSite,
    });
  }

  if (Boolean(refreshSecure) !== Boolean(csrfSecure)) {
    warn("csrf_token_property Secure differs from refresh_token_property", {
      refreshSecure: Boolean(refreshSecure),
      csrfSecure: Boolean(csrfSecure),
    });
  }
};

export const validateSetCookieHeadersRuntime = (headers) => {
  const cookies = getSetCookieList(headers).map(parseCookieAttrs).filter(Boolean);
  if (cookies.length === 0) return;

  const refresh = cookies.find((c) => c.name === "refresh_token_property");
  const csrf = cookies.find((c) => c.name === "csrf_token_property");

  if (refresh && refresh.sameSite === "none" && !refresh.secure) {
    warn("refresh_token_property set-cookie has SameSite=None without Secure");
  }

  if (refresh && csrf) {
    if (refresh.sameSite && csrf.sameSite && refresh.sameSite !== csrf.sameSite) {
      warn("set-cookie SameSite mismatch between refresh and csrf cookie", {
        refreshSameSite: refresh.sameSite,
        csrfSameSite: csrf.sameSite,
      });
    }
    if (refresh.secure !== csrf.secure) {
      warn("set-cookie Secure mismatch between refresh and csrf cookie", {
        refreshSecure: refresh.secure,
        csrfSecure: csrf.secure,
      });
    }
  }
};

