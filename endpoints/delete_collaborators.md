:warning: Endpoint is not yet implemented. Coming soon.

# Overview

Delete 1 or more collaborators. The query has the following JSON shape:

```json
[
	{
		"account_id": "<string>",
		"id": "<string>"
	}
]

```

At least 1 object with the field `account_id` is required. Once the query is constructed, it is passed in the query string parameter `query`. It must be URL encoded.

The response is an array of the following objects. If the deletion was successful, the objects have the following shape

```
[
	{
		"account_id": "<string>",
		"id": "<string>",
		"_idx": <integer>
	}
]

```

If there is an error when deleting, the objects have the following shape

```
[
	{
		"error": "<string>",
		"_idx": <integer>
	}
]

```

# Example 1
Request for a single collaborator.

## Request
```shell
DELETE https://api.termly.io/v1/collaborators?query=%5B%7B%22account_id%22%3A%22acct_1234%22%2C%22id%22%3A%22col_1234%22%7D%5D

```

## Query
```json
[
	{
		"account_id": "acct_1234",
		"id": "col_1234"
	}
]

```

## Response
```json
[
	{
		"id": "col_1234",
		"account_id": "acct_1234",
		"_idx": 0
	}
]

```

# Example 2
Request for a single account and 2 collaborators. One of the collaborators does not exist.

## Request
```shell
DELETE https://api.termly.io/v1/collaborators?query=%5B%7B%22account_id%22%3A%22acct_1234%22%2C%22id%22%3A%22col_12%22%7D%2C%7B%22account_id%22%3A%22acct_1234%22%2C%22id%22%3A%22col_34%22%7D%5D

```

## Query
```json
[
	{
		"account_id": "acct_1234",
		"id": "col_12"
	},
	{
		"account_id": "acct_1234",
		"id": "col_34"
	}	
]

```

## Response
```json
[
	{
		"id": "col_34",
		"account_id": "acct_1234",
		"_idx": 1
	},
	{
		"error": "object_not_found",
		"_idx": 0
	}
]

```