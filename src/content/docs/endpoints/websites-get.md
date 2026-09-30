---
title: Get Websites API Endpoint
description: A guide on how to use the Websites endpoint
---

## Get Websites API Endpoint

**URL**: `/v1/websites`  
**Method**: `GET`

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_id` | `string` | ✅ | The public ID of the account/user making the request |
| `ids` | `array[string]` | ❌ | Array of specific website IDs to retrieve. If not provided, returns all websites for the account |
| `domain` | `string` | ❌ | Filter websites by domain |

### Request Body Structure

```json
[
  {
    "account_id": "acct_1234567890",
    "ids": ["web_abc123", "web_def456"],
    "domain": "example.com"
  }
]
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | ✅ | JSON-encoded request body containing the `json` array |
| `limit` | `integer` | ❌ | Maximum number of results to return (default: `20`, maximum: `20`) |
| `paging` | `object` | ❌ | Pagination parameters for cursor-based pagination |

Values above `20` are capped at `20`. Values of `0` or below return `1` result. Non-integer values use the default.

### Response Structure

```json
{
  "results": [
    {
      "id": "web_abc123",
      "name": "Example Website",
      "url": "https://example.com",
      "status": "active",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z",
      ...
    }
  ],
  "errors": [],
  "paging": {...}
}
```

### Error Responses

| Error Code | Description |
|------------|-------------|
| `account_not_found` | The provided `account_id` does not exist |
| `website_not_found` | One or more specified website IDs do not exist |
| `website_public_id_invalid` | Invalid format for website public ID |
| `json_is_invalid` | Invalid JSON in the request body |

### Paging

All ```GET``` requests are subject to paging, please refer to [Result Paging](../../other/results-paging) for details.

#### Response Details

The response will look like:

```json
{
  "results": [],
  "errors": [],
  "paging": {}
}
```

`errors` will have 0 or more of the [error object](../../other/error-object#get-errors).

`paging` is an object that indicates if there are more results to retrieve. Please see [paging](../../other/results-paging)

`results` will be 0 or more objects with this shape:

```json
{
  "account_id": "<string>",
  "id": "<string>",
  "name": "<string>",
  "url": "<string>",
  "page_views": <integer>,
  "scan_period": "<enum{'disabled', 'weekly', 'monthly', 'trimonthly'}>",
  "report": {
    "id": "<string>",
    "created_at": "<string>"
  },
  "subdomains": [
    "<string{http(s) scheme required}>"
  ],
  "additional_scan_urls": [
    "<string{http(s) scheme required}>"
  ],
  "cookie_count": <integer>,
  "cookie_policy_document_id": "<string>",
  "unclassified_cookie_count": <integer>,
  "company": {
    "legal_name": "<string>",
    "email": "<string>",
    "phone": "<string>",
    "fax": "<string>",
    "address": "<string>",
    "zip": "<string>",
    "state": "<string>",
    "city": "<string>",
    "country": "<string>"
  },
  "consent_count": <integer>,
  "code_snippet": {
    "banner": "<string>",
    "cookie_preference_button": "<string>"
  },
  "api_key": "<string>"
}
```

* `account_id` unique identifier of the account that owns the website
* `id` unique identifier of the website
* `name` name of the website
* `url` url of the website including http protocol
* `page_views` number of page views that this site has had with the termly banner installed
* `scan_period` how often the website will be scanned (on of `weekly`, `monthly`, `trimonthly`)
* `report` object describing the latest successful scan result
  * `id` unique identifier for the report
  * `created_at` timestamp of when the report was created
* `subdomains` an array of subdomains that the scanner will scan as well
  * **Note: This field is deprecated. Please use `additional_scan_urls` instead.**
  * items are strings
  * http/https scheme is required
  * Must be a subdomain of the 'url' field
* `additional_scan_urls` an array of urls that the scanner will scan as well. This allows you to ensure a specific page is scanned.
  * items are strings
  * http/https scheme is required
  * Must be a subdomain of, or match the domain in, the 'url' field
* `cookie_count` total number of cookies found
* `cookie_policy_document_id` unique identifier of the cookie policy document
* `company` object containing all the company related information
  * `legal_name` legal name of the company
  * `email` public contact email for the company
  * `phone` public phone number for the company
  * `fax` company fax number
  * `address` street address of the company
  * `zip` zip code for the company
  * `state` state
  * `city` city
  * `country` country
* `consent_count` number of users who have consented to cookies
* `code_snippet` object that contains JavaScript snippets to install termly on the website
  * `banner` JavaScript snippet to install the banner on the website
    * Note: The auto blocker is enabled by default with `autoBlock=on` in the snippet. It may be manually disabled by changing the snippet to `autoBlock=off`
  * `cookie_preference_button` JavaScript snippet to install the preferences button on the website
* `api_key` WordPress API key of the website

### Example 1

Request all websites for a given account

#### Body

```json
[
  {
    "account_id": "acct_1234"
  }
]
```

### Example 2

Multiple accounts and websites in each account and one website cannot be found

#### Body

```json
[
  {
    "account_id": "acct_123",
    "ids": ["web_123"]
  },

  {
    "account_id": "acct_1234",
    "ids": ["web_13", "web_14"]
  }
]
```

### Example 3

Request with `ids` parameter but value is empty array

#### Body

```json
[
  {
    "account_id": "acct_123",
    "ids": []
  }
]
```

This would result in an error response

```json
{
  "results": [],
  "errors": [
    {
      "_idx": 0,
      "error": "validation_error",
      "validation_errors": [
        {
          "field": "ids",
          "message": "is_missing"
        }
      ]
    }
  ],
  "paging": {}
}
```

### Example 4

Request with `domain` parameter

#### Body

```json
[
  {
    "account_id": "acct_123",
    "domain": "example.com"
  }
]
```

This would result in a response containing websites for all domains and subdomains for `example.com`.
Note that the value of some fields in the result objects (websites) have been removed to reduce clutter in the example.

```json
{
  "results": [
    {
      "account_id": "acct_123",
      "code_snippet": {
          "banner": "",
          "cookie_preference_button": ""
      },
      "company": null,
      "consent_count": 0,
      "cookie_count": 0,
      "cookie_policy_document_id": null,
      "id": "web_0228b3ea-edc7-44e2-b9e1-69ehhe46db8d",
      "name": "docs",
      "page_views": 0,
      "report": {
          "id": null,
          "created_at": null
      },
      "scan_period": "disabled",
      "subdomains": [],
      "additional_scan_urls": [],
      "unclassified_cookie_count": 0,
      "url": "https://example.com",
      "uuid": "0228b3ea-edc7-44e2-b9e1-69ehhe46db8d",
      "api_key": ""
    },
    {
      "account_id": "acct_123",
      "code_snippet": {
          "banner": "",
          "cookie_preference_button": ""
      },
      "company": null,
      "consent_count": 0,
      "cookie_count": 0,
      "cookie_policy_document_id": null,
      "id": "web_1ert70gg-d313-4b2d-9ch0-v4b29f41ec2c",
      "name": "Test",
      "page_views": 0,
      "report": {
          "id": null,
          "created_at": null
      },
      "scan_period": "disabled",
      "subdomains": [],
      "additional_scan_urls": [],
      "unclassified_cookie_count": 0,
      "url": "https://info.termly.io",
      "uuid": "1ert70gg-d313-4b2d-9ch0-v4b29f41ec2c",
      "api_key": ""
  }
  ],
  "errors": [],
  "paging": {}
}
```
