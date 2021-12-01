# Overview

Trigger scan of one or more websites

```json
[
	{
		"account_id": "<string>",
		"website_id": "<string>",
		"scan_type": "<enum{'single_page', 'all_pages'}>"
	}
]
```

* `account_id` is the unique identifier of the account which owns the website.
* `website_id` is the unique identifier of website to scan.
* `scan_type' indicates what type of scan should be run. If no value is provided the default is `all_pages`.
  * `single_page` only scan the first page of the website, it will provide faster results but the results may not be complete.
  * `all_pages` crawl and scan all pages of the website.  slower but will provide a must more complete results.

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
		"website_id": "web_1234",
		"scan_type": "single_page",
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
Request for a website that does not exist with the default `scan_type`

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
