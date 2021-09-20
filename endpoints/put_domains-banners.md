# PUT /domains/banners

## Body

### Parameters

Array of objects, each object contains:

- "account_id": "string", - _The Account Id_
- "website_id": "string", - _The Website Id_
- "id": "string", - _The Consent Theme Id_
- "display_style": "string", - _Cookie Banner display style_
- "position": "string", - _Banner position_
- "theme_color": "string", - _Theme color_
- "auto_accept_on_scroll": boolean, - _Is a user scrolling accepted as consent?_
- "display_consent_banner_by_region": boolean, - _Are there User region-specific settings?_
- "show_cookie_preference": boolean, - _Show the Cookie Preference Button in the banner?_
- "personalized_content": boolean, - _Does the website have content personalized for the user?_
- "running_targeted_advertising": boolean, - _Are there targeted advertisements on the website?_
- "share_data_to_3rd_party": boolean - _Does the Website share data with third parties?_

### Example

#### Sample JSON

```json
{
  "items": [
    {
      "account_id": "ACCT1",
      "website_id": "WEB2112",
      "id": "2112",
      "display_style": "banner",
      "position": "bottom",
      "theme_color": "blue",
      "auto_accept_on_scroll": true,
      "display_consent_banner_by_region": true,
      "show_cookie_preference": true,
      "personalized_content": true,
      "running_targeted_advertising": true,
      "share_data_to_3rd_party": true
    }
  ]
}```

#### Sample URI

`/api/v3/domains/banners`

## Response

### Success

### Error

#### 400

Bulk request exceeded limits. error: too_many_items

```json
{
  "error": "string",
  "_idx": "string"
}
```

#### 401

API Key is not correct or has been disabled. error: unauthorized

```json
{
  "error": "string",
  "_idx": "string"
}
```

#### 403

API Key is correct but the API key does not have permission to perform the requested action on 1 or more of the items in the request. error: forbidden

```json
{
  "error": "string",
  "_idx": "string"
}
```

#### 500

An unexpected error was encountered. error: server_error

```json
{
  "error": "string",
  "_idx": "string"
}
```
