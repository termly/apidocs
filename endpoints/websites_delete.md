# Overview

Delete an existing website from an account. The query has the following JSON shape:

```JSON
[
  {
    "account_id": "<string>",
    "id": "<string>"
  }
]
```

The query must have 1 or more request objects and will respond with the same number of success or [error objects](../error_object.md#post-put-delete-error-object). Once the JSON is constructed it is URL encoded and then is set to the value of the `query` parameter.

If the entire request is in error or invalid, the result JSON will be an [request error object](../request_errors.md).

# Example 1

Multiple deletion requests

## Request

```
DELETE https://api.termly.io/v1/websites?query=%5B%20%7B%22account_id%22%3A%20%22acct_123%22%2C%20%22id%22%3A%20%22web_1%22%7D%2C%20%7B%22account_id%22%3A%20%22acct_123%22%2C%20%22id%22%3A%20%22web_123%22%7D%5D
```

## Query

```JSON
[
  {
    "account_id": "acct_123",
    "id": "web_1"
  },
  {
    "account_id": "acct_123",
    "id": "web_123"
  }
]
```

## Response

```JSON
[
  {
    "_idx": 0,
    "error": "object_not_found"
  },
  {
    "account_id": "acct_123",
    "id": "web_123",
    "_idx": 1
  }
]
```

# Example 2

Multiple successful deletion requests from different accounts

## Request

```
DELETE https://api.termly.io/v1/websites?query=%5B%7B%20%22account_id%22%3A%20%22acct_1234%22%2C%22id%22%3A%20%22web_1234%22%7D%2C%7B%20%22account_id%22%3A%20%22acct_123%22%2C%20%22id%22%3A%20%22web_123%22%7D%5D
```

## Query

```JSON
[
  {
    "account_id": "acct_1234",
    "id": "web_1234"
  },
  {
    "account_id": "acct_123",
    "id": "web_123"
  }
]
```

## Response

```JSON
[
  {
    "account_id": "acct_1234",
    "id": "web_1234",
    "_idx": 0
  },
  {
    "account_id": "acct_123",
    "id": "web_123",
    "_idx": 1
  }
]
```
