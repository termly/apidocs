# Validation errors

This type of error is returned when the request has a validation errors. This response will be part of an array that may contain other errors or successful responses.  The error will be formatted like this:

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
  * `error` validation error code


## Example

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