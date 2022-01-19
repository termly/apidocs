# Overview

Deletes cookies. The query has the following shape:

```json
[
  {
    "account_id": "<string>",
    "id": "<string>",
    "website_id": "<string>"
  }
]
```

- `account_id` is the unique identifier of the account
- `id` is the unique identifier of the cookie
- `website_id` is the unique identifier of the website

At least 1 object with the field account_id and website_id is required.

The response has the following shape:

```json
{
	"results": [],
	"errors": []
}
```

The results will contain zero or more of the following objects:

```json
{
  "account_id": "<string>",
  "id": "<string>",
  "website_id": "<string>"
}
```

# Example 1

Delete one cookie.

## Request

`DELETE https://api.termly.io/v1/websites/cookies?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22id%22%3A%20%22ck_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%0A%5D`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "id": "ck_1234",
    "website_id": "web_1234"
  }
]
```

## Response

```json
{
	"results": [
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_1234",
        "website_id": "web_1234",
        "_idx": 1
      }    
    ],
	"errors": []
}
```

# Example 2

Delete multiple cookies.

## Request

`DELETE https://api.termly.io/v1/websites/cookies?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22id%22%3A%20%22ck_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22id%22%3A%20%22ck_0123%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%0A%5D%0A`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "id": "ck_1234",
    "website_id": "web_1234"
  },
  {
    "account_id": "acct_1234",
    "id": "ck_0123",
    "website_id": "web_1234"
  }
]
```

## Response

```json
{
	"results": [
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_1234",
        "website_id": "web_1234",
        "_idx": 0
      },    
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_0123",
        "website_id": "web_1234",
        "_idx": 1
      }    
    ],
	"errors": []
}
```

# Example 3

Delete multiple cookies with one not found.

## Request

`DELETE https://api.termly.io/v1/websites/cookies?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22id%22%3A%20%22ck_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22id%22%3A%20%22ck_0123%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%0A%5D%0A`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "id": "ck_1234",
    "website_id": "web_1234"
  },
  {
    "account_id": "acct_1234",
    "id": "ck_0123",
    "website_id": "web_1234"
  }
]
```

## Response

```json
{
	"results": [
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_1234",
        "website_id": "web_1234",
        "_idx": 0
      }    
    ],
	"errors": [
      {
        "error": "object_not_found",
        "_idx": 1
      }
    ]
}
```
