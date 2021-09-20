# Overview

Retrieve all or some of the collaborators for the specified query. The query has the following JSON shape:

```json
[
	{
		"account_id": "<string>",
		"ids": [
			"<string>"
		]
	}
]

```

At least 1 object with the field `account_id` is required. If you wish to retrieve all collaborators for an account, omit the `ids` field. Once the query is constructed, it passed in the query string parameter `query`. It must be URL encoded.

The response has the following shape:

```json
{
	"results": [],
	"errors": [],
	"paging": {}
}

```

`results` will contain 0 or more of the following objects:

```json
{
	"id": "<string>",
	"account_id": "<string>",
	"email": "<string>",
	"first_name": "<string|null>",
	"last_name": "<string|null>",
	"role": "<enum{'admin', 'owner', 'editor'}>",
	"website_ids": [
		"<string>"
	]
}

```

* `id` is the unique identifier of the collaborator.
* `account_id` is the unique identifier of the account which owns the collaborator.
* `email` is the email address of the collaborator
* `first_name` is the Given name of the collaborator if provided by the collaborator upon signing in for the first time.
* `last_name` is the Surname of the collaborator if provided by the collaborator upon signing in for the first time.
* `role` is one of the following values - `admin`, `owner`, or `editor`. Please see [here](collaborator_roles.md) for details.
* `website_ids` is an array of website unique identifiers. This field is only provided if the `role` is `editor`.

`errors` will have 0 or more of the [error object](../error_object.md).

`paging` is an object that indicates if there are more results to retrieve. Please see [paging](../paging_object.md)

# Example 1
Request for a single account and all collaborators.

## Request
```shell
GET https://api.termly.io/v1/collaborators?query=%5B%7B%22account_id%22%3A%22acct_1234%22%7D%5D

```

## Query
```json
[
	{
		"account_id": "acct_1234"
	}
]

```

## Response
```json
{
	"results": [
		{
			"id": "col_1",
			"account_id": "acct_1234",
			"email": "collaborator1@example.com",
			"first_name": "Collaborator",
			"last_name": "One",
			"role": "admin",
			"invitation_status": "accepted"
		},
		{
			"id": "col_2",
			"account_id": "acct_1234",
			"email": "collaborator2@example.com",
			"role": "editor",
			"website_ids": [
				"web_12",
				"web_24",
				"web_36"
			],
			"invitation_status": "pending"
		}
	],
	"errors": [],
	"paging": {
		"count": 2,
		"current_page": 1,
		"next_page": null,
		"prev_page": null,
		"per_page": 25,
		"total_count": 2,
		"total_pages": 1
	}
}

```

# Example 2
Request for a single account and specific collaborators.

## Request
```shell
GET https://api.termly.io/v1/collaborators?query=%5B%7B%22account_id%22%3A%22acct_1234%22%2C%22ids%22%3A%5B%22col_12%22%2C%22col_34%22%5D%7D%5D

```

## Query
```json
[
	{
		"account_id": "acct_1234",
		"ids": [
			"col_12",
			"col_34"
		]
	}
]

```

## Response
```json
{
	"results": [
		{
			"id": "col_12",
			"account_id": "acct_1234",
			"email": "collaborator1@example.com",
			"first_name": "Collaborator",
			"last_name": "One",
			"role": "admin",
			"invitation_status": "accepted"
		},
		{
			"id": "col_34",
			"account_id": "acct_1234",
			"email": "collaborator2@example.com",
			"first_name": "Collaborator",
			"last_name": "Two",
			"role": "editor",
			"website_ids": [
				"web_12",
				"web_24",
				"web_36"
			]
		}
	],
	"errors": [],
	"paging": {
		"count": 2,
		"current_page": 1,
		"next_page": null,
		"prev_page": null,
		"per_page": 25,
		"total_count": 2,
		"total_pages": 1
	}
}

```

# Example 3
Request for a single account and 2 collaborators. One of the collaborators does not exist.

## Request
```shell
GET https://api.termly.io/v1/collaborators?query=%5B%7B%22account_id%22%3A%22acct_1234%22%2C%22ids%22%3A%5B%22col_12%22%2C%22col_34%22%5D%7D%5D

```

## Query
```json
[
	{
		"account_id": "acct_1234",
		"ids": [
			"col_12",
			"col_34"
		]
	}
]

```

## Response
```json
{
	"results": [
		{
			"id": "col_12",
			"account_id": "acct_1234",
			"email": "collaborator1@example.com",
			"first_name": "Collaborator",
			"last_name": "One",
			"role": "admin",
			"invitation_status": "accepted"
		}
	],
	"errors": [
		{
			"error": "object_not_found",
			"account_id": "acct_1234",
			"id": "col_34"
		}
	],
	"paging": {
		"count": 1,
		"current_page": 1,
		"next_page": null,
		"prev_page": null,
		"per_page": 25,
		"total_count": 1,
		"total_pages": 1
	}
}

```