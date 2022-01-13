# Overview

Result sets with more than 25 results will be automatically partitioned into groups, and will follow these rules:

- If not specified, the group size will be 25;
- The group size can be specified along with the query objects;
- The group size is limited to a maximum of 25;
- The group size is limited to a minimum of 1;

The response will contain data that allows scrolling through the results. The JSON shape is:

```JSON
{
  "next_page": "<string>",
  "previous_page": "<string>",
  "group_size": <integer>,
  "total_count": <integer>,
}
```

* `next_page` url to next page in the set (null if there is not a next page)
* `previous` url to previous page in the set (null if there is not a previous page)
* `group_size` maximum number of items per page
* `total_count` total number of items found
