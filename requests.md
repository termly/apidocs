When making requests to the Termly API, the host to use is `api.termly.io`. It is only accessible via `https`. Please note that your requests are made against a live account. If you need a test account for integration purposes, at this time please reach out to `support@termly.io` to ask for one to be setup.

All requests to `api.termly.io` must include the following two HTTP headers:

1. `X-Termly-Timestamp`
2. `Authorization`

# `X-Termly-Timestamp`

The value of `X-Termly-Timestamp` is a UTC timestamp with the following format (same as [GNU date](https://man7.org/linux/man-pages/man1/date.1.html)) `%Y%m%dT%H%M%SZ`.

```
X-Termly-Timestamp: 20201017T020928Z
```

We use `X-Termly-Timestamp` instead of the more common `Date` header to eliminate intermediary proxies from changing the value and to control the format precisely.

This timestamp is also used as part of the request processing pipeline. If the date isn't valid, we will not process the request. If the timestamp is valid and not within 15 minutes of the current time, the request will not be processed. The timestamp is also included in signatures.

# `Authorization`

The value for `Authorization` must be: 

```
Authorization: TermlyV1, PublicKey=<partner public key>, Signature=<calculated signature>
```

`PublicKey` is discussed in detail [here](keys.md). And `Signature` is discussed in detail [here](signature.md).
