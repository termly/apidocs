---
title: Results Paging
description: A guide on how to use cursor-based pagination to navigate through API results
---

# Overview

The Termly Public API uses cursor-based pagination to handle large result sets efficiently.
This system provides stable, consistent pagination even when data changes between requests.

## How It Works

- Default page size is 20 results per request
- Page size can be customized using the `limit` parameter. If provided, the response object will include a `paging` object with `next` and `previous` properties

```json
{
  "results": [...],
  "errors": [],
  "paging": {
    "next": "pagination_token",
    "previous": "pagination_token"
  }
}
```

- The `next` and `previous` tokens contain all necessary state information
- In subsequent requests, include the `next` token (if not null) to get the next page and the `previous` token (if not null) to get the previous page

## Request Parameters

We use the `GET /v1/websites` in these examples, but the same pagination logic/rules apply to all `GET` endpoints.

### First Request

```http
GET /v1/websites?query=<encoded_json_body>&limit=<number>
```

**Parameters:**

- `query` (required): JSON-encoded request body containing your search criteria
- `limit` (optional): Maximum number of results per page (default: 20)
  - Values of `0` or below return `1` result
  - Non-integer values use the default
  - Some endpoints enforce a maximum; see the endpoint's page (e.g. [Get Websites](../../endpoints/websites-get))

### Subsequent Requests

```http
GET /v1/websites?paging=<pagination_token>
```

**Parameters:**

- `paging` (required): Pagination token from the previous response. This can be either the `next` or `previous` token

## Response Structure

The API response includes a `paging` object with pagination information:

```json
{
  "results": [...],
  "errors": [],
  "paging": {
    "next": "pagination_token",
    "previous": "pagination_token"
  }
}
```

**Fields:**

- `next`: Pagination token for the next page (null if no more results)
- `previous`: Pagination token for the previous page (null if on first page)

## Important Notes

1. **Pagination tokens are opaque**: They are not intended to be decoded, modified, or constructed manually
2. **Consistent ordering**: Results are ordered consistently across pages (typically by ID)
3. **No offset-based pagination**: The API does not support `page` or `offset` parameters
4. **Stateless tokens**: Pagination tokens do not expire and contain all necessary state information
5. **Error handling**: Always check for errors in the response and handle pagination failures gracefully

## Troubleshooting

**Common Issues:**

- **"Invalid paging token"**: The token may be malformed or corrupted. Start over with a fresh request.
- **Empty results**: Check that your `account_id` is correct.
- **Pagination not working**: Ensure you're using the `paging` parameter (not `query`) for subsequent requests.
