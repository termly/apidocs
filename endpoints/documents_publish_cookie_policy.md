# Overview

When information in the cookie policy is changed it needs to be republished.  Information that is in the cookie policy.

* `company information` in the `/websites` endpoint
* `cookies`

```JSON
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "ids": [
      "<string>"
    ]
  }
]
```

The body must have 1 or more of these objects.  Once created, the JSON must be passed as the request body.

The response is an array of success or error response objects with this shape:

```
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "_idx": <integer>
  }
]
```

The shape of an error object is described [here](../error_object.md#post-put-delete-error-object).

If the entire request is in error or invalid the result JSON will be [request error object](../request_errors.md)


# Example 1

Request the cookie policy be published for a given website.

## Request

```
POST https://api.termly.io/v1/websites/documents/publish_cookie_policies
``` 

## Query

```JSON
[
  {
    "account_id": "acct_1234",
    "website_id": "web_123"
  }
]
```

## Response

```JSON
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

```
GET https://api.termly.io/v1/websites/documents/publish_cookie_policies
``` 

## Query

```JSON
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

```JSON
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