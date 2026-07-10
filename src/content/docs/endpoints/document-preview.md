---
title: Document Preview
description: A guide on how to use the Document Preview endpoint
---

## GET

Preview the documents for a website. If all the documents for the website should be retrieved then do not send the `ids` parameter. Localization is supported via the `lang` parameter, which will retrieve the documents in that locale, if any. If no `lang` is provided, the request will default to American English `"en"`. The request body takes this shape:

## Request

```JSON
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "ids": [
      "<string>"
    ],
    "lang": "<string>"
  }
]
```

At least 1 object with an `account_id` must be provided.  If you would like to retrieve all of the documents for a website omit the `ids` parameter.  If `ids` is sent it must have 1 or more items. Once constructed the object must be URL encoded and be the value for the `query` parameter.

## Paging

All ```GET``` requests are subject to paging, please refer to [Result Paging](../../other/results-paging) for details.

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
  "name": "<string>",
  "document": "<string>",
  "code_snippet": "<string|null>"
}
```

* `account_id` unique identifier of the account that owns the website
* `website_id` unique identifier of the website that owns the document
* `id` unique identifier of the document
* `name` name of the document, for example `cookie policy`
* `document` html document
* `code_snippet` html markup that embeds the published document on a web page, or `null` if the account is not allowed to embed policies. See [Embedding a policy](#embedding-a-policy)

`errors` will have 0 or more of the [error object](../../other/error-object#get-errors).

`paging` is an object that indicates if there are more results to retrieve. Please see [paging](../../other/results-paging)

## Embedding a policy

The `document` field gives you the policy as raw HTML, which you render yourself. The `code_snippet` field is the alternative: paste it into a page and Termly renders the published policy for you, keeping it up to date automatically.

A `code_snippet` looks like this:

```html
<div name="termly-embed" data-id="8f2c1e4a-3b7d-4c19-9e5a-6d0f2b8c7a31"></div>
<script src="https://app.termly.io/embed-policy.min.js" async></script>
```

Paste both lines into the page where the policy should appear.

The script replaces the `<div>` with an iframe served from `https://app.termly.io`. If the page sends a `Content-Security-Policy` header, it must allow both the script and the frame:

```
script-src https://app.termly.io;
frame-src  https://app.termly.io;
```

Without `frame-src`, the script loads and the request succeeds, but the browser blocks the iframe and no policy appears.

### Prerequisite

`code_snippet` is only returned when the account is provisioned to embed policies. The website's `allowed_policy_embed_options` must include `"embed"`.

If it does not, the endpoint still succeeds and still returns the document, but `code_snippet` is `null`:

```JSON
{
  "account_id": "acct_123",
  "website_id": "web_123",
  "id": "doc_123",
  "name": "cookie policy",
  "document": "<html>...</html>",
  "code_snippet": null
}
```

A `null` here is a provisioning issue, not a request error. Nothing appears in `errors`. If a partner reports that the embed "does nothing", check this provision first.

### Where the `data-id` comes from

The `data-id` in the snippet is the document's UUID. It is the `id` field from the same response with the `doc_` prefix removed:

```
id       doc_8f2c1e4a-3b7d-4c19-9e5a-6d0f2b8c7a31
data-id      8f2c1e4a-3b7d-4c19-9e5a-6d0f2b8c7a31
```

Termly passes that UUID to the policy viewer, so it must match a published document.

Prefer using the `code_snippet` value as-is rather than assembling the two lines yourself. It already carries the correct script URL, and a `null` value tells you the account is not provisioned — a signal you lose by hand-building the markup.

For a document that has been localized, the snippet always refers to the original document rather than the translation. Requesting a preview with `lang` returns the localized `document` html alongside a `code_snippet` that is the same for every locale.

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
      "id": "doc_123",
      "name": "cookie policy",
      "document": "<html>...</html>",
      "code_snippet": "<div name=\"termly-embed\" data-id=\"123\"></div>\n<script src=\"https://app.termly.io/embed-policy.min.js\" async></script>\n"
    },
    {
      "account_id": "acct_123",
      "website_id": "web_123",
      "id": "doc_125",
      "name": "privacy policy",
      "document": "<html>...</html>",
      "code_snippet": "<div name=\"termly-embed\" data-id=\"125\"></div>\n<script src=\"https://app.termly.io/embed-policy.min.js\" async></script>\n"
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

Multiple accounts and documents in each account, one document cannot be found, and one account is not provisioned to embed policies so its `code_snippet` is `null`.

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
      "document": "<html>...</html>",
      "code_snippet": "<div name=\"termly-embed\" data-id=\"123\"></div>\n<script src=\"https://app.termly.io/embed-policy.min.js\" async></script>\n"
    },
    {
      "account_id": "acct_1234",
      "website_id": "web_1234",
      "id": "doc_14",
      "name": "cookie policy",
      "document": "<html>...</html>",
      "code_snippet": null
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

# Example 3

Request the French-localized preview of all documents for a given website

## Request

```
GET https://api.termly.io/v1/websites/documents/preview?query=%5B%7B%22account_id%22%3A%20%22acct_1234%22%2C%22website_id%22%3A%20%22web_123%22%2C%22lang%22%3A%20%22fr%22%7D%5D
```

## Query

```JSON
[
  {
    "account_id": "acct_1234",
    "website_id": "web_123",
    "lang": "fr"
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
      "name": "les cookie policy, hon hon hon",
      "document": "<html>...</html>",
      "code_snippet": "<div name=\"termly-embed\" data-id=\"123\"></div>\n<script src=\"https://app.termly.io/embed-policy.min.js\" async></script>\n"
    },
    {
      "account_id": "acct_123",
      "website_id": "web_123",
      "id": "doc_125",
      "name": "privacy policy",
      "document": "<html>...</html>",
      "code_snippet": "<div name=\"termly-embed\" data-id=\"125\"></div>\n<script src=\"https://app.termly.io/embed-policy.min.js\" async></script>\n"
    }
  ],
  "errors": [],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```