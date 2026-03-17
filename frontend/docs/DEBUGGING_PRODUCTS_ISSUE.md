# 🔍 Debugging: Products Disappear on Page Refresh

## Problem Summary

When user logs in with OTP:
- ✅ Dashboard loads, products display correctly
- ❌ After page refresh (F5), products disappear
- ❌ Error: "403 Forbidden - CSRF_TOKEN_REQUIRED" in network tab

## Root Cause Analysis

**What's happening:**
1. User does OTP verify → tokens stored in cookies
2. Dashboard loads → products fetch works
3. User refreshes page (F5)
4. Dashboard tries to initialize with `bootstrap` function
5. Bootstrap tries to regenerate access token via `/auth/refresh`
6. `/auth/refresh` returns **403 Forbidden - CSRF_TOKEN_REQUIRED** ❌
7. Bootstrap fails → products don't load
8. User gets redirected to login

**Why it fails:**
The CSRF token should be persisted in cookies, but the `/auth/refresh` endpoint is saying it's missing or invalid. This could be:

1. **CSRF not being stored in cookies** (encoding issue)
2. **CSRF value corrupted** during storage/retrieval
3. **CSRF not being sent** in x-csrf-token header properly
4. **Cookie SameSite/Secure flags** preventing cookie transmission
5. **Server-side CSRF validation** too strict or clock skew

## 🛠️ Debugging Steps

### Step 1: Check Browser Cookies

1. Open Dashboard (after successful OTP login)
2. Press **F12** to open DevTools
3. Go to **Application** → **Cookies** → select your domain
4. Look for these cookies and note their values (first 20 chars):
   - ✅ Should exist: `access_token`
   - ✅ Should exist: `csrf_token`
   - ✅ Should exist: `refresh_token`
   - ✅ Should exist: `session_start_time`
   - ✅ Should exist: `access_token_issued_time`

**Expected screenshot:**
```
Cookies for local loopback hosts
┌────────────────────┬──────────────────────┐
│ Name               │ Value                │
├────────────────────┼──────────────────────┤
│ access_token       │ eyJhbGciOiJ...       │
│ csrf_token         │ a1b2c3d4e5f6g7h8... │
│ refresh_token      │ (HttpOnly, hidden)   │
│ session_start_time │ 1234567890000        │
└────────────────────┴──────────────────────┘
```

**If any are missing:** ⚠️ Issue is in OTP verify storage

### Step 2: Watch Console During Page Refresh

1. **Keep DevTools open**, go to **Console** tab
2. **Refresh page** (F5)
3. Look for this sequence of logs:

```
🚀 [bootstrap] Page reloaded - checking for tokens...
   Available auth cookies: ['access_token', 'csrf_token', 'refresh_token', ...]
   ⚠️ No access token found - will try to regenerate via /auth/refresh
   ✓ Found CSRF in authStore (length=xx, first 20: a1b2c3d4e5f6g7h8i9...)
   
   Preparing /auth/refresh request...
   ┌─────────────────────────────────────────
   │ REQUEST DETAILS
   ├─ URL: /auth/refresh
   ├─ Method: POST
   ├─ Body: {} (tokens in cookies)
   ├─ Headers:
   │  ├─ x-csrf-token: a1b2c3d4e5f6g7h8...
   │  ├─ Content-Type: application/json
   │  └─ (refresh_token: sent via httpOnly cookie)
   ├─ Settings:
   │  ├─ withCredentials: true
   │  └─ SameSite: None
   └─────────────────────────────────────────
   
   Attempting POST /auth/refresh...
```

**Copy everything from console** and provide to debug team.

### Step 3: Monitor Network Request

1. Go to **Network** tab in DevTools
2. **Refresh page** (F5)
3. Look for **`auth/refresh`** POST request
4. Click on it and check:

**Request Headers:**
```
POST /auth/refresh HTTP/1.1
Host: dev.seaneb.com
Content-Type: application/json
x-csrf-token: a1b2c3d4e5f6g7h8i9jklmnop...
Cookie: access_token=...; csrf_token=...; refresh_token=...; ...
```

**Check these specific headers are present:**
- ✅ `x-csrf-token` header (should NOT be empty)
- ✅ `Cookie` header (should contain refresh_token)
- ✅ `Content-Type: application/json`

