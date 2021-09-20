# GET /domains/banners

## Query

### Parameters

Array of objects, each object contains:

- account_id: string
- website_id: string

### Example

#### Sample JSON

```json
[
  {
    "account_id": "ACCT1",
    "website_id": "WEB1"
  },
  {
    "account_id": "ACCT1",
    "website_id": "WEB2"
  },
  {
    "account_id": "ACCT2",
    "website_id": "WEB3"
  }
]
```
#### Sample URI

`/api/v3/domains/banners?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22ACCT1%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22WEB1%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22ACCT1%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22WEB2%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22ACCT2%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22WEB3%22%0A%20%20%7D%0A%5D%0A`

## Response

### Success

```json
{
  "results": [
    {
      "id": "string",
      "display_style": "banner",
      "position": "bottom",
      "theme_color": "blue",
      "auto_accept_on_scroll": true,
      "display_consent_banner_by_region": true,
      "show_cookie_preference": true,
      "personalized_content": true,
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true,
      "website_id": "string",
      "account_id": "string"
    }
  ],
  "errors": [
    {
      "error": "string",
      "account_id": "string",
      "website_id": "string"
    }
  ],
  "paging": {
    "count": 0,
    "current_page": 0,
    "next_page": "string",
    "previous_page": "string",
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  }
}
```

### Error

#### 400

Bulk request exceeded limits. error: too_many_items

```json
{
  "error": "string",
  "_idx": "string"
}
```

#### 401

API Key is not correct or has been disabled. error: unauthorized

```json
{
  "error": "string",
  "_idx": "string"
}
```

#### 403

API Key is correct but the API key does not have permission to perform the requested action on 1 or more of the items in the request. error: forbidden

```json
{
  "error": "string",
  "_idx": "string"
}
```

#### 500

An unexpected error was encountered. error: server_error

```json
{
  "error": "string",
  "_idx": "string"
}
```
