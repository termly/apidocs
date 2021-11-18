# Overview

Trigger scan of one or more websites

```json
[
	{
		"account_id": "<string>",
		"website_id": "<string>"
	}
]
```

* `account_id` is the unique identifier of the account which owns the website.
* `website_id` is the unique identifier of website to scan.

At least 1 object is required in the request.

The response is an array of objects. If the scan is successfully triggered, the object will have the following shape:

```
{
	"_idx": <integer>,
	"account_id": "<string>",
	"website_id": "<string>",
	"report_id": "<string>"
}
```

* `_idx` is the index in the original array of objects posted.
* `account_id` is the unique identifier of the account which owns the website.
* `website_id` is the unique identifier of website to scan.
* `report_id` is the unique identifier of the scan report.  This identifier can be used to find the scan status

If one of the websites cannot be scanned, the object will be an [error object](../error_object.md). If the error is a validation error, there will be a field called [validation errors](../validation_error_object.md).

# Example 1
Request for a single scan

## Request
```shell
POST https://api.termly.io/v1/websites/scan

[
	{
		"account_id": "acct_1234",
		"website_id": "web_1234"
	}
]

```

## Response
```json
[
	{
		"_idx": 0,
		"report_id": "rpt_12",
		"account_id": "acct_1234",
		"website_id": "web_123"
	}
]
```

# Example 2
Request for a website that does not exist

## Request
```shell
POST https://api.termly.io/v1/websites/scan

[
	{
		"account_id": "acct_1234",
		"website_id": "web_1"
	}
]

```

## Response
```json
[
	{
		"_idx": 0,
		"account_id": "acct_1234",
		"website_id": "web_1",
		"error": "website_not_found"
	}
]
```