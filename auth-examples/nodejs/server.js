import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/test-auth', async (req, res) => {
    try {
        const apiKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;

        const termlyTimestamp = getTermlyTimestamp();
        const authHeader = createAuthHeader(apiKey, privateKey, termlyTimestamp, 'GET', '', '/v1/authn', '');
        console.log(`Authorization Header: ${authHeader}`);

        const response = await axios.get('https://api.usw2.staging.trmly.net/v1/authn', {
            headers: {
                'Authorization': authHeader,
                'X-Termly-Timestamp': termlyTimestamp
            }
        });

        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error making API call');
    }
});

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
    const host = 'api.usw2.staging.trmly.net';
    const canonicalRequest = createCanonicalRequest(method, host, path, query, termlyTimestamp, body);
    const signature = crypto.createHmac('sha256', derivedSecretKey).update(canonicalRequest).digest('hex');

    return `TermlyV1, PublicKey=${apiKey}, Signature=${signature}`;
}


function createCanonicalRequest(method, host, path, query, termlyTimestamp, requestBody) {
    const bodyHash = crypto.createHash('sha256').update(requestBody || '').digest('hex');
    return `${method}\n${host}\n${path}\n${query}\n${termlyTimestamp}\n${bodyHash}`;
}

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
