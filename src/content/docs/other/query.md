---
title: Query
description: A guide on how to use the query parameter to select records on GET and DELETE requests
---

`query` is how a ```GET``` or ```DELETE``` request says which records it applies to. It is
a query string parameter whose value is a URL-encoded JSON array.

## Format

The decoded value is always an **array of objects**, even when you are asking for a single
record. Each object describes one lookup:

```json
[{ "account_id": "acct_1234" }]
```

URL-encoded, that becomes the value you actually send:

```http
GET https://api.termly.io/v1/websites?query=%5B%7B%22account_id%22%3A%22acct_1234%22%7D%5D
```

If the value is not valid JSON the request is rejected before any record is looked up.

## Batching

Include more than one object to look up several records in a single request:

```json
[
  { "account_id": "acct_1234", "website_id": "web_1234" },
  { "account_id": "acct_1234", "website_id": "web_5678" }
]
```

Each object is processed independently, so a batch can partially succeed. See
[Response status codes](/introduction/make-a-request#response-status-codes) for how that is
reported.

## Accepted keys

The keys an object may contain depend on the endpoint — a websites lookup accepts different
filters than a scan report lookup. Each endpoint page documents the shape it accepts, and
keys an endpoint does not recognise are ignored rather than rejected. If a filter appears to
have no effect, check it against that endpoint's documentation.

## Relationship to paging

`query` and `paging` are mutually exclusive, and a ```GET``` sent with both is rejected. Use
`query` for the first request — optionally with `limit` to set the page size — then use the
token in the response to request further pages. See
[Results Paging](/other/results-paging).

```DELETE``` supports `query` only. It deletes every record matching the query.

## Signing a request with a query

The `query` value is part of the signature. It appears as the fourth line of the canonical
request, URL-encoded exactly as it is sent on the wire — if the encoding changes after the
signature is calculated, validation fails. See [Signature](/other/signature).
