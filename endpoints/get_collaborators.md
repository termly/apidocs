:warning: Endpoint is not yet implemented. Coming soon.

# Overview

Retrieve all or some of the collaborators for the specified query. The query has the following JSON shape:

## Request

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

At least 1 object with the field `account_id` is required. If you wish to retrieve all collaborators for an account, omit the `ids` field. Once the query is constructed, it is passed in the query string parameter `query`. It must be URL encoded.

## Scrolling

All GET requests are subject to scrolling, please refer to [Result Scrolling](../results_scrolling.md) for details, and the [Scrolling Parameters Object](../scrolling_parameters_object.md) for configuring the parameters.

## Response

The response has the following shape:

```json
{
	"results": [],
	"errors": [],
	"scrolling": {}
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
	"invitation_url": "<string|null>",
	"invitation_status": "<enum{'pending', 'accepted'}>",
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
* `invitation_url` is the URL sent to the collaborator so they can activate their account. If the inivitation has been accepted, this field is null.
* `invitation_status` indicates whether or not the invite has been accepted.
* `role` is one of the following values - `admin`, `owner`, or `editor`. Please see [here](collaborator_roles.md) for details.
* `website_ids` is an array of website unique identifiers. This field is only provided if the `role` is `editor`.

`errors` will have 0 or more of the [error object](../error_object.md).

`scrolling` is an object that indicates if there are more results to retrieve. Please see [scrolling](../results_scrolling.md)

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
			"invitation_url": null,
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
			"invitation_url": "https://app.termly.io/invitation",
			"invitation_status": "pending"
		}
	],
	"errors": [],
	"scrolling": {
      "next_group": null,
      "previous_group": null
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
			"invitation_url": null,
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
			],
			"invitation_url": "https://app.termly.io/invitation",
			"invitation_status": "pending"
		}
	],
	"errors": [],
	"scrolling": {
      "next_group": null,
      "previous_group": null
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
			"invitation_url": null,
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
	"scrolling": {
      "next_group": null,
      "previous_group": null
	}
}

```