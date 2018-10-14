
# ezbank

I needed a quick way to see where my money was going over the course of a year. Bank statements contain that info, but it's a tedious job to sift through them manually. This little app does the job of showing cumulative expenses for a given company/product, e.g. Uber, Amazon, Netflix, etc. from multiple bank statements. It only works for Wells Fargo bank statements.

A native dependency called `pdftotext` is required. It can be installed via `brew install poppler` on OSX. Otherwise check out the page here: https://github.com/nisaacson/pdf-text-extract.

Create a directory and place Wells Fargo bank statements in there, then run:

``` js
node . <dir_with_pdf_files>
```

A list of sorted results will be displayed like so:
```
    ...
    {
        "desc": "FedloanservicingStdnt",
        "total": 1234, // floored dollar amount
        "count": 7 // number of occurrences
    },
    {
        "desc": "UberTrip",
        "total": 2345,
        "count": 14
    },
    {
        "desc": "AmazonWeb",
        "total": 3456,
        "count": 21
    },
    ...
```

The grouping algorithm is rudimentary- it groups by the first two words of the description- since there tends to be a random invoice number after that.

