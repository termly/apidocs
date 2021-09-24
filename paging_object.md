# Overview

Large result sets will be served back on separate pages.  The paging object is meta data about the pages that are sent back.  The JSON shape is:

```JSON
{
  "count": "<integer>",
  "current_page": "<integer>",
  "next_page": "<string>",
  "previous_page": "<string>",
  "per_page": "<integer>",
  "total_count": "<integer>",
  "total_pages": "<integer>"
}
```

* `count` number of items in the current page
* `current_page` the current page number
* `next_page` url to next page in the set (null if there is not a next page)
* `previous` url to previous page in the set (null if there is not a previous page)
* `per_page` maximum number of items per page (default is 25)
* `total_count` total number of items found
* `total_pages` total number of pages in the request