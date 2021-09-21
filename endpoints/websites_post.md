# Overview

Create new websites in the given account. The query body will be JSON:

```JSON
[
  {
    "account_id": "<string>",
    "name": "<string>",
    "url": "<string>",
    "scan_period": "<string>",
    "subdomains": [
      "<string>"
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

The body must have 1 or more of these pobjects.  Once created the JSON must be passed as the request body

The resposne is an arry of object or a [failure object](../error_object.md):

```JSON
[
  {}
]
```

Each object can represent either a success or a failure. Success response is a JSON object like this:

```JSON
{
  "account_id": "<string>",
  "id": "<string>",
  "name": "<string>",
  "url": "<string>",
  "uuid": "<string>",
  "page_views": "<integer>",
  "scan_period": "<string>",
  "report": {
    "id": "<string>",
    "created_at": "<string>"
  },
  "subdomains": [
    "<string>"
  ],
  "cookie_count": "<integer>",
  "cookie_policy_document_id": "<string>",
  "unclassified_cookie_count": "<integer>",
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
  "consent_count": "<integer>",
  "code_snippet": {
    "banner": "<string>",
    "cookie_preference_button": "<string>"
  }
  "_idx": "<string>"
}
```

An error response is detailed in [error object](../error_object.md#delete-post-put-error-object)

If the entire request is in error or invalid the result JSON will be [error object i](../error_object.md#universal-error-object)

