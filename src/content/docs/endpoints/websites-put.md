---
title: Websites
description: A guide on how to use the Websites endpoint
---
## PUT

Update an existing websites in the given account. The request body will be JSON:

```json
[
  {
    "account_id": "<string>",
    "id": "<string>",
    "name": "<string>",
    "url": "<string{http(s) scheme required}>",
    "scan_period": "<enum{'weekly', 'monthly', 'trimonthly'}>",
    "subdomains": [  # deprecated. Use `additional_scan_urls`
      "<string{http(s) scheme required}>"
    ],
    "additional_scan_urls": [
      "<string{http(s) scheme required}>"
    ],
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
    }
  }
]
```

**Note: The `subdomains` field is deprecated. Please use `additional_scan_urls` instead.**

The body must have 1 or more of these objects. Any attributes not passed in will not be changed.  Once created, the JSON must be passed as the request body

The response is an array of success or error response objects

```json
[
  {
    "account_id": "<string>",
    "id": "<string>",
    "name": "<string>",
    "url": "<string>",
    "uuid": "<string>",
    "page_views": <integer>,
    "scan_period": "<enum{'disabled', 'weekly', 'monthly', 'trimonthly'}>",
    "report": {
      "id": "<string>",
      "created_at": "<string>"
    },
    "subdomains": [
      "<string>"
    ],
    "additional_scan_urls": [
      "<string>",
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
    "api_key": "<string>",
    "_idx": "<string>"
  }
]
```

An error response is detailed in [error object](../../other/error-object#delete-PUT-put-error-object)

If the entire request is in error or invalid, the result JSON will be [request error object](../../other/request-errors)

# Example 1

Request to update a single website

## Request

```http
PUT https://api.termly.io/v1/websites
```

## Request Body

```json
[
  {
    "account_id": "acct_123",
    "id": "web_123",
    "name": "termly",
    "url": "https://termly.io",
    "scan_period": "trimonthly",
    "subdomains": [
      "http://app.termly.io"
    ],
    "additional_scan_urls": [
      "https://app.termly.io/user/login"
    ],
    "company": {
      "legal_name": "termly",
      "email": "termly@termly.io",
      "phone": "1112223333",
      "fax": "1112223344",
      "address": "522 W. Riverside Ave.,Suite 4296",
      "zip": "99201",
      "state": "WA",
      "city": "Spokane",
      "country": "USA"
    }
  }
]
```

## Response

```json
[
  {
    "account_id": "acct_123",
    "id": "web_123",
    "name": "termly",
    "url": "https://termly.io",
    "uuid": "85b7c541-50b6-400f-9a63-c91912442421",
    "page_views": 0,
    "scan_period": "trimonthly",
    "report": {
      "id": "rep_123",
      "created_at": "2021-09-21 01:58:53.721954 UTC"
    },
    "subdomains": [
      "http://app.termly.io"
    ],
    "additional_scan_urls": [
      "http://app.termly.io/user/login"
    ],
    "cookie_count": 0,
    "cookie_policy_document_id": "doc_123",
    "unclassified_cookie_count": 0,
    "company": {
      "legal_name": "termly",
      "email": "termly@termly.io",
      "phone": "1112223333",
      "fax": "1112223344",
      "address": "522 W. Riverside Ave.,Suite 4296",
      "zip": "99201",
      "state": "WA",
      "city": "Spokane",
      "country": "USA"
    },
    "consent_count": 0,
    "code_snippet": {
      "banner": "<Javascript code>",
      "cookie_preference_button": "<Javascript code>"
    },
    "api_key": "abcdefg",
    "_idx": 0
  }
]
```

# Example 2

Submit multiple websites, one of which does not exist.

## Request

```http
  PUT https://api.termly.io/v1/websites
```

## Request Body

```json
[
  {
    "account_id": "acct_123",
    "id": "web_123",
    "name": "termly",
    "url": "https://termly.io",
    "scan_period": "trimonthly",
    "subdomains": [
      "http://app.termly.io"
    ],
    "additional_scan_urls": [
      "http://app.termly.io/user/login"
    ],
    "company": {
      "legal_name": "termly",
      "email": "termly@termly.io",
      "phone": "1112223333",
      "fax": "1112223344",
      "address": "522 W. Riverside Ave.,Suite 4296",
      "zip": "99201",
      "state": "WA",
      "city": "Spokane",
      "country": "USA"
    }
  },
  {
    "account_id": "acct_124",
    "id": "web_1234",
    "name": "termly app",
    "url": "https://termly.io",
    "scan_period": "trimonthly",
    "subdomains": [
      "http://app.termly.io"
    ],
    "additional_scan_urls": [
      "http://app.termly.io/user/login"
    ],
    "company": {
      "legal_name": "termly",
      "email": "termly@termly.io",
      "phone": "1112223333",
      "fax": "1112223344",
      "address": "522 W. Riverside Ave.,Suite 4296",
      "zip": "99201",
      "state": "WA",
      "city": "Spokane",
      "country": "USA"
    }
  }
]
```

## Response

```json
[
  {
    "account_id": "acct_123",
    "id": "web_123",
    "name": "termly",
    "url": "https://termly.io",
    "uuid": "85b7c541-50b6-400f-9a63-c91912442421",
    "page_views": 0,
    "scan_period": "trimonthly",
    "report": {
      "id": "rep_123",
      "created_at": "2021-09-21 01:58:53.721954 UTC"
    },
    "subdomains": [
      "http://app.termly.io"
    ],
    "additional_scan_urls": [
      "http://app.termly.io/user/login"
    ],
    "cookie_count": 0,
    "cookie_policy_document_id": "doc_123",
    "unclassified_cookie_count": 0,
    "company": {
      "legal_name": "termly",
      "email": "termly@termly.io",
      "phone": "1112223333",
      "fax": "1112223344",
      "address": "522 W. Riverside Ave.,Suite 4296",
      "zip": "99201",
      "state": "WA",
      "city": "Spokane",
      "country": "USA"
    },
    "consent_count": 0,
    "code_snippet": {
      "banner": "<Javascript code>",
      "cookie_preference_button": "<Javascript code>"
    },
    "api_key": "abcdefg",
    "_idx": 0
  },
  {
    "_idx": 1,
    "error": "object_not_found"
  }
]
```
