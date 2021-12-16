# Overview

Creates cookies. The request body has the following shape:

```json
{
  "account_id": "<string>",
  "category": "<enum{'unclassified', 'essential', 'performance', 'analytics;', 'advertising', 'social_networking'}>",
  "country": "<string>",
  "domain": "<string>",
  "de": "<string>",
  "en_uk": "<string>",
  "en_us": "<string>",
  "fr": "<string>",
  "initiator": "<string>",
  "name": "<string>",
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
- `fr` is the description in French
- `initiator`  is the url that sourced the cookie
- `name` is the name of the cookie
- `service` is a value indicating the service that soured the cookie
- `service_policy_link` is a link to the service policy of the website
- `source` is the source of the cookie
- `tracker_type` is one of `http_cookie`, `html_local_storage`, `html_session_storage`, `server_cookie`, `pixel_tracker`, `indexed_db`
- `url` is the url of the cookie
- `value` is the cookie value
- `website_id` is the unique identifier of the website

At least 1 object with the field account_id and website_id is required.

The response has the following shape:

```json
{
	[]
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
  "fr": "<string>",
  "initiator": "<string>",
  "name": "<string>",
  "service": "<string>",
  "service_policy_link": "<string>",
  "source": "<string>",
  "tracker_type": "<enum{'http_cookie', 'html_local_storage', 'html_session_storage', 'server_cookie', 'pixel_tracker', 'indexed_db'}>",
  "url": "<string>",
  "value": "<string>",
  "website_id": "<string>"
  "_idx": <integer>
}
```

If one of the collaborators cannot be updated, the object will be an [error object](../error_object.md). If the error is a validation error, there will be a field called [validation errors](../validation_error_object.md).

# Example 1

Creates a single cookie for a single website.

## Request

POST `https://api.termly.io/v1/websites/cookies`

## Request Body

```json
[
  {
    "account_id": "acct_1234",
    "category": null,
    "country": "United States",
    "domain": "https://example.com",
    "de": null,
    "en_uk": null,
    "en_us": "Tracks the widget",
    "fr": null,
    "initiator": null,
    "name": "ACME Tracker",
    "service": null,
    "service_policy_link": null,
    "source": null,
    "tracker_type": "http_cookie",
    "url": "https://example.com/cisforcookie",
    "value": "that's good enough for me",
    "website_id": "web_1234"
  }
]
```

## Response

```json
[
    {
        "account_id": "acct_1234",
        "id": "ck_1234",
        "website_id": "web_1234",
        "_idx": 0
    }
]
```

# Example 2

Creates multiple cookies for multiple websites.

## Request

POST `https://api.termly.io/v1/websites/cookies`

## Request Body

```json
[
  {
    "account_id": "acct_1234",
    "country": "United States",
    "domain": "https://example.com",
    "en_us": "Tracks the widget",
    "name": "ACME Tracker",
    "tracker_type": "http_cookie",
    "url": "https://example.com/cisforcookie",
    "value": "that's good enough for me",
    "website_id": "web_1234"
  },
  {
    "account_id": "acct_1234",
    "country": "United States",
    "domain": "https://example.com",
    "en_us": "Tracks the widget",
    "fr": null,
    "name": "ACME Tracker",
    "tracker_type": "http_cookie",
    "url": "https://example.com/cisforcookie",
    "value": "that's good enough for me",
    "website_id": "web_0987"
  },
  {
    "account_id": "acct_4567",
    "country": "United States",
    "domain": "https://example.com",
    "en_us": "Tracks the widget",
    "name": "ACME Tracker",
    "tracker_type": "http_cookie",
    "url": "https://example.com/cisforcookie",
    "value": "that's good enough for me",
    "website_id": "web_4567"
  }
]
```

## Response

```json
[
  {
    "account_id": "acct_1234",
    "id": "ck_1234",
    "website_id": "web_1234",
    "_idx": 1
  },
  {
    "account_id": "acct_1234",
    "id": "ck_1235",
    "website_id": "web_0987",
    "_idx": 2
  },
  {
    "account_id": "acct_4567",
    "id": "ck_1236",
    "website_id": "web_4567",
    "_idx": 3
  }
]
```

# Example 3

Creates single cookie with multiple requests due to website not found.

## Request

POST `https://api.termly.io/v1/websites/cookies`

## Request Body

```json
[
  {
    "account_id": "acct_1234",
    "category": null,
    "country": "United States",
    "domain": "https://example.com",
    "de": null,
    "en_uk": null,
    "en_us": "Tracks the widget",
    "fr": null,
    "initiator": null,
    "name": "ACME Tracker",
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
    "fr": null,
    "initiator": null,
    "name": "ACME Tracker",
    "service": null,
    "service_policy_link": null,
    "source": null,
    "tracker_type": "http_cookie",
    "url": "https://example.com/cisforcookie",
    "value": "that's good enough for me",
    "website_id": "web_0987"
  }
]
```

## Response

```json
[
  {
      "account_id": "acct_1234",
      "id": "ck_1234",
      "website_id": "web_1234",
      "_idx": 0
  },
  {
      "account_id": "acct_1234",
      "error": "object_not_found",
      "id": "web_0987",
      "_idx": 1
  }    
]
```
