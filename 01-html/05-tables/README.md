# HTML5 Tables

This example demonstrates how to structure tabular data using HTML5 table elements, with a focus on accessibility and meaningful table structure.

## Concepts Covered

* `<table>`
* `<caption>`
* `<thead>`
* `<tbody>`
* `<tfoot>`
* `<tr>`
* `<th>`
* `<td>`
* `scope`
* Accessible table structure

## When Should You Use a Table?

HTML tables should be used when information represents **tabular data**—data organized into rows and columns.

Examples include:

* Payment history
* Financial information
* Schedules
* Product comparisons
* Reports

Tables should not be used to create the visual layout of a web page.

## Basic Table Structure

A well-structured table can be organized into three main sections:

```html id="q86xq8"
<table>
  <caption>Recent Payment History</caption>

  <thead>
    <tr>
      <th scope="col">Payment Date</th>
      <th scope="col">Payment Source</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>August 15, 2026</td>
      <td>Checking Account</td>
      <td>$250.00</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td></td>
      <td>$750.00</td>
    </tr>
  </tfoot>
</table>
```

## Table Elements

| Element     | Purpose                                       |
| ----------- | --------------------------------------------- |
| `<table>`   | Defines the table                             |
| `<caption>` | Provides a title or description for the table |
| `<thead>`   | Contains header rows                          |
| `<tbody>`   | Contains the primary data                     |
| `<tfoot>`   | Contains summary/footer information           |
| `<tr>`      | Defines a table row                           |
| `<th>`      | Defines a header cell                         |
| `<td>`      | Defines a data cell                           |

## Accessibility

Tables need meaningful structure so that users of assistive technologies can understand the relationships between headers and data.

### Caption

The `<caption>` provides context about what the table represents.

```html id="s0eq7g"
<caption>Recent Payment History</caption>
```

In some designs, a caption may need to be visually hidden while remaining available to assistive technologies. When doing this, avoid using `display: none` because that can remove the content from the accessibility tree.

### Table Headers

Use `<th>` for cells that act as headers rather than using `<td>` for everything.

```html id="hkwjpr"
<th scope="col">Payment Date</th>
```

The `scope="col"` attribute indicates that the header applies to the cells in that column.

For a row header:

```html id="tx1q2c"
<th scope="row">Total</th>
```

### Why This Matters

A table may look correct visually while still lacking the semantic information needed by screen-reader users.

Using `<caption>`, `<th>`, and appropriate `scope` values helps communicate the table's structure.

## Key Takeaway

> Use tables for data that naturally belongs in rows and columns, and use semantic table elements to communicate relationships between headers and data.

## Related Topics

* Semantic HTML
* Accessibility
* Forms
* Lists

## Reference

[MDN Web Docs — `<table>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table)

[MDN Web Docs — `<caption>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption)

[MDN Web Docs — `<th>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th)
