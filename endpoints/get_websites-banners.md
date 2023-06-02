:warning: Endpoint is not yet implemented. Coming soon.

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

## Paging

All GET requests are subject to paging, please refer to [Result Paging](../results_paging.md) for details, and the [Paging Parameters Object](../paging_parameters_object.md) for configuring the parameters.

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
      "id": "<string>",
      "account_id": "<string>",
      "website_id": "<string>",
      "theme_id": "<string>",
      "position": "<enum{'bottom', 'bottom_left', 'bottom_right', 'top', 'top_left', 'top_right'}>",
      "default_theme": "<enum{'blue', 'light', 'green', 'red', 'black', 'navy_blue'}>",
      "display_style": "<enum{'banner', 'tooltip', 'modal'}>",
      "personalized_content": "<bool>",
      "running_targeted_advertising": "<bool>",
      "share_data_to_3rd_party": "<bool>",
      "selected_languages": ["<enum{'el', 'hu', 'pt', 'sv', 'it', 'es', 'en-gb', 'da', 'fi', 'nl', 'fr', 'de', 'pl'}>"],
      "regions": {
        "<enum{'global', 'us', 'california', 'eu'}>": {
          "enable_banner": "<bool>",
          "enable_decline_button": "<bool>",
          "enable_cookie_preference_button": "<bool>",
          "consent_mode": "<enum{'opt_in', 'opt_out'}>",
          "enable_consent_by_scroll": "<bool>",
          "enable_google_consent_mode": "<bool>"
        }
      }
    }
  ],
  "errors": [
    {
      "error": "<string>",
      "account_id": "<string>",
      "website_id": "<string>"
    }
  ],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```

> **Note**
> The value of `display_style` affects what is allowed in `position`
> * `display_style` of `banner` allows `position` `bottom` and `top`
> * `display_style` of `tooltip` allows `position` `bottom_left`, `bottom_right`, `top_left` and `top_right`
> * `display_style` of `modal` ignores the `position` field

> **Note**
> US english `en` is required and will be selected by default even if `selected_languages` is set to an empty array

- `id` is the unique identifier of the banner
- `account_id` is the unique identifier of the account
- `website_id`is the unique identifier of the website
- `theme_id` is the unique identifier for the custom theme, if `theme_id` is nil then `default_theme` is used
- `display_style` is style of the banner*
- `position` is the position of the Banner*
- `default_theme` is the name of the default theme to be used
- `personalized_content` does the website have content personalized for the user?
- `running_targeted_advertising` are there targeted advertisements on the website?
- `share_data_to_3rd_party`does the Website share data with third parties?
- `selected_languages` languages the banner will auto display in based on region
- `regions` region specific settings
  - `<region name>` name of the region for the specific settings
    - `enable_banner` is the banner enabled?
    - `enable_decline_button` is the user allowed to decline consent?
    - `enable_cookie_preference_button` show the Cookie Preference Button in the banner?
    - `consent_mode` doe the user need to opt in or opt out of consent?
    - `enable_consent_by_scroll` is a user scrolling accepted as consent?
    - `enable_google_consent_mode` is google consent mode enabled?



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
      "id":  "ban_1234",
      "account_id": "acct_1234",
      "website_id": "web_1234",
      "theme_id": "theme_1234",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        }
      }
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
      "id": "ban_1234",
      "account_id": "acct_1234",
      "website_id": "web_1234",
      "theme_id": "theme_1234",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        }
      }
    },
    {
      "id": "ban_5678",
      "account_id": "acct_1234",
      "website_id": "web_5678",
      "theme_id": "theme_5678",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        }
      }
    },
    {
      "id": "ban_2112",
      "account_id": "acct_1234",
      "website_id": "web_2112",
      "theme_id": "theme_2112",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        }
      }
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
      "id": "ban_1234",
      "account_id": "acct_1234",
      "website_id": "web_1234",
      "theme_id": "theme_1234",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        }
      }
    },
    {
      "id": "ban_5678",
      "account_id": "acct_1234",
      "website_id": "web_5678",
      "theme_id": "theme_5678",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false
        }
      }
    }
  ],
  "errors": [
    {
      "account_id": "acct_1234",
      "error": "object_not_found",
      "id": "web_2020"
    }
  ],
  "paging": {
    "next_results": null,
    "previous_results": null
  }
}
```