**Response:**
```
HTTP/1.1 403 Forbidden

{
  "error": {
    "code": "CSRF_TOKEN_REQUIRED",
    "message": "CSRF token missing or invalid"
  }
}
```

### Step 4: Compare CSRF Values

When bootstrap logs show the CSRF:
```
✓ Found CSRF in authStore (length=xx, first 20: a1b2c3d4e5f6g7h8i9...)
```

And the network tab shows the x-csrf-token header value:
```
x-csrf-token: a1b2c3d4e5f6g7h8i9jklmnop...
```

**DO THESE MATCH?**

**If YES:** ✅ CSRF is being sent correctly, backend issue
**If NO:** ❌ CSRF encoding issue during transmission

### Step 5: Capture Full Console Output

After refresh fails, copy entire console output showing:
1. Bootstrap diagnostics
2. authStore.dumpAuthState() output (if called)
3. Auth refresh attempt logs
4. Error messages

**Example of what to capture:**
```
[authStore] dumpAuthState()
  In Memory:
    - accessToken: PRESENT (length=...)
    - csrfToken: PRESENT (length=...)
    - refreshToken: null
  Cookies Available:
    - access_token: PRESENT (length=..., value=abc123...)
    - csrf_token: PRESENT (length=..., value=def456...)
    - refresh_token: PRESENT (HttpOnly)
    - session_start_time: 1234567890000

[bootstrap] CSRF token search results:
   ✓ Found CSRF in authStore (length=..., first 30: def456...)
   
❌ [bootstrap] Failed to regenerate access token:
   HTTP Status: 403
   Status Text: Forbidden
   Error Code: CSRF_TOKEN_REQUIRED
   Error Message: CSRF token missing or invalid
   Full error response: { error: { code: "CSRF_TOKEN_REQUIRED", message: "..." } }
```

## 🔐 Potential Solutions

### Solution 1: Check CSRF Encoding
The CSRF token might have special characters that break during encoding/decoding:
- Current: `encodeURIComponent()` / `decodeURIComponent()`
- Might need: base64 encoding instead, or no encoding if token is already safe

### Solution 2: Verify Refresh Token
The `/auth/refresh` endpoint needs:
- ✅ `refresh_token` cookie (HttpOnly, auto-sent by browser)
- ✅ `x-csrf-token` header (manually sent)
- ✅ `product_key` in body (or perhaps not needed?)

Check if `/auth/refresh` requires `product_key` in request body.

### Solution 3: Check Backend CSRF Validation
Server-side validation might:
- Expect CSRF in different header name
- Expect different CSRF format
- Have strict character validation (reject base64+ chars, etc)
- Be checking wrong CSRF source

### Solution 4: SameSite Cookie Policy
Auth cookies should use `SameSite=None` (and `Secure=true` in production). If they are set to a different `SameSite` value, cross-site requests may fail.

## 📋 Information Needed from User

Please provide:

1. **Screenshot of Cookies (Step 1)**
   - All auth-related cookies visible in DevTools
   
2. **Full Console Output (Step 2-3)**
   - Everything from bootstrap through error
   
3. **Network Request Details**
   - `/auth/refresh` POST request headers
   - Response body showing 403 error
   
4. **CSRF Value Comparison**
   - CSRF value from console logs
   - CSRF value in network x-csrf-token header
   - Do they match exactly?

5. **Backend Logs (if accessible)**
   - What CSRF validation is failing?
   - Is CSRF token being received?
   - Is it failing decode/validation?

## 🎯 Quick Checklist

- [ ] Cookies are being stored (see them in DevTools)
- [ ] CSRF token has a value (not empty)
- [ ] Console shows CSRF found successfully
- [ ] Network request includes x-csrf-token header
- [ ] Header value matches console value
- [ ] Still getting 403 even with matching values?

## 🚀 If Everything Looks Correct But Still Fails

It's likely a backend-side CSRF validation issue:
1. Backend might be checking a different CSRF storage (session vs cookie)
2. Backend might have a bug in CSRF validation
3. Server and client clocks might be out of sync
4. CSRF token might be expiring too fast
5. Backend might not be setting CSRF in initial OTP response

**Next step:** Check with backend team about CSRF validation logic.
