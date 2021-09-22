# Overview

Documents all of the error formats and possible errors for the API endpoint to return.

# GET Errors

When a GET request has an error it will be represented by an object in the `error` array with this shape:

```JSON
{
  "error": "<string>",
  "account_id": "<string>",
  "id": "<string>"
}
```

## Object not found

Returned when the given `id` does not exist:


```JSON
{
  "error": "object_not_found",
  "account_id": "acct_123",
  "id": "web_123"
}
```

# POST PUT DELETE Errors

This type of error is returned when the request that made it was in error. This response will be part of an array that may contain other errors or successful responses.  The error will be formatted like this:

```JSON
{
  "error": "<string",
  "_idx": "<integer>",
  "validation_errors": [
    {
      "field": "<string>",
      "error": "<string>",
    }
  ]

}
```

* `error` code to identify the returned error
* `_idx` indexed of the object in the request array that raised this error
* `validation_errors` array of validation errors, only returned when code is `"validation_errors"`
  * `field` the attribute of the object that caused this validation failure. If the validation failure is general to the object this will be `"object"`
  * `error` validation error code f

## Object not found

Returned when the requested object cannot be found

```JSON
{
  "error": "object_not_found",
  "_idx": 1
}
```

## Validation Error

Returned when the requested change is not valid

```JSON
{
  "error": "validation_errors",
  "_idx": 2,
  "validation_errors": [
    {
      "field": "email",
      "error": "must_be_unique"
    }
  ]
}
```

# Universal Errors

Universal errors are raised when the entire request is in error or unrecoverable. The JSON is formed as shown:

```JSON
{
  "error": "<string>"
}
```

`error` code to identify the returned error

## Too Many Items

Returned when the bulk request has to many request objects. The current limit is 5 requests for POST/PUT/DELETE and 10 for GET.  

```JSON
{
  "error": "too_many_items"
}
```

## Incorrect API key

THe API key that was given does not exist or has been disabled.  

```JSON
{
  "error": "unauthorized"
}
```


## Not authorized

The API key does not have the correct role to complete one or more of the requested actions. Even if some of the requests would have been successful if one of the requests is not authorized the entire request will fail.

```JSON
{
  "error": "forbidden"
}
```

## Unrecoverable error

The API request encountered an unexpected and un recoverable error

```JSON
{
  "error": "server_error"
}
```