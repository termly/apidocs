# Overview

Retrieve all or some of the websites in an account for the specified query.  The query has the following JSON shape:

```JSON
[
  {
    "account_id": "<string>",
    "ids": {
      "<string>"
    }
  }
]
```


At least 1 object with an `account_id` must be provided.  If you would like to retrieve all of the websites in an account omit the `ids` parameter.  if `ids` is sent it must have 1 or more items. Once constructed the object must be URL encoded and be the value for the `query` parameter.

The response will look like:

```JSON
{
  "results": [],
  "errors": [],
  "paging": {}
}
```

`results` will be 0 or more objects with this shape:

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
}
```

* `account_id` unique identifier of the account that owns the website
* `id` unique identifier of the website
* `name` name of the website
* `url` url of the website including http protocol
* `uuid` unique identifier used by the `code snippets` to identify the website
* `page_views` number of page views that this site has had with the termly banner installed
* `scan_period` howe often the website will be scanned
* `report` object describing the latest scan results
  * `id` unique identifier for the report
  * `created_at` timestamp of when the report was created
* `subdomains` an array of subdomains that the scanner should scan as ell
  * items should be strings
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
* `code_snippet` object that contains Javascript snippets to install termly on the website
    * `banner` Javascript snippet to install the banner on the website
    * `cookie_preference_button` Javascript snippet to install the preferences button on the website


`errors` will have 0 or more of the [error object](../error_object.md).

`paging` is an object that indicates if there are more results to retrieve. Please see [paging](../paging_object.md)

# Example 1

Request all websites for a given account

## Request

```
GET https://api.termly.io/v1/websites?query=%5B%7B%22account_id%22%3A%20%22acct_1234%22%7D%5D
``` 

## Query

```JSON
[
  {
    "account_id": "acct_1234"
  }
]
```

## Response

```JSON
{
  "results": [
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
        "app.termly.io"
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
      }
    }
  ],
  "errors": [],
  "paging": {
    "count": 1,
    "current_page": 1,
    "next_page": null,
    "previous_page": null,
    "per_page": 25,
    "total_count": 1,
    "total_pages": 1
  }
}
```

# Example 2

multiple accounts and websites in each account and one website cannot be found

## Request

```
GET https://api.termly.io/v1/websites?query=%5B%20%7B%20%22account_id%22%3A%20%22acct_123%22%2C%20%22ids%22%3A%20%5B%22web_123%22%5D%7D%2C%20%7B%22account_id%22%3A%20%22acct_1234%22%2C%20%22ids%22%3A%20%5B%22web_13%22%2C%20%22web_14%22%5D%7D%5D
``` 

## Query

```JSON
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

## Response

```JSON
{
  "results": [
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
        "app.termly.io"
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
      }
    },
    {
      "account_id": "acct_1234",
      "id": "web_13",
      "name": "termly 2",
      "url": "https://termly.io",
      "uuid": "85b7c541-50b6-400f-9a63-c91912442421",
      "page_views": 0,
      "scan_period": "trimonthly",
      "report": {
        "id": "rep_123",
        "created_at": "2021-09-21 01:58:53.721954 UTC"
      },
      "subdomains": [
        "app.termly.io"
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
      }
    }
  ],
  "errors": [
    {
      "error": "object_not_found",
      "account_id": "acct_1234",
      "id": "web_13"
    }
  ],
  "paging": {
    "count": 1,
    "current_page": 1,
    "next_page": null,
    "previous_page": null,
    "per_page": 25,
    "total_count": 1,
    "total_pages": 1
  }
}
```