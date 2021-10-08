When making requests to the Termly API, the host to use is `api.termly.io`. It is only accessible via `https`. Please note that your requests are made against a live account. If you need a test account for integration purposes, at this time please reach out to `support@termly.io` to ask for one to be setup.

# All Requests

All requests to `api.termly.io` must include the following two HTTP headers:

1. `X-Termly-Timestamp`
2. `Authorization`

## `X-Termly-Timestamp`

The value of `X-Termly-Timestamp` is a UTC timestamp with the following format (same as [GNU date](https://man7.org/linux/man-pages/man1/date.1.html)) `%Y%m%dT%H%M%SZ`.

```
X-Termly-Timestamp: 20201017T020928Z
```

We use `X-Termly-Timestamp` instead of the more common `Date` header to eliminate intermediary proxies from changing the value and to control the format precisely.

This timestamp is also used as part of the request processing pipeline. If the date isn't valid, we will not process the request. If the timestamp is valid and not within 15 minutes of the current time, the request will not be processed. The timestamp is also included in signatures.

## `Authorization`

The value for `Authorization` must be: 

```
Authorization: TermlyV1, PublicKey=<partner public key>, Signature=<calculated signature>
```

`PublicKey` is discussed in detail [here](keys.md). And `Signature` is discussed in detail [here](signature.md).

# GET requests

In addition to the 2 headers described above, a `GET` can be made with a `query` or `paging` query string parameter. These 2 keys are mutually exclusive. A `GET` request will be rejected if both are found.

Please see [query](query.md) and [paging](paging.md) for more information on those 2 parameters.

# DELETE requests

While similar to a `GET` (they both don't have a payload), a `DELETE` request may only have the `query` query string parameter. `DELETE` does not support paging. It will delete all records matching the `query`.

