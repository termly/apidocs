:warning: Endpoint is not yet implemented. Coming soon.

# Overview

Update one or more collaborators. The following is the JSON that is posted.

```json
[
	{
		"account_id": "<string>",
		"id": "<string>",
		"role": "<enum{'admin', 'editor'}>",
		"website_ids": [
			"<string>"
		]
	}
]
```

* `account_id` is the unique identifier of the account which owns the collaborator.
* `id` is the unique identifier for the collaborator to update.
* `role` is one of the following values - `admin` or `editor`. Please see [here](collaborator_roles.md) for details.
* `website_ids` is an array of website unique identifiers. This field is only provided if the `role` is `editor`. Please note that this field will replace websites. To add a new website, all existing website identifiers plus the new one need to be present.

At least 1 object is required in the request.

The response is an array of objects. If the collaborator can be updated successfully, the object will have the following shape:

```
{
	"_idx": <integer>,
	"id": "<string>",
	"account_id": "<string>",
	"email": "<string>",
	"first_name": "<string|null>",
	"last_name": "<string|null>",
	"invitation_url": "<string>",
	"invitation_status": "<enum{'pending', 'accepted'}>",
	"role": "<enum{'admin', 'editor'}>",
	"website_ids": [
		"<string>"
	]
}
```

* `_idx` is the index in the original array of objects posted.
* `id` is the unique identifier of the collaborator.
* `account_id` is the unique identifier of the account which owns the collaborator.
* `email` is the email address of the collaborator
* `first_name` is the Given name of the collaborator if provided by the collaborator upon signing in for the first time.
* `last_name` is the Surname of the collaborator if provided by the collaborator upon signing in for the first time.
* `invitation_url` is the URL sent to the collaborator so they can activate their account.
* `invitation_status` indicates whether or not the invite has been accepted.
* `role` is one of the following values - `admin` or `editor`. Please see [here](collaborator_roles.md) for details.
* `website_ids` is an array of website unique identifiers. This field is only provided if the `role` is `editor`.

If one of the collaborators cannot be updated, the object will be an [error object](../error_object.md). If the error is a validation error, there will be a field called [validation errors](../validation_error_object.md).

# Example 1
Request for a single collaborator

## Request
```shell
PUT https://api.termly.io/v1/collaborators

[
	{
		"account_id": "acct_1234",
		"id": "col_12",
		"role": "editor",
		"website_ids": [ "web_12", "web_34" ]
	}
]

```

## Response
```json
[
	{
		"_idx": 0,
		"id": "col_1",
		"account_id": "acct_1234",
		"email": "collaborator1@example.com",
		"first_name": "Collaborator",
		"last_name": "One",
		"role": "editor",
		"website_ids": [ "web_12", "web_34" ],
		"invitation_url": null,
		"invitation_status": "accepted"
	}
]
```
