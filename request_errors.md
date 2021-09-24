# Request Errors

Request errors are raised when the entire request is in error or unrecoverable. The JSON is formed as shown:

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