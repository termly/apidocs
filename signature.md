The Termly API requires the requestor to create a signature composed of pieces of the request. This signature ensures that request isn't changed from a `GET` to a `DELETE` if traveling through intermediaries. This signature also ensures that if a full request is logged and those logs are compromised at some later date, the request cannot be simply sent again and cause destructive behavior.

The signature generation process is the following three steps:

1. Create a canonical request
2. Create a derived secret key
3. Sign the canonical request with the derived secret key

# Canonical Request

The canonical request is a single string. Each part will be separated by a single newline character. The canonical request is made up of the HTTP method, host the request is going to, path, 1 of 2 possible query string parameter values or a blank string, the `X-Termly-Timestamp` value, and the hex encoded SHA256 hash of the request body.

If the request does not have a body, use an empty string.

If you were concatenating a string:

```
HTTP Method + '\n' +
Host + '\n' + 
Path + '\n' +
[query value|scrolling value|blank string] + '\n' +
X-Termly-Timestamp value + '\n' + 
HexEncode(SHA256(RequestBody))
```

## Example GET

Here is an example of a GET that retrieves all collaborators for an account:

```
GET https://api.termly.io/v1/collaborators?query=%5B%7B%22account_id%22%3A%22acct_1234%22%7D%5D
```

```
GET
api.termly.io
/v1/collaborators
%5B%7B%22account_id%22%3A%22acct_1234%22%7D%5D
20210928T211508
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Here is an example of a GET that retrieves the next page of collaborators:

```
GET https://api.termly.io/v1/collaborators?scrolling=A5cgPfPunjxXFyicGz9H9ZkUwtLtD6nsgi6DPVGMs1CiA4qWHBKzoQ
```

```
GET
api.termly.io
/v1/collaborators
A5cgPfPunjxXFyicGz9H9ZkUwtLtD6nsgi6DPVGMs1CiA4qWHBKzoQ
20210928T211508
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## Example PUT/POST

```
POST
api.termly.io
/v1/collaborators

20210928T211508
9ee59fbea7d22409648305e87b61e6d4257163017ffd19cf5c39007fdee1006f
```

The `9ee59...` string is the hex encoded SHA256 hash of the following JSON:

```json
[{"account_id":"acct_1234","email":"collaborator@example.com","role":"admin"}]
```

Please note that while the following are semantically the same, they would generate very different hashes.

```json
[{"account_id":"acct_1234","email":"collaborator@example.com","role":"admin"}]

[{"account_id":"acct_1234","role":"admin","email":"collaborator@example.com"}]

[
  {
    "account_id":"acct_1234",
    "email":"collaborator@example.com",
    "role":"admin"
  }
]
```

It is required that the request payload does not change when put on the transport wire after the signature is created.

# Create a derived secret key

Signing the canonical request is done with a derived key to provide a bit more protection. The following are signatures for a semantically equivalent GET requests using a different derived key each time:

```
689353c26ac70969c2e6f9f51244c231589e5215cf57f6e79c08d70966e86463
c8d3f86abfc0e66e035bb2663a14bb1c12302ae9c78b669406875b0ca66c20c1
ff1d91f9781ba30c8980d1212947859f3ad53c2bdf9cc7b8026d7c4b2cbdaec3
```

The derived key is created with the following steps:

```
secret = <partner private key>
secret = HMAC-SHA256(secret, <X-Termly-Timestamp value>)
secret = HMAC-SHA256(secret, 'default')
secret = HMAC-SHA256(secret, 'termly')
```

The 'default' and 'termly' strings are for future expansion.

# Sign the canonical request with the derived secret key

Creating the final signature is done with the following:

```
signature = HMAC-SHA256(secret, <Canonical Request String value>)
```

Once the signature is calculated, add the following header to your HTTP request:

```
Authorization: TermlyV1, PublicKey=<partner public key>, Signature=<signature>
```
