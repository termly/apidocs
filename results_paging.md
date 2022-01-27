# Overview

Result sets with more than 25 results will be automatically partitioned into groups, and will follow these rules:

- If not specified, the group size will be 25;
- The group size can be specified along with the query objects;
- The group size is limited to a maximum of 25;
- The group size is limited to a minimum of 1;

The response will contain data that allows paging through the results. The JSON shape is:

```JSON
{
  "next_results": "<string>",
  "previous_results": "<string>"
}
```

* `next_results` url to next page in the set (null if there is not a next page)
* `previous_results` url to previous page in the set (null if there is not a previous page)
