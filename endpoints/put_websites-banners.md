:warning: Endpoint is not yet implemented. Coming soon.

# Overview

Updates the banner for a website. The body has the following shape:

```json
{
  "items": [
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
  ]
}
```

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


The response has the following shape:

```json
[
  {
    "id": "<string>",
    "website_id": "<string>",
    "_idx": "<string>"
  }
]
```

# Example 1

Request update for a single banner.

## Request

PUT `https://api.termly.io/v1/websites/banners`

## Request Body

```json
[
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
]
```

## Response

```json
[
    {
      "id": "ban_1234",
      "website_id": "website_1234",
      "account_id": "acct_1234",
      "_idx": 1
    }
]
```

# Example 2

Request update for multiple banners.

## Request

PUT `https://api.termly.io/v1/websites/banners`

## Request Body

```json
[
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
    },
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
]
```

## Response

```json
[
    {
      "id": "ban_1234",
      "website_id": "website_1234",
      "account_id": "acct_1234",
      "_idx": 1
    },
    {
      "id": "ban_2112",
      "website_id": "website_9876",
      "account_id": "acct_1234",
      "_idx": 2
    }
]
```

# Example 3

Request update for multiple banners. One website does not exist.

## Request

PUT `https://api.termly.io/v1/websites/banners`

## Request Body

```json
[
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
]
```

## Response

```json
[
    {
      "id": "ban_1234",
      "website_id": "website_1234",
      "account_id": "acct_1234",
      "_idx": 1
    }
]
```
