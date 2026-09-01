---
title: Error Object
description: Shape of error objects for each request verb
---

## GET Errors

When a GET request has an error it will be represented by an object in the `error` array with this shape:

```json
{
  "error": "<string>",
  "account_id": "<string>",
  "id": "<string>"
}
```

### Object not found

Returned when the given `id` does not exist:

```json
{
  "error": "object_not_found",
  "account_id": "acct_123",
  "id": "web_123"
}
```

## POST PUT DELETE Errors

This type of error is returned when the request that made it was in error. This response will be part of an array that may contain other errors or successful responses.  The error will be formatted like this:

```json
{
  "error": "<string",
  "_idx": <integer>,
}
```

* `error` code to identify the returned error
* `_idx` indexed of the object in the request array that raised this error

### Object not found

Returned when the requested object cannot be found

```json
{
  "error": "object_not_found",
  "_idx": 1
}
```
