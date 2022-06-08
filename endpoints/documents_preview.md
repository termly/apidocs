# Overview

Preview the documents for a website. If all the documents for the website should be retrieved then do not send the `ids` parameter. The request body takes this shape:

## Request

```JSON
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "ids": [
      "<string>"
    ]
  }
]
```

At least 1 object with an `account_id` must be provided.  If you would like to retrieve all of the websites in an account omit the `ids` parameter.  If `ids` is sent it must have 1 or more items. Once constructed the object must be URL encoded and be the value for the `query` parameter.

## Paging

All GET requests are subject to paging, please refer to [Result Paging](../results_paging.md) for details, and the [Paging Parameters Object](../paging_parameters_object.md) for configuring the parameters.

## Response

The response will look like:

```JSON
{
  "results": [],
  "errors": [],
  "paging": {}
}
```

`results` will be 0 or more objects with this shape:

```
{
  "account_id": "<string>",
  "website_id": "<string>",
  "id": "<string>",
  "document": "<string>"
}
```

* `account_id` unique identifier of the account that owns the website
* `website_id` unique identifier of the website that owns the document
* `id` unique identifier of the document
* `document` html document

`errors` will have 0 or more of the [error object](../error_object.md#get-errors).

`paging` is an object that indicates if there are more results to retrieve. Please see [paging](../results_paging.md)

# Example 1

Request the preview of all documents for a given website

## Request

```
GET https://api.termly.io/v1/websites/documents/preview?query=%5B%7B%22account_id%22%3A%20%22acct_1234%22%2C%22website_id%22%3A%20%22web_123%22%7D%5D
```

## Query

```JSON
[
  {
    "account_id": "acct_1234",
    "website_id": "web_123"
  }
]
```

## Response

```JSON
{
  "results": [
    {
      "account_id": "acct_123",
      "website_id": "web_123",
      "ids": "doc_123",
      "name": "cookie policy",
      "document": "<html>...</html>"
    },
    {
      "account_id": "acct_123",
      "website_id": "web_123",
      "ids": "doc_125",
      "name": "privacy policy",
      "document": "<html>...</html>"
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

Multiple accounts and documents in each account and one document cannot be found.

## Request

```
GET https://api.termly.io/v1/websites/documents/preview?query=%5B%20%7B%20%22account_id%22%3A%20%22acct_123%22%2C%20%22ids%22%3A%20%5B%22web_123%22%5D%7D%2C%20%7B%22account_id%22%3A%20%22acct_1234%22%2C%20%22ids%22%3A%20%5B%22web_13%22%2C%20%22web_14%22%5D%7D%5D
```

## Query

```JSON
[
  {
    "account_id": "acct_123",
    "website_id": "web_123",
    "ids": ["doc_123"]
  },

  {
    "account_id": "acct_1234",
    "website_id": "web_1234",
    "ids": ["doc_13", "doc_14"]
  }
]
```

## Response

```JSON
{
  "results": [
    {
      "account_id": "acct_123",
      "website_id": "web_123",
      "id": "doc_123",
      "name": "cookie policy",
      "document": "<html>...</html>"
    },
    {
      "account_id": "acct_1234",
      "website_id": "web_1234",
      "id": "doc_14",
      "name": "cookie policy",
      "document": "<html>...</html>"
    }
  ],
  "errors": [
    {
      "error": "document_not_found",
      "account_id": "acct_1234",
      "website_id": "web_1234",
      "id": "doc_13"
    }
  ],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```