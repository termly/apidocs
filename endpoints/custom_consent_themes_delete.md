# Overview

Delete an existing custom consent theme. The request parameters are passed in as a JSON body:


```JSON
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "id": "<string>"
  }
]
```

The body must have 1 or more request objects and will respond with the same number of success or [error objects](../error_object.md#post-put-delete-error-object). 

If the entire request is in error or invalid, the result JSON will be an [error object](../error_object.md#universal-errors).

# Example 1

Multiple deletion requests

## Request

```
DELETE https://api.termly.io/v1/website
```

## Request Body

```JSON
[
  {
    "account_id": "acct_123",
    "website_id": "web_124",
    "id": "theme_123"
  },
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "id": "theme_12"
  }
]
```


## Response

```JSON
[
  {
    "account_id": "acct_123",
    "website_id": "web_124",
    "id": "theme_123"
    "_idx": 0
  },
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "id": "theme_12"
    "_idx": 1
  }
]
```

# Example 2

Multiple requests with one failure

## Request

```
DELETE https://api.termly.io/v1/website
```

## Request Body

```JSON
[
  {
    "account_id": "acct_123",
    "website_id": "web_124",
    "id": "theme_123"
  },
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "id": "theme_12"
  },
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "id": "theme_123"
  }
]
```


## Response

```JSON
[
  {
    "account_id": "acct_123",
    "website_id": "web_124",
    "id": "theme_123"
    "_idx": 0,
  },
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "id": "theme_12",
    "_idx": 1
  },
  {
    "error": "object_not_found",
    "_idx": 2
  }
]
```