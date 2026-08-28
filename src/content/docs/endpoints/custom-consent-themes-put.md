---
title: Custom Consent Themes
description: A guide on how to use the Custom Consent Themes endpoint
---

## PUT

Update existing custom consent themes. The request body will have this shape:

```json
{
  "account_id": "<string>",
  "website_id": "<string>",
  "id": "<string>",
  "font_family": "<string>",
  "font_size": "<string>",
  "color": "<string>",
  "background": "<string>",
  "btn_background": "<string>",
  "btn_text_color": "<string>"
}
```

The body must have 1 or more of these objects. Any attributes not passed in will not be changed.  Once created, the JSON must be passed as the request body

The response is an array of successful response objects or a [failure object](../../other/error-object):

```json
[
  {}
]
```

Each object can represent either a success or a failure. A success response is a JSON object like this:

```json
{
  "account_id": "<string>",
  "website_id": "<string>",
  "id": "<string>",
  "font_family": "<string>",
  "font_size": "<string>",
  "color": "<string>",
  "background": "<string>",
  "btn_background": "<string>",
  "btn_text_color": "<string>"
}
```

An error response is detailed in [error object](../../other/error-object#delete-PUT-put-error-object)

If the entire request is in error or invalid, the result JSON will be [request error object](../../other/request-errors)

# Example 1

Update multiple themes in different websites.

## Request

```http
PUT https://api.termly.io/v1/websites/custom_consent_themes
```

## Request Body

```json
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "id": "cct_123",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000000",
    "background": "#000000",
    "btn_background": "#000000",
    "btn_text_color": "#000000"
  },
  {
    "website_id": "web_125",
    "account_id": "acct_123",
    "id": "cct_122",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000100",
    "background": "#000100",
    "btn_background": "#400000",
    "btn_text_color": "#030000"
  }
]
```

## Response

```json
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "id": "cct_123",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000000",
    "background": "#000000",
    "btn_background": "#000000",
    "btn_text_color": "#000000",
    "_idx": 0
  },
  {
    "website_id": "web_125",
    "account_id": "acct_123",
    "id": "cct_122",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000100",
    "background": "#000100",
    "btn_background": "#400000",
    "btn_text_color": "#030000",
    "_idx": 1
  }
]
```

# Example 2

Multiple request one of which references a nonexistent account.

## Request Body

```json
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "id": "cct_123",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000000",
    "background": "#000000",
    "btn_background": "#000000",
    "btn_text_color": "#000000"
  },
  {
    "website_id": "web_125",
    "account_id": "acct_12323",
    "id": "cct_122",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000100",
    "background": "#000100",
    "btn_background": "#400000",
    "btn_text_color": "#030000"
  }
]
```

## Response

```json
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "id": "cct_123",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000000",
    "background": "#000000",
    "btn_background": "#000000",
    "btn_text_color": "#000000",
    "_idx": 0
  },
  {
    "error": "object_not_found",
    "_idx": 1
  }
]
```
