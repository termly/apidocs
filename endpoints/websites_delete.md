# Overview

Delete an existing website from an account.  The request parameters are passed in as a JSON body:


```JSON
[
  {
    "account_id": "<string>",
    "id": "<string>"
  }
]
```

The body must have 1 or more request objects and will respond with the same number of success or [error objects](../error_object.md#delete-post-put-error-object). 

If the entire request is in error or invalid the result JSON will be [error object](../error_object.md#universal-error-object)


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
DELETE https://api.termly.io/v1/website
```

## Request Body

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
