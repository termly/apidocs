---
title: Quickstart - Integrating Termly CMP
description: A guide on how to integrate Termly as a CMP
---

This quickstart guide is designed for Termly Integration Partners (e.g. website builders) who are aiming to integrate Termly into their platform as a Consent Management Platform (CMP) solution for their own users.

Below we outline (1) a step-by-step process for a basic integration and (2) advice for more advanced customization scenarios.

## **Basic Integration**

These steps outline the minimal interaction a platform would have with Termly’s API in order to get a working CMP installed on a website that they manage.

### **1. Create Website Configuration**

Create a new website in your partner account, providing necessary details like the website's URL and business information.

**Documentation:** [Websites API](/endpoints/websites-post)

### **2. Initiate Website Scan**

Start a website scan to identify cookies, trackers, and other elements requiring consent.

**Documentation:** [Scan API](/endpoints/trigger-scan)

### **3. Monitor Scan Progress**

Track the scan status through the API until completion to proceed with further setup.

**Documentation:** [Scan report API](/endpoints/scan-reports-get)

### **4. Implement CMP Embed Script**

Embed the CMP script in the website’s **`<head>`** section post-scan, enabling the consent banner for site visitors.

**Documentation:** [Websites API](/endpoints/websites-get)

## **Advanced Configuration Options**

Advice and best practices for further implementation of the Termly CMP.

### **Banner Customization**

Banner appearance and behavior can be modified to suit each website's needs. Some Integration Partners see value in setting a standardized configuration across all sites that they manage, while others expose certain controls to their users to allow for some control.

**Documentation:** [Banner Settings](/endpoints/banners-put), [Theming](/endpoints/custom-consent-themes-get)

#### Custom Consent Themes

To customize banner colors, fonts, and button styles, use the Custom Consent Themes endpoints. The complete flow is:

**1. Check if a theme already exists** with a GET request before creating a new one:

```http
GET https://api.termly.io/v1/websites/custom_consent_themes?query=<url_encoded_json>
```

Where the query JSON (URL-encoded) is:

```json
[{"account_id":"<your_account_id>","website_id":"<your_website_id>"}]
```

- If `results` is **not empty**, a theme already exists — use its `id` for the PUT in step 2.
- If `results` is **empty**, no theme exists — proceed with POST in step 2.

**2. Create or update the theme:**

*If no theme exists*, create one with POST:

```http
POST https://api.termly.io/v1/websites/custom_consent_themes
```

```json
[
  {
    "account_id": "<your_account_id>",
    "website_id": "<your_website_id>",
    "font_family": "Arial",
    "font_size": "14",
    "color": "#333333",
    "background": "#FFFFFF",
    "btn_background": "#4CAF50",
    "btn_text_color": "#FFFFFF"
  }
]
```

The response includes the theme `id` (e.g. `cct_xxxx`) — save this for step 3.

*If a theme already exists*, update it with PUT using the `id` from the GET response:

```http
PUT https://api.termly.io/v1/websites/custom_consent_themes
```

```json
[
  {
    "account_id": "<your_account_id>",
    "website_id": "<your_website_id>",
    "id": "<theme_id>",
    "color": "#FF0000",
    "btn_background": "#0000FF"
  }
]
```

**3. Apply the theme to the banner** — this is a required step to make the theme visible to site visitors:

```http
PUT https://api.termly.io/v1/websites/banners
```

```json
[
  {
    "account_id": "<your_account_id>",
    "id": "<your_website_id>",
    "theme_id": "<theme_id>"
  }
]
```

:::note
Creating or updating a theme saves it to the website's theme library, but does **not** automatically apply it to the live banner. The `PUT /v1/websites/banners` call in step 3 is what links the theme to the banner and makes the styling visible. Without this step, the banner will continue using its default appearance.
:::

:::note
All request bodies must be JSON **arrays**, even for a single item.
:::

For a complete working code example, see the [Node.js Authentication Example](/quickstart/node-js-example).

### **User Collaboration**

Integration Partners may want their users to get access to the Termly Dashboard for full customization of their CMP solution, or in order to generate legal policies.

The collaborators API can be used to invite a user to access a specific site via an invite URL, which they can use to log in to the Termly Dashboard.

**Documentation:** [Collaborators API](/endpoints/collaborators-post)

### **Script Blocking Management**

In order for the CMP to be effective at respecting a site visitor’s consent preferences, a [script blocking method](https://support.termly.io/en/articles/7904702-how-to-block-third-party-cookies) must be employed.

To streamline this process, Integration Partners may want to generate a [custom blocking map](https://support.termly.io/en/articles/7904650-implementing-a-custom-blocking-map-to-change-auto-blocker-s-blocking-behavior) across the sites that they manage. This allows for consistent blocking behavior across many websites, which can be useful in the case where the same service is employed across them all (e.g. a third party booking service).

Additionally, Integrators who provide their customers an interface to add third party scripts on their site may want to expand this UI to allow for categorization of these scripts for the purpose of script blocking.
