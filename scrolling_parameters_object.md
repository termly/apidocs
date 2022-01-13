# Overview

For GET requests responses may be [returned in groups](./results_scrolling.md).

## Custom group sizes

It is possible to customize the scrolling parameters for each query. If you want to customize the settings, include the following object in your request:

```JSON
{
  "group_size": <integer>
}
```

This will return groups of the specified size. Please note the following rules:

- If not specified, the group size will be 25;
- The group size is limited to a maximum of 25;
- The group size is limited to a minimum of 1; 
- If a number outside this range is specified the default will apply; 

### Specifying the custom group sizes

To set the group size parameters include the object in your request:

```JSON
[
  {
    "scrolling": {
      "group_size": 30
    },
    "account_id": "<string>",
    "website_id": "<string>",
    "ids": [
      "<string>"
    ]
  }
]
```

## Sorting

At this time the API sorts all results in descending order on the creation date so the most recent record is first in the results.
