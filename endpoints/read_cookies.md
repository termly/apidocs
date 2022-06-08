:warning: Endpoint is not yet implemented. Coming soon.

# Overview

Retrieve cookies. The query has the following shape:

## Request

```json
[
  {
    "account_id": "<string>",
    "website_id": "<string>"
  }
]
```

At least 1 object with the field account_id and website_id is required. Once the query is constructed, pass the URL encoded value in the query string parameter `query`.

## Paging

All GET requests are subject to paging, please refer to [Result Paging](../results_paging.md) for details, and the [Paging Parameters Object](../paging_parameters_object.md) for configuring the parameters.

# Response

The response has the following shape:

```json
{
	"results": [],
	"errors": [],
	"paging": {}
}
```

The results will contain zero or more of the following objects:

```json
{
  "account_id": "<string>",
  "category": "<enum{'unclassified', 'essential', 'performance', 'analytics;', 'advertising', 'social_networking'}>",
  "country": "<string>",
  "domain": "<string>",
  "de": "<string>",
  "en_uk": "<string>",
  "en_us": "<string>",
  "lifetime": "<string>",
  "fr": "<string>",
  "id": "<string>",
  "initiator": "<string>",
  "name": "<string>",
  "new": "<bool>",
  "party_provider_type": "<string>",
  "service": "<string>",
  "service_policy_link": "<string>",
  "source": "<string>",
  "tracker_type": "<enum{'http_cookie', 'html_local_storage', 'html_session_storage', 'server_cookie', 'pixel_tracker', 'indexed_db'}>",
  "url": "<string>",
  "value": "<string>",
  "website_id": "<string>"
}
```

- `account_id` is the unique identifier of the account
- `category` is the cookie category
- `country` is the country that sourced the cookie, based on a geoip lookup
- `domain` is the domain of the cookie
- `de` is the description in German
- `en_uk` is the description in UK English
- `en_us` is the description in US English
- `lifetime` is the length of time in seconds before the cookie is deleted from the browser
- `fr` is the description in French
- `id` is the unique identifier of the cookie
- `initiator`  is the url that sourced the cookie
- `name` is the name of the cookie
- `new` is a flag indicating whether the cookie was found on the most recent scan
- `party_provider_type`  is this a first-party or third-party cookie
- `service` is a value indicating the service that soured the cookie
- `service_policy_link` is a link to the service policy of the website
- `source` is the source of the cookie
- `tracker_type` is one of `http_cookie`, `html_local_storage`, `html_session_storage`, `server_cookie`, `pixel_tracker`, `indexed_db`
- `url` is the url of the cookie
- `value` is the cookie value
- `website_id` is the unique identifier of the website

# Example 1

Get one cookie.

## Request

`GET https://api.termly.io/v1/websites/cookies?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%20%0A%5D`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_1234"
  }
]
```

## Response

```json
{
  "results": [
    {
      "account_id": "acct_1234",
      "category": null,
      "country": "United States",
      "domain": "https://example.com",
      "de": null,
      "en_uk": null,
      "en_us": "Tracks the widget",
      "lifetime": "12345",
      "fr": null,
      "id": "ck_1234",
      "initiator": null,
      "name": "ACME Tracker",
      "new": false,
      "party_provider_type": "third_party",
      "service": null,
      "service_policy_link": null,
      "source": null,
      "tracker_type": "http_cookie",
      "url": "https://example.com/cisforcookie",
      "value": "that's good enough for me",
      "website_id": "web_1234"
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

Get multiple cookies.

## Request

`GET https://api.termly.io/v1/websites/cookies?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%20%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_5678%22%0A%20%20%7D%20%0A%5D%0A`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_1234"
  },
  {
    "account_id": "acct_1234",
    "website_id": "web_5678"
  }
]
```

## Response

```json
{
	"results": [
    {
      "account_id": "acct_1234",
      "category": null,
      "country": "United States",
      "domain": "https://example.com",
      "de": null,
      "en_uk": null,
      "en_us": "Tracks the widget",
      "lifetime": "12345",
      "fr": null,
      "id": "ck_1234",
      "initiator": null,
      "name": "ACME Tracker",
      "new": false,
      "party_provider_type": "third_party",
      "service": null,
      "service_policy_link": null,
      "source": null,
      "tracker_type": "http_cookie",
      "url": "https://example.com/cisforcookie",
      "value": "that's good enough for me",
      "website_id": "web_1234"
    },
    {
      "account_id": "acct_1234",
      "category": null,
      "country": "United States",
      "domain": "https://example.com",
      "de": null,
      "en_uk": null,
      "en_us": "Tracks the widget",
      "lifetime": "12345",
      "fr": null,
      "id": "ck_1234",
      "initiator": null,
      "name": "ACME Tracker",
      "new": false,
      "party_provider_type": "third_party",
      "service": null,
      "service_policy_link": null,
      "source": null,
      "tracker_type": "http_cookie",
      "url": "https://example.com/cisforcookie",
      "value": "that's good enough for me",
      "website_id": "web_5678"
    }
  ],
  "errors": [],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```

# Example 3

Get multiple cookies, one is not found.

## Request

`GET https://api.termly.io/v1/websites/cookies?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%20%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_5678%22%0A%20%20%7D%20%0A%5D`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_1234"
  },
  {
    "account_id": "acct_1234",
    "website_id": "web_5678"
  }
]
```

## Response

```json
{
	"results": [
    {
      "account_id": "acct_1234",
      "category": null,
      "country": "United States",
      "domain": "https://example.com",
      "de": null,
      "en_uk": null,
      "en_us": "Tracks the widget",
      "lifetime": "12345",
      "fr": null,
      "id": "ck_1234",
      "initiator": null,
      "name": "ACME Tracker",
      "new": false,
      "party_provider_type": "third_party",
      "service": null,
      "service_policy_link": null,
      "source": null,
      "tracker_type": "http_cookie",
      "url": "https://example.com/cisforcookie",
      "value": "that's good enough for me",
      "website_id": "web_1234"
    }
  ],
	"errors": [
    {
      "error": "object_not_found",
      "_idx": 1
    }
  ],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```
