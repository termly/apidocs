# Overview

Retrieve all or some of the custom consent themes for a website.  The query has the following JSON shape:

## Request

```JSON
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "ids": {
      "<string>"
    }
  }
]
```

At least 1 object with an `account_id` and a `website_id` must be provided.  If you would like to retrieve all of the custom consent themes in a website omit the `ids` parameter.  if `ids` is sent it must have 1 or more items. Once constructed the object must be URL encoded and be the value for the `query` parameter.

## Paging

All GET requests are subject to paging, please refer to [Result Paging](../results_paging.md) for details, and the [Paging Parameters Object](../paging_parameters_object.md) for configuring the parameters.

## Response

The response will look like:

```JSON
{
  "results": [],
  "errors": [],
  "scrolling": {}
}
```

`results` will be 0 or more objects with this shape:

```JSON
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

* `id` unique identifier for custom consent theme
* `website_id` unique identifier for website
* `account_id` unique identifier for account
* `font_family` font for theme
* `font_size` size of font (can be described in any CSS compatible why)
* `color` font color
* `background` background color
* `btn_background` button background color
* `btn_text_color` button text color


`errors` will have 0 or more of the [error object](../error_object.md#get-errors).

`paging` is an object that indicates if there are more results to retrieve. Please see [paging](../results_paging.md)


# Example 1

Request all custom themes for a given website.

## Request

```
GET https://api.termly.io/v1/websites/custom_consent_themes?%5B%7B%20%22account_id%22%3A%20%22acct_123%22%2C%22website_id%22%3A%20%22web_123%22%2C%20%22ids%22%3A%20%5B%22theme_123%22%5D%7D%5D
```

## Query

```JSON
[
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "ids": ["cct_123"]
  }
]
```

## Response

```JSON
{
  "results": [
    {
      "id": "cct_123",
      "website_id": "web_123",
      "account_id": "acct_123",
      "font_family": "Times New Roman",
      "font_size": "4",
      "color": "#000000",
      "background": "#000000",
      "btn_background": "#000000",
      "btn_text_color": "#000000"
    }
  ],
  "errors": [],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```

# Example 2

Request a specific custom theme that does not exist

## Request

```
GET https://api.termly.io/v1/websites/custom_consent_themes?%5B%7B%20%22account_id%22%3A%20%22acct_123%22%2C%22website_id%22%3A%20%22web_123%22%2C%20%22ids%22%3A%20%5B%22theme_1234%22%5D%7D%5D
```

## Query

```JSON
[
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "ids": ["theme_1234"]
  }
]
```

## Response

```JSON
{
  "results": [],
  "errors": [
    {
      "error": "object_not_found",
      "account_id": "acct_1234",
      "website_id": "web_123",
      "id": "theme_1234"
    }
  ],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```
