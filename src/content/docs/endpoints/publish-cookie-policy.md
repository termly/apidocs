---
title: Publish Cookie Policy
description: A guide on how to use the Publish Cookie Policy endpoint
---

## POST

When information in the cookie policy is changed it needs to be republished.  Information that is in the cookie policy.

* `company information` in the `/websites` endpoint
* `cookies`

```json
[
  {
    "account_id": "<string>",
    "website_id": "<string>"
  }
]
```

The body must have 1 or more of these objects.  Once created, the JSON must be passed as the request body.

The response is an array of success or error response objects with this shape:

```json
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "_idx": <integer>
  }
]
```

The shape of an error object is described [here](../../other/error-object#post-put-delete-error-object).

If the entire request is in error or invalid the result JSON will be [request error object](../../other/request-errors)

# Example 1

Request the cookie policy be published for a given website.

## Request

```http
POST https://api.termly.io/v1/websites/documents/publish_cookie_policies
```

## Query

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_123"
  }
]
```

## Response

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_123"
  }
]
```

# Example 2

Multiple accounts and websites to publish document or website cannot be found.

## Request

```http
GET https://api.termly.io/v1/websites/documents/publish_cookie_policies
```

## Query

```json
[
  {
    "account_id": "acct_123",
    "website_id": "web_123"
  },

  {
    "account_id": "acct_1234",
    "website_id": "web_1234"
  }
]
```

## Response

```json
[
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "_idx": 0
  },
  {
    "error": "object_not_found",
    "_idx": 1
  }
]
```
