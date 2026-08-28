---
title: Node.js Authentication Example
description: A Node.js example of how to make a request to the Termly API
---

Follow these steps to get the example up and running on your local machine.

## Prerequisites

You will need to add the following files to your project:

### env.example

```bash
PUBLIC_KEY=YOUR_PUBLIC_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
ACCOUNT_ID=YOUR_ACCOUNT_ID
WEBSITE_ID=YOUR_WEBSITE_ID
API_BASE_URL=https://api.termly.io
```

### package.json

```json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.6.7",
    "dotenv": "^16.4.2",
    "express": "^4.18.2"
  }
}
```

### server.js

```javascript
import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.termly.io';
const API_HOST = new URL(API_BASE_URL).hostname;

// --- Auth helpers ---

function getTermlyTimestamp() {
    const now = new Date();
    return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
}

function pad(n) {
    return n < 10 ? `0${n}` : `${n}`;
}

function createDerivedSecretKey(privateKey, termlyTimestamp) {
    let apiSecret0 = crypto.createHmac('sha256', privateKey).update(termlyTimestamp).digest();
    let apiSecret1 = crypto.createHmac('sha256', apiSecret0).update('default').digest();
    return crypto.createHmac('sha256', apiSecret1).update('termly').digest();
}

function createAuthHeader(apiKey, privateKey, termlyTimestamp, method, body, path, query) {
    body = body || '';
    const derivedSecretKey = createDerivedSecretKey(privateKey, termlyTimestamp);
    const canonicalRequest = createCanonicalRequest(method, API_HOST, path, query, termlyTimestamp, body);
    const signature = crypto.createHmac('sha256', derivedSecretKey).update(canonicalRequest).digest('hex');

    return `TermlyV1, PublicKey=${apiKey}, Signature=${signature}`;
}

function createCanonicalRequest(method, host, path, query, termlyTimestamp, requestBody) {
    const bodyHash = crypto.createHash('sha256').update(requestBody || '').digest('hex');
    return `${method}\n${host}\n${path}\n${query}\n${termlyTimestamp}\n${bodyHash}`;
}

// --- Routes ---
// TODO: Consider splitting routes into separate files (e.g. routes/custom-consent-themes.js)
// as more endpoint examples are added to keep this file manageable.

// Test authentication
app.get('/test-auth', async (req, res) => {
    try {
        const apiKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;

        const termlyTimestamp = getTermlyTimestamp();
        const authHeader = createAuthHeader(apiKey, privateKey, termlyTimestamp, 'GET', '', '/v1/authn', '');
        console.log(`Authorization Header: ${authHeader}`);

        const response = await axios.get(`${API_BASE_URL}/v1/authn`, {
            headers: {
                'Authorization': authHeader,
                'X-Termly-Timestamp': termlyTimestamp
            }
        });

        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Create a custom consent theme
app.post('/custom-consent-themes', async (req, res) => {
    try {
        const apiKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;
        const path = '/v1/websites/custom_consent_themes';

        const body = JSON.stringify([{
            font_family: 'Arial',
            font_size: '14',
            color: '#333333',
            background: '#FFFFFF',
            btn_background: '#4CAF50',
            btn_text_color: '#FFFFFF',
            ...req.body,
            account_id: process.env.ACCOUNT_ID,
            website_id: process.env.WEBSITE_ID,
        }]);

        const termlyTimestamp = getTermlyTimestamp();
        const authHeader = createAuthHeader(apiKey, privateKey, termlyTimestamp, 'POST', body, path, '');

        const response = await axios.post(`${API_BASE_URL}${path}`, body, {
            headers: {
                'Authorization': authHeader,
                'X-Termly-Timestamp': termlyTimestamp,
                'Content-Type': 'application/json',
            }
        });

        console.log('Created theme:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Get custom consent themes for a website
app.get('/custom-consent-themes', async (req, res) => {
    try {
        const apiKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;
        const path = '/v1/websites/custom_consent_themes';

        const queryJson = JSON.stringify([{
            account_id: process.env.ACCOUNT_ID,
            website_id: process.env.WEBSITE_ID,
        }]);
        const queryEncoded = encodeURIComponent(queryJson);

        const termlyTimestamp = getTermlyTimestamp();
        const authHeader = createAuthHeader(apiKey, privateKey, termlyTimestamp, 'GET', '', path, queryEncoded);

        const response = await axios.get(`${API_BASE_URL}${path}?query=${queryEncoded}`, {
            headers: {
                'Authorization': authHeader,
                'X-Termly-Timestamp': termlyTimestamp,
            }
        });

        console.log('Themes:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Update a custom consent theme
app.put('/custom-consent-themes/:themeId', async (req, res) => {
    try {
        const apiKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;
        const path = '/v1/websites/custom_consent_themes';

        const body = JSON.stringify([{
            ...req.body,
            account_id: process.env.ACCOUNT_ID,
            website_id: process.env.WEBSITE_ID,
            id: req.params.themeId,
        }]);

        const termlyTimestamp = getTermlyTimestamp();
        const authHeader = createAuthHeader(apiKey, privateKey, termlyTimestamp, 'PUT', body, path, '');

        const response = await axios.put(`${API_BASE_URL}${path}`, body, {
            headers: {
                'Authorization': authHeader,
                'X-Termly-Timestamp': termlyTimestamp,
                'Content-Type': 'application/json',
            }
        });

        console.log('Updated theme:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Using API: ${API_BASE_URL} (host: ${API_HOST})`);
    console.log('');
    console.log('Available routes:');
    console.log('  GET  /test-auth                        - Test authentication');
    console.log('  POST /custom-consent-themes            - Create a custom theme');
    console.log('  GET  /custom-consent-themes            - List themes for website');
    console.log('  PUT  /custom-consent-themes/:themeId   - Update a theme');
});
```

### Steps

1. **Install dependencies:**

``` bash
npm install
```

1. **Set up environment variables:**

Copy the .env.example file to a new file named .env and update it with your API credentials:

``` bash
cp .env.example .env
```

Then open .env and fill in your values:

- `PUBLIC_KEY` and `PRIVATE_KEY` — your API key pair
- `ACCOUNT_ID` — your Termly account ID (e.g. `acct_xxxx`)
- `WEBSITE_ID` — the website ID to manage themes for (e.g. `web_xxxx`)
- `API_BASE_URL` — use `https://api.termly.io`

## Running the Example

To run the example, execute:

``` bash
npm start
```

This will start the server on port 3000.

### Test Authentication

```bash
curl http://localhost:3000/test-auth
```

### Custom Consent Themes

**Create a theme:**

```bash
curl -X POST http://localhost:3000/custom-consent-themes \
  -H "Content-Type: application/json" \
  -d '{"color": "#333333", "background": "#FFFFFF", "btn_background": "#4CAF50", "btn_text_color": "#FFFFFF"}'
```

**List themes:**

```bash
curl http://localhost:3000/custom-consent-themes
```

**Update a theme** (replace `cct_xxxx` with the ID returned from create):

```bash
curl -X PUT http://localhost:3000/custom-consent-themes/cct_xxxx \
  -H "Content-Type: application/json" \
  -d '{"color": "#FF0000", "btn_background": "#0000FF"}'
```
