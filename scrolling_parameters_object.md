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

## Sorting

At this time the API sorts all results in descending order on the creation date so the most recent record is first in the results.
