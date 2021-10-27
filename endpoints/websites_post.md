# Overview

Create new websites in the given account. The request body will be JSON:

```
[
  {
    "account_id": "<string>",
    "name": "<string{http(s) scheme required}>",
    "url": "<string>",
    "scan_period": "<enum{'weekly', 'monthly', 'trimonthly'}>",
    "subdomains": [
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

The body must have 1 or more of these objects.  Once created, the JSON must be passed as the request body.

The response is an array of success or error response objects with this shape:

```
[
  {
    "account_id": "<string>",
    "id": "<string>",
    "name": "<string>",
    "url": "<string>",
    "uuid": "<string>",
    "page_views": <integer>,
    "scan_period": "<enum{'weekly', 'monthly', 'trimonthly'}>",
    "report": {
      "id": "<string>",
      "created_at": "<string>"
    },
    "subdomains": [
      "<string>"
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
    "_idx": <integer>
  }
]
```

The shape of an error object is described [here](../error_object.md#post-put-delete-error-object).

If the entire request is in error or invalid the result JSON will be [request error object](../request_errors.md)


# Example 1

Request to create a single website

## Request

```
POST https://api.termly.io/v1/websites
```

## Request Body

```JSON
[
  {
    "account_id": "acct_123",
    "name": "termly",
    "url": "https://termly.io",
    "scan_period": "trimonthly",
    "subdomains": [
      "http://app.termly.io"
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

```JSON
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
    "_idx": 0
  }
]
```

# Example 2

Submit multiple websites one of which has a validation error

## Request

```
  POST https://api.termly.io/v1/websites
```

## Request Body

```JSON
[
  {
    "account_id": "acct_123",
    "name": "termly",
    "url": "https://termly.io",
    "scan_period": "trimonthly",
    "subdomains": [
      "http://app.termly.io"
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
    "name": "termly app",
    "url": "",
    "scan_period": "trimonthly",
    "subdomains": [
      "http://app.termly.io"
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

```JSON
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
    "_idx": 0
  },
  {
    "_idx": 1,
    "error": "validation_error",
    "validation_errors": [
      {
        "field": "url",
        "message": "cannot be blank"
      }
    ]
  }
]
```