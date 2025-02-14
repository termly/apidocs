# Overview

Updates the banner for a website. The body has the following shape:

```json
[
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
    "policy_settings": {
      "enable_privacy_policy_url": "<bool>",
      "privacy_policy_url": "<string>"
    },
    "regions": {
      "<enum{'global', 'us', 'california', 'eu'}>": {
        "enable_banner": "<bool>",
        "enable_decline_button": "<bool>",
        "enable_cookie_preference_button": "<bool>",
        "consent_mode": "<enum{'opt_in', 'opt_out'}>",
        "enable_consent_by_scroll": "<bool>",
        "enable_google_consent_mode": "<bool>",
        "google_consent_mode_settings": {
            "ad_personalization": "<enum{'denied', 'granted'}>",
            "ad_storage": "<enum{'denied', 'granted'}>",
            "ad_user_data": "<enum{'denied', 'granted'}>",
            "ads_data_redaction": "<bool>",
            "analytics_storage": "<enum{'denied', 'granted'}>",
            "enable_wait_for_update": "<bool>",
            "functionality_storage": "<enum{'denied', 'granted'}>",
            "personalization_storage": "<enum{'denied', 'granted'}>",
            "security_storage": "<enum{'denied', 'granted'}>",
            "social_storage": "<enum{'denied', 'granted'}>",
            "url_passthrough": "<bool>",
            "wait_for_update": "<integer>"
        },
        "enable_tcf": "<bool>"
      }
    }
  }
]
```

- `id` is the unique identifier of the website (the website will always and only have 1 banner so use the website id)
- `account_id` is the unique identifier of the account
- `website_id` is the unique identifier of the website
- `theme_id` is the unique identifier for the custom theme, if `theme_id` is nil then `default_theme` is used
- `display_style` is style of the banner*
- `position` is the position of the Banner*
- `default_theme` is the name of the default theme to be used
- `personalized_content` does the website have content personalized for the user?
- `running_targeted_advertising` are there targeted advertisements on the website?
- `share_data_to_3rd_party`does the Website share data with third parties?
- `selected_languages` languages the banner will auto display in based on region
- `policy_settings` privacy policy settings
  - `enable_privacy_policy_url` is the privacy policy URL enabled?
  - `privacy_policy_url` is the privacy policy URL
- `regions` region specific settings
  - `<region name>` name of the region for the specific settings
    - `enable_banner` is the banner enabled?
    - `enable_decline_button` is the user allowed to decline consent?
    - `enable_cookie_preference_button` show the Cookie Preference Button in the banner?
    - `consent_mode` doe the user need to opt in or opt out of consent?
    - `enable_consent_by_scroll` is a user scrolling accepted as consent?
    - `enable_google_consent_mode` is google consent mode enabled?
    - `google_consent_mode_settings` is an object containing the google consent mode settings
      - `ad_personalization` Sets consent for personalized advertising.
      - `ad_storage` Enables storage (such as cookies) related to advertising.
      - `ad_user_data` Sets consent for sending user data related to advertising to Google.
      - `ads_data_redaction` To further redact your ads data when ad_storage is denied, set ads_data_redaction to true.
      - `analytics_storage` Enables storage (such as cookies) related to analytics e.g. visit duration.
      - `enable_wait_for_update` Should wait_for_update be enabled
      - `functionality_storage` Enables storage that supports the functionality of the website or app e.g. language settings.
      - `personalization_storage` Enables storage related to personalization e.g. video recommendations
      - `security_storage` Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.
      - `social_storage` Enables storage related to social
      - `url_passthrough` Pass through ad click, client ID, and session ID information in URLs
      - `wait_for_update` How long (in milliseconds) to wait before data is sent
    - `enable_tcf` is IAB TCF enabled? NOTE: This can only be set in the EU region.

The response will contain the full list of objects that were PUT including, but not
limited to:

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
      "id":  "web_1234",
      "account_id": "acct_1234",
      "theme_id": "cct_1234",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "policy_settings": {
        "enable_privacy_policy_url": true,
        "privacy_policy_url": "https://www.example.com/privacy-policy"
      },
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          },
          "enable_tcf": false
        }
      }
    }
]
```

## Response

The response will contain the full object that was PUT including, but not limited to:

```json
[
    {
      "id": "website_1234",
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
      "id": "web_1234",
      "account_id": "acct_1234",
      "theme_id": "cct_1234",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "policy_settings": {
        "enable_privacy_policy_url": true,
        "privacy_policy_url": "https://www.example.com/privacy-policy"
      },
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          },
          "enable_tcf": true
        }
      }
    },
    {
      "id":  "web_1234",
      "account_id": "acct_1234",
      "theme_id": "cct_1234",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "policy_settings": {
        "enable_privacy_policy_url": true,
        "privacy_policy_url": "https://www.anotherexample.com/privacy-policy"
      },
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          },
          "enable_tcf": false
        }
      }
    }
]
```

## Response

```json
[
    {
      "id": "web_1234",
      "account_id": "acct_1234",
      "_idx": 1
    },
    {
      "id": "web_9876",
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
      "id":  "web_1234",
      "account_id": "acct_1234",
      "theme_id": "cct_1234",
      "position": "bottom",
      "default_theme": "navy_blue",
      "display_style": "banner",
      "personalized_content": true,
      "running_targeted_advertising": false,
      "share_data_to_3rd_party": true,
      "selected_languages": ["en", "pl"],
      "policy_settings": {
        "enable_privacy_policy_url": true,
        "privacy_policy_url": "https://www.example.com/privacy-policy"
      },
      "regions": {
        "global": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "us": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "california": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          }
        },
        "eu": {
          "enable_banner": true,
          "enable_decline_button": false,
          "enable_cookie_preference_button": true,
          "consent_mode": "opt_out",
          "enable_consent_by_scroll": true,
          "enable_google_consent_mode": false,
          "google_consent_mode_settings": {
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ads_data_redaction": false,
            "analytics_storage": "denied",
            "enable_wait_for_update": false,
            "functionality_storage": "denied",
            "personalization_storage": "denied",
            "security_storage": "denied",
            "social_storage": "denied",
            "url_passthrough": false,
            "wait_for_update": 500
          },
          "enable_tcf": false
        }
      }
    }
]
```

## Response

```json
[
    {
      "id": "web_1234",
      "account_id": "acct_1234",
      "_idx": 1
    }
]
```
