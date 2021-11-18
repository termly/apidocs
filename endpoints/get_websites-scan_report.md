# Overview

Retrieve the latest scan for the website. The query has the following shape:

```json
[
  {
    "account_id": "<string>",
    "website_id": "<string>",
    "id": "<string>"
  }
]
```

At least 1 object with the field account_id and website_id is required. Once the query is constructed, pass the URL encoded value in the query string parameter `query`.

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
  "results": [
    {
      "id": "<string>",
      "account_id": "<string>",
      "compliant_adequate_countries": "<bool>",
      "compliant_disclose_cookie": "<bool>",
      "cookies": [
        {
          "category": "<string>",
          "country": "<string>",
          "domain": "<string>",
          "de": "<string>",
          "en_uk": "<string>",
          "en_us": "<string>",
          "expire": "<string>",
          "fr": "<string>",
          "id": "<string>",
          "initiator": "<string>",
          "name": "<string>",
          "new": "<bool>",
          "party_provider_type": "<string>",
          "service": "<string>",
          "service_policy_link": "<string>",
          "source": "<string>",
          "tracker_type": "<enum{'http_cookie, 'html_local_storage', 'html_session_storage', 'server_cookie', 'pixel_tracker', 'indexed_db'}>",
          "url": "<string>",
          "value": "<string>",
          "website_id": "<string>"
        }
      ],
      "detected_consent_banner": "<bool>",
      "detected_cookie_category": "<bool>",
      "detected_cookie_preference": "<bool>",
      "pages": "<string>",
      "scan_failure_message": "<string>",
      "scan_type": "<string>",
      "scanned_domains": [
        "<string>"
      ],
      "status": "<string>",
      "website_id": "<string>"
    }
  ],
  "errors": [
    {
      "account_id": "<string>",
      "error": "<string>",
      "website_id": "<string>"
    }
  ],
  "paging": {
    "count": <integer>,
    "current_page": <integer>,
    "next_page": "<string>",
    "previous_page": "<string>",
    "per_page": <integer>,
    "total_count": <integer>,
    "total_pages": <integer>
  }
}
```

- `id` is the unique identifier of the report
- `account_id`  is the unique identifier of the account
- `compliant_adequate_countries` is a flag indicating whether the website is compliant across countries
- `compliant_disclose_cookie` <TODO>
- `cookies` is a list of cookie objects, documented below
- `detected_consent_banner` is a flag indicating whether the website includes a consent banner
- `detected_cookie_category` is a flag indicating whether the website includes a cookie category
- `detected_cookie_preference` is a flag indicating whether the website includes a cookie preference
- `pages` is the number of pages scanned
- `scan_failure_message` is a description of the failure if the scan failed
- `scan_type` is the type of scan, either `all_pages` or `one_page`
- `scanned_domains` is a list of strings, each string represents a domain that was scanned
- `status` is the status of the scan, one of `scanning`, `scan_finish`, or `scan_fault`
- `website_id` is the unique identifier of the website


The objects in the cookies array:

- `category` is the cookie category
- `country` is the country that sourced the cookie, based on a geoip lookup
- `domain` is the domain of the cookie
- `de` is the description in German
- `en_uk` is the description in UK English
- `en_us` is the description in US English
- `expire` is the expiry of the cookie
- `fr` is the description in French
- `id` is the unique identifier of the cookie
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


# Example 1

Request scan_report for a single website.

## Request

`GET https://api.termly.io/v1/websites/scan_report?%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%0A%5D`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_1234",
    "id": "rpt_1234",
  }
]
```

## Response

```json
{
  "results": [
    {
      "id": "rpt_1234",
      "account_id": "acct_1234",
      "compliant_adequate_countries": "false",
      "compliant_disclose_cookie": "true",
      "cookies": [
        {
          "category": null,
          "country": "United States",
          "domain": "https://example.com",
          "de": null,
          "en_uk": null,
          "en_us": "Tracks the widget",
          "lifetime": "12345",
          "fr": null,
          "id": "cookie_1234",
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
      "detected_consent_banner": true,
      "detected_cookie_category": true,
      "detected_cookie_preference": true,
      "pages": "1",
      "scan_failure_message": null,
      "scan_type": "single_page",
      "scanned_domains": [
        "example.com"
      ],
      "status": "scan_finish",
      "website_id": "web_1234"
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

## Request

`GET https://api.termly.io/v1/websites/scan_report?%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_4567%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_2112%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1029%22%0A%20%20%7D%0A%5D%0A`

Request scan_report for multiple websites.

## Query

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_1234",
    "id": "rpt_1233",
  },
  {
    "account_id": "acct_1234",
    "website_id": "web_4567",
    "id": "rpt_123",
  },
  {
    "account_id": "acct_2112",
    "website_id": "web_1029",
    "id": "rpt_1238",
  }
]
```

## Response

```json
{
  "results": [
    {
      "id": "rpt_1233",
      "account_id": "acct_1234",
      "compliant_adequate_countries": "false",
      "compliant_disclose_cookie": "true",
      "cookies": [
        {
          "category": null,
          "country": "United States",
          "domain": "https://example.com",
          "de": null,
          "en_uk": null,
          "en_us": "Tracks the widget",
          "lifetime": "12345",
          "fr": null,
          "id": "cookie_1234",
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
      "detected_consent_banner": true,
      "detected_cookie_category": true,
      "detected_cookie_preference": true,
      "pages": "1",
      "scan_failure_message": null,
      "scan_type": "single_page",
      "scanned_domains": [
        "example.com"
      ],
      "status": "scan_finish",
      "website_id": "web_1234"
    },
    {
      "id": "rpt_123",
      "account_id": "acct_1234",
      "compliant_adequate_countries": "false",
      "compliant_disclose_cookie": "true",
      "cookies": [
        {
          "category": null,
          "country": "United States",
          "domain": "https://example.com",
          "de": null,
          "en_uk": null,
          "en_us": "Tracks the widget",
          "lifetime": "12345",
          "fr": null,
          "id": "cookie_1234",
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
      ],
      "detected_consent_banner": true,
      "detected_cookie_category": true,
      "detected_cookie_preference": true,
      "pages": "1",
      "scan_failure_message": null,
      "scan_type": "single_page",
      "scanned_domains": [
        "example.com"
      ],
      "status": "scan_finish",
      "website_id": "web_4567"
    },
    {
      "id": "rpt_1238",
      "account_id": "acct_1234",
      "compliant_adequate_countries": "false",
      "compliant_disclose_cookie": "true",
      "cookies": [
        {
          "category": null,
          "country": "United States",
          "domain": "https://example.com",
          "de": null,
          "en_uk": null,
          "en_us": "Tracks the widget",
          "lifetime": "12345",
          "fr": null,
          "id": "cookie_1234",
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
          "website_id": "web_1029"
        }
      ],
      "detected_consent_banner": true,
      "detected_cookie_category": true,
      "detected_cookie_preference": true,
      "pages": "1",
      "scan_failure_message": null,
      "scan_type": "single_page",
      "scanned_domains": [
        "example.com"
      ],
      "status": "scan_finish",
      "website_id": "web_1029"
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

# Example 3

Request scan_report for multiple websites. One website does not exist.

## Request

`GET https://api.termly.io/v1/websites/scan_report?%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_4567%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_2112%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_9876%22%0A%20%20%7D%0A%5D`

## Query

```json
[
  {
    "account_id": "acct_1234",
    "website_id": "web_1234",
    "id": "rpt_1238"
  },
  {
    "account_id": "acct_1234",
    "website_id": "web_4567",
    "id": "rpt_138",
  },
  {
    "account_id": "acct_2112",
    "website_id": "web_9876",
    "id": "rpt_9876"
  }
]
```

## Response

```json
{
  "results": [
    {
      "id": "rpt_1238",
      "account_id": "acct_1234",
      "compliant_adequate_countries": "false",
      "compliant_disclose_cookie": "true",
      "cookies": [
        {
          "category": null,
          "country": "United States",
          "domain": "https://example.com",
          "de": null,
          "en_uk": null,
          "en_us": "Tracks the widget",
          "lifetime": "12345",
          "fr": null,
          "id": "cookie_1234",
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
      "detected_consent_banner": true,
      "detected_cookie_category": true,
      "detected_cookie_preference": true,
      "pages": "1",
      "scan_failure_message": null,
      "scan_type": "single_page",
      "scanned_domains": [
        "example.com"
      ],
      "status": "scan_finish",
      "website_id": "web_1234"
    },
    {
      "id": "rpt_138",
      "account_id": "acct_1234",
      "compliant_adequate_countries": "false",
      "compliant_disclose_cookie": "true",
      "cookies": [
        {
          "category": null,
          "country": "United States",
          "domain": "https://example.com",
          "de": null,
          "en_uk": null,
          "en_us": "Tracks the widget",
          "lifetime": "12345",
          "fr": null,
          "id": "cookie_1234",
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
      ],
      "detected_consent_banner": true,
      "detected_cookie_category": true,
      "detected_cookie_preference": true,
      "pages": "1",
      "scan_failure_message": null,
      "scan_type": "single_page",
      "scanned_domains": [
        "example.com"
      ],
      "status": "scan_finish",
      "website_id": "web_4567"
    }
  ],
  "errors": [
    {
      "error": "object_not_found",
      "account_id": "acct_2112",
      "website_id": "web_9876",
      "id": "rpt_9876"
    }
  ],
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
