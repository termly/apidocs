# Overview

Create a new custom consent theme for a website. The request body will be JSON:

```JSON
{
  "account_id": "<string>",
  "website_id": "<string>",
  "name": "<string>",
  "font_family": "<string>",
  "font_size": "<string>",
  "color": "<string>",
  "background": "<string>",
  "btn_background": "<string>",
  "btn_text_color": "<string>"
}
```

* `id` unique identifier for custom consent theme
* `website_id` unique identifier for website
* `account_id` unique identifier for account
* `name` name of the theme
* `font_family` font for theme
* `font_size` size of font (can be described in any CSS compatible why)
* `color` font color
* `background` background color
* `btn_background` button background color
* `btn_text_color` button text color

The body must have 1 or more of these objects.  Once created, the JSON must be passed as the request body.

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

An error response is detailed in [error object](../error_object.md#post-put-delete-error-object)

If the entire request is in error or invalid the result JSON will be [error object](../error_object.md#universal-errors)

# Example 1

## Request

```
POST https://api.termly.io/v1/websites/custom_consent_themes
```

## Body

```JSON
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "name": "my theme",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000000",
    "background": "#000000",
    "btn_background": "#000000",
    "btn_text_color": "#000000"
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
  }
]
```

# Example 2

Request for 2 different accounts

## Request

```
POST https://api.termly.io/v1/websites/custom_consent_themes
```

## Body

```JSON
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "name": "my theme",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000000",
    "background": "#000000",
    "btn_background": "#000000",
    "btn_text_color": "#000000"
  },
  {
    "website_id": "web_124",
    "account_id": "acct_23",
    "name": "my theme for website",
    "font_family": "Times New Roman",
    "font_size": "5pt",
    "color": "#000001",
    "background": "#000001",
    "btn_background": "#000001",
    "btn_text_color": "#000001"
  }  
]
```

## Response

```JSON
[
  {
    "website_id": "web_123",
    "account_id": "acct_123",
    "id": "cct_123",
    "name": "my theme",
    "font_family": "Times New Roman",
    "font_size": "4",
    "color": "#000000",
    "background": "#000000",
    "btn_background": "#000000",
    "btn_text_color": "#000000",
    "_idx": 0
  },
  {
    "website_id": "web_124",
    "account_id": "acct_23",
    "id": "cct_124",    
    "name": "my theme for website",
    "font_family": "Times New Roman",
    "font_size": "5pt",
    "color": "#000001",
    "background": "#000001",
    "btn_background": "#000001",
    "btn_text_color": "#000001",
    "_idx": 1
  }  
]
```