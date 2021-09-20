# GET /domains/scan_report

## Query

### Parameters

Array of objects, each object contains:

- account_id: string
- website_id: string

### Example

### Sample JSON

```json
[
  {
    "account_id": "ACCT1",
    "website_id": "WEB1"
  }
]
```

#### Sample URI

`/api/v3/domains/scan_report?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22ACCT1%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22WEB1%22%0A%20%20%7D%0A%5D`

## Response

### Success

```json
{
  "results": [
    {
      "account_id": "string",
      "website_id": "string",
      "status": "string",
      "pages": "string",
      "cookies": [
        {
          "id": "string",
          "website_id": "string",
          "name": "string",
          "category": "unclassified",
          "tracker_type": "indexed_db",
          "country": "string",
          "domain": "string",
          "source": "string",
          "initiator": "string",
          "new": true,
          "en_us": "string",
          "en_uk": "string",
          "fr": "string",
          "de": "string",
          "url": "string",
          "value": "string",
          "service": "string",
          "service_policy_link": "string",
          "expire": "string",
          "party_provider_type": "string"
        }
      ],
      "scan_type": "string",
      "compliant_adequate_countries": true,
      "compliant_disclose_cookie": true,
      "scanned_domains": [
        "string"
      ],
      "screenshot_url": "string",
      "detected_consent_banner": true,
      "detected_cookie_category": true,
      "detected_cookie_preference": true,
      "scan_failure_message": "string"
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
