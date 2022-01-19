:warning: Endpoint is not yet implemented. Coming soon.

# Overview

Delete an existing custom consent theme. The query has the following JSON shape:


```JSON
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "id": "<string>"
  }
]
```

The query must have 1 or more request objects and will respond with the same number of success or [error objects](../error_object.md#post-put-delete-error-object). Once constructed the object must be URL encoded and be the value for the `query` parameter.

If the entire request is in error or invalid, the result JSON will be a [request error](../request_errors.md).

# Example 1

Multiple deletion requests

## Request

```
DELETE https://api.termly.io/v1/website?query=%5B%7B%22account_id%22%3A%22acct_123%22%2C%22website_id%22%3A%22web_124%22%2C%22id%22%3A%22theme_123%22%7D%2C%7B%22account_id%22%3A%22acct_123%22%2C%22website_id%22%3A%22web_123%22%2C%22id%22%3A%22theme_12%22%7D%5D
```

## Query

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
DELETE https://api.termly.io/v1/website?query=%5B%7B%22account_id%22%3A%22acct_123%22%2C%22website_id%22%3A%22web_124%22%2C%22id%22%3A%22theme_123%22%7D%2C%7B%22account_id%22%3A%22acct_123%22%2C%22website_id%22%3A%22web_123%22%2C%22id%22%3A%22theme_12%22%7D%2C%7B%22account_id%22%3A%22acct_123%22%2C%22website_id%22%3A%22web_123%22%2C%22id%22%3A%22theme_123%22%7D%5D
```

## Query

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