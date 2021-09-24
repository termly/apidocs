# Overview

Update existing custom consent themes. The request body will have this shape:

```JSON
{
  "account_id": "<string>",
  "website_id": "<string>",
  "id": "<string>",
  "name": "<string>",
  "font_family": "<string>",
  "font_size": "<string>",
  "color": "<string>",
  "background": "<string>",
  "btn_background": "<string>",
  "btn_text_color": "<string>"
}
```

The body must have 1 or more of these objects. Any attributes not passed in will not be changed.  Once created, the JSON must be passed as the request body

The response is an array of successful response objects or a [failure object](../error_object.md):

```JSON
[
  {}
]
```

Each object can represent either a success or a failure. A success response is a JSON object like this:


```JSON
{
  "account_id": "<string>",
  "website_id": "<string>",
  "id": "<string>",
  "name": "<string>",
  "font_family": "<string>",
  "font_size": "<string>",
  "color": "<string>",
  "background": "<string>",
  "btn_background": "<string>",
  "btn_text_color": "<string>"
}
```

An error response is detailed in [error object](../error_object.md#delete-PUT-put-error-object)

If the entire request is in error or invalid, the result JSON will be [request error object](../request_errors.md)

# Example 1

Update multiple themes in different websites.

## Request

```
PUT https://api.termly.io/v1/websites/custom_consent_theme
```

## Request Body

```JSON
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "name": "my theme",
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
    "name": "my theme",
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

```JSON
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "name": "my theme",
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
    "name": "my theme",
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

```JSON
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "name": "my theme",
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
    "name": "my theme",
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

```JSON
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "name": "my theme",
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