# Overview

Updates the banner for a website. The body has the following shape:

```json
{
  "items": [
    {
      "account_id": "<string>",
      "auto_accept_on_scroll": "<bool>",
      "display_consent_banner_by_region": "<bool>",
      "display_style": "<enum{'banner', 'modal', 'tooltip'}>",
      "id": "<string>",
      "personalized_content": "<bool>",
      "position": "<enum{'bottom', 'bottom_left', 'bottom_right', 'top', 'top_left', 'top_right'}>",
      "running_targeted_advertising": "<bool>",
      "share_data_to_3rd_party": "<bool>",
      "show_cookie_preference": "<bool>",
      "theme_color": "<enum{'blue', 'light', 'green', 'red', 'black', 'navy_blue'}>",
      "website_id": "<string>"
    }
  ]
}
```

- `account_id` is the unique identifier of the account
- `auto_accept_on_scroll` is a user scrolling accepted as consent?
- `display_consent_banner_by_region` are there User region-specific settings?
- `display_style` is one of `banner`, `modal`, `tooltip`
- `id` is the unique identifier of the banner
- `personalized_content` does the website have content personalized for the user?
- `position` is the position in which the banner is displayed
- `running_targeted_advertising` are there targeted advertisements on the website?
- `share_data_to_3rd_party` does the Website share data with third parties?
- `show_cookie_preference` show the Cookie Preference Button in the banner?
- `theme_color` is the color of the theme
- `website_id` is the unique identifier of the website


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

PUT `/api/v3/websites/banners`

## Request Body

```json
[
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_1234",
      "personalized_content": false,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": false,
      "show_cookie_preference": true,
      "theme_color": "green",
      "website_id": "website_1234"
    }
]
```

## Response

```json
[
    {
      "id": "ban_1234",
      "website_id": "website_1234",
      "_idx": 1
    }
]
```

# Example 2

Request update for multiple banners.

## Request

PUT `/api/v3/websites/banners`

## Request Body

```json
[
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_1234",
      "personalized_content": false,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": false,
      "show_cookie_preference": true,
      "theme_color": "green",
      "website_id": "website_1234"
    },
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_2112",
      "personalized_content": false,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": false,
      "show_cookie_preference": true,
      "theme_color": "green",
      "website_id": "website_9876"
    }
]
```

## Response

```json
[
    {
      "id": "ban_1234",
      "website_id": "website_1234",
      "_idx": 1
    },
    {
      "id": "ban_2112",
      "website_id": "website_9876",
      "_idx": 1
    }
]
```

# Example 3

Request update for multiple banners. One website does not exist.

## Request

PUT `/api/v3/websites/banners`

## Request Body

```json
[
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_1234",
      "personalized_content": false,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": false,
      "show_cookie_preference": true,
      "theme_color": "green",
      "website_id": "website_1234"
    },
    {
      "account_id": "acct_1234",
      "auto_accept_on_scroll": false,
      "display_consent_banner_by_region": true,
      "display_style": "banner",
      "id": "ban_2112",
      "personalized_content": false,
      "position": "bottom",
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": false,
      "show_cookie_preference": true,
      "theme_color": "green",
      "website_id": "website_9876"
    }
]
```

## Response

```json
[
    {
      "id": "ban_1234",
      "website_id": "website_1234",
      "_idx": 1
    }
]
```
