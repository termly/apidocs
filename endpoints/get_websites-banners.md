# Overview

Retrieve all banners for the specified query. The query has the following shape:

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

## Scrolling

All GET requests are subject to scrolling, please refer to [Result Scrolling](../results_scrolling.md) for details, and the [Scrolling Parameters Object](../scrolling_parameters_object.md) for configuring the parameters.

## Response

The response has the following shape:

```json
{
	"results": [],
	"errors": [],
	"scrolling": {}
}
```

The results will contain zero or more of the following objects:

```json
{
  "results": [
    {
      "account_id": "<string>",
      "auto_accept_on_scroll": "<bool>",
      "display_consent_banner_by_region": "<bool>",
      "display_style": "<enum{'banner', 'tooltip', 'modal'}>",
      "id": "<string>",
      "personalized_content": "<bool>",
      "position": "<enum{'bottom', 'bottom_left', 'bottom_right', 'top', 'top_left', 'top_right'}>",
      "running_targeted_advertising": "<bool>",
      "share_data_to_3rd_party": "<bool>",
      "show_cookie_preference": "<bool>",
      "theme_color": "<string>",
      "website_id": "<string>"
    }
  ],
  "errors": [
    {
      "error": "<string>",
      "account_id": "<string>",
      "website_id": "<string>"
    }
  ],
  "scrolling": {
    "next_group": null,
    "previous_group": null
  }
}
```

- `account_id` is the unique identifier of the account
- `auto_accept_on_scroll` is a user scrolling accepted as consent?
- `display_consent_banner_by_region` are there User region-specific settings?
- `display_style` is one of `banner`, `tooltip`, `modal`.
- `id` is the unique identifier of the banner
- `personalized_content` does the website have content personalized for the user?
- `position` is the position of the Banner
- `running_targeted_advertising` are there targeted advertisements on the website?
- `share_data_to_3rd_party` does the Website share data with third parties?
- `show_cookie_preference` show the Cookie Preference Button in the banner?
- `theme_color` is the color of the theme
- `website_id` is the unique identifier of the website

# Example 1

Request banner for a single website.

## Request

GET `https://api.termly.io/v1/websites/banners?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%0A%5D%0A`

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
      "auto_accept_on_scroll": true,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_1234",
      "personalized_content": true,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true,
      "show_cookie_preference": true,
      "theme_color": "blue",
      "website_id": "web_1234"
    }
  ],
  "errors": [],
  "scrolling": {
    "next_page": null,
    "previous_page": null
  }
}
```

# Example 2

Request banners for multiple websites on the same account.

## Request

GET `https://api.termly.io/v1/websites/banners?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_5678%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_2112%22%0A%20%20%7D%0A%5D`

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
  },
  {
    "account_id": "acct_1234",
    "website_id": "web_2112"
  }
]
```

## Response

```json
{
  "results": [
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_1234",
      "personalized_content": true,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true,
      "show_cookie_preference": true,
      "theme_color": "blue",
      "website_id": "web_1234"
    },
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": true,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_5678",
      "personalized_content": true,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true,
      "show_cookie_preference": true,
      "theme_color": "blue",
      "website_id": "web_5678"
    },
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_2112",
      "personalized_content": true,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true,
      "show_cookie_preference": true,
      "theme_color": "blue",
      "website_id": "web_2112"
    }
  ],
  "errors": [],
  "scrolling": {
    "next_group": null,
    "previous_group": null
  }
}
```


# Example 3

Request banners for multiple websites. One website does not exist.

## Request

GET `https://api.termly.io/v1/websites/banners?query=%5B%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_1234%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_5678%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22account_id%22%3A%20%22acct_1234%22%2C%0A%20%20%20%20%22website_id%22%3A%20%22web_2020%22%0A%20%20%7D%0A%5D`

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
  },
  {
    "account_id": "acct_1234",
    "website_id": "web_2020"
  }
]
```

## Response

```json
{
  "results": [
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_1234",
      "personalized_content": true,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true,
      "show_cookie_preference": true,
      "theme_color": "blue",
      "website_id": "web_1234"
    },
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": true,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_5678",
      "personalized_content": true,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true,
      "show_cookie_preference": true,
      "theme_color": "blue",
      "website_id": "web_5678"
    }
  ],
  "errors": [
    {
      "account_id": "acct_1234",
      "error": "object_not_found",
      "id": "web_2020"
    }  
  ],
  "scrolling": {
    "next_group": null,
    "previous_group": null
  }
}
```
