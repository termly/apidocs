# Overview

Creates cookies. The requst body has the following shape:

```json
{
  "account_id": "<string>",
  "category": "<string>",
  "country": "<string>",
  "domain": "<string>",
  "de": "<string>",
  "en_uk": "<string>",
  "en_us": "<string>",
  "expire": "<string>",
  "fr": "<string>",
  "initiator": "<string>",
  "name": "<string>",
  "new": "<bool>",
  "party_provider_type": "<string>",
  "service": "<string>",
  "service_policy_link": "<string>",
  "source": "<string>",
  "tracker_type": "<string>",
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
- `expire` is the expiry of the cookie
- `fr` is the description in French
- `initiator`  is the url that sourced the cookie
- `name` is the name of the cookie
- `new` is a flag indicating whether the cookie was found on the most recent scan
- `party_provider_type`  is this a first-party or third-party cookie
- `service` is a value indicating the service that soured the cookie
- `service_policy_link` is a link to the servie policy of the website
- `source` is the source of the cookie
- `tracker_type` is one of `http_cookie`, `html_local_storage`, `html_session_storage`, `server_cookie`, `pixel_tracker`, `indexed_db`
- `url` is the url of the cookie
- `value` is the cookie value
- `website_id` is the unique identifier of the website

At least 1 object with the field account_id and website_id is required.

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
  "cookie_id": "<string>",
  "website_id": "<string>",
  "_idx": "<number>"
}
```

# Example 1

Creates a single cookie for a single website.

## Request

POST `/api/v3/websites/cookies`

## Query

```json
{
    "items": [
        {
            "account_id": "acct_1234",
            "category": null,
            "country": "United States",
            "domain": "https://example.com",
            "de": null,
            "en_uk": null,
            "en_us": "Tracks the widget",
            "expire": "Friday, June 13, 2102",
            "fr": null,
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
    ]
}
```

## Response

```json
{
	"results": [
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_1234",
        "website_id": "web_1234",
        "_idx": 1
      }
    ],
	"errors": [],
	"paging": {
      "count": 1,
      "current_page": 1,
      "next_page": null,
      "previous_page": null,
      "per_page": 50,
      "total_count": 1,
      "total_pages": 1
    }
}
```

# Example 2

Creates multiple cookies for multiple websites.

## Request

POST `/api/v3/websites/cookies`

## Query

```json
{
    "items": [
        {
            "account_id": "acct_1234",
            "category": null,
            "country": "United States",
            "domain": "https://example.com",
            "de": null,
            "en_uk": null,
            "en_us": "Tracks the widget",
            "expire": "Friday, June 13, 2102",
            "fr": null,
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
            "expire": "Friday, June 13, 2102",
            "fr": null,
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
            "website_id": "web_0987"
        },
        {
            "account_id": "acct_4567",
            "category": null,
            "country": "United States",
            "domain": "https://example.com",
            "de": null,
            "en_uk": null,
            "en_us": "Tracks the widget",
            "expire": "Friday, June 13, 2102",
            "fr": null,
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
            "website_id": "web_4567"
        }
    ]
}
```

## Response

```json
{
	"results": [
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_1234",
        "website_id": "web_1234",
        "_idx": 1
      },
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_1235",
        "website_id": "web_0987",
        "_idx": 2
      },
      {
        "account_id": "acct_4567",
        "cookie_id": "ck_1236",
        "website_id": "web_4567",
        "_idx": 3
      }
    ],
	"errors": [],
	"paging": {
      "count": 3,
      "current_page": 1,
      "next_page": null,
      "previous_page": null,
      "per_page": 50,
      "total_count": 3,
      "total_pages": 1
    }
}
```

# Example 3

Creates single cookie with multiple requests due to website not found.

## Request

POST `/api/v3/websites/cookies`

## Query

```json
{
    "items": [
        {
            "account_id": "acct_1234",
            "category": null,
            "country": "United States",
            "domain": "https://example.com",
            "de": null,
            "en_uk": null,
            "en_us": "Tracks the widget",
            "expire": "Friday, June 13, 2102",
            "fr": null,
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
            "expire": "Friday, June 13, 2102",
            "fr": null,
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
            "website_id": "web_0987"
        }
    ]
}
```

## Response

```json
{
	"results": [
      {
        "account_id": "acct_1234",
        "cookie_id": "ck_1234",
        "website_id": "web_1234",
        "_idx": 1
      }
    ],
	"errors": [
      {
        "account_id": "acct_1234",
        "error": "object_not_found",
        "id": "web_0987"
      }    ],
	"paging": {
      "count": 1,
      "current_page": 1,
      "next_page": null,
      "previous_page": null,
      "per_page": 50,
      "total_count": 1,
      "total_pages": 1
    }
}
```
