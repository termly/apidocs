# Overview

Deletes cookies. The request body has the following shape:

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
	"errors": [],
	"paging": {}
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

`DELETE /api/v3/websites/cookies`

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
	"errors": [],
	"paging": {
      "count": 1,
      "current_page": 1,
      "next_page": null,
      "previous_page": null,
      "per_page": 50,
      "total_count": 1,
      "total_pages": 1
    }
}
```

# Example 2

Delete multiple cookies.

## Request

`DELETE /api/v3/websites/cookies`

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
	"errors": [],
	"paging": {
      "count": 2,
      "current_page": 1,
      "next_page": null,
      "previous_page": null,
      "per_page": 50,
      "total_count": 2,
      "total_pages": 1
    }
}
```

# Example 3

Delete multiple cookies with one not found.

## Request

`DELETE /api/v3/websites/cookies`

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
    ],
	"paging": {
      "count": 1,
      "current_page": 1,
      "next_page": null,
      "previous_page": null,
      "per_page": 50,
      "total_count": 1,
      "total_pages": 1
    }
}
```
