# Block vs. Inline Elements

This example demonstrates the difference between block-level and inline elements in HTML.

## Concepts Covered

* Block-level elements
* Inline elements
* `<div>`
* `<p>`
* `<span>`

## Block-Level Elements

Block-level elements normally start on a new line and occupy the available width of their container.

Examples:

```html
<div>First block</div>
<div>Second block</div>

<p>First paragraph</p>
<p>Second paragraph</p>
```

## Inline Elements

Inline elements normally flow within the surrounding content and occupy only the space they need.

Example:

```html
<p>
  This is a paragraph with
  <span>an inline element</span>
  inside it.
</p>
```

## Key Difference

| Block                               | Inline                                  |
| ----------------------------------- | --------------------------------------- |
| Normally starts on a new line       | Normally stays within the current line  |
| Typically takes the available width | Typically takes only the space it needs |
| Example: `<div>`, `<p>`             | Example: `<span>`                       |

> **Note:** These are the default rendering behaviors. CSS can change an element's `display` behavior.

## Why This Matters

Understanding block and inline behavior helps developers create and structure web pages correctly. It also provides a foundation for understanding CSS layout and the `display` property.

## Accessibility Note

`<div>` and `<span>` are generic containers and do not provide meaningful semantic information by themselves. When a more meaningful HTML element exists, prefer the semantic element.

For example:

```html
<header>...</header>
```

is more meaningful than:

```html
<div class="header">...</div>
```

## Related Topics

* Semantic HTML
* CSS `display` property
* HTML document structure

## Reference

* [MDN Web Docs — HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
