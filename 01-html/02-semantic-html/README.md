# Semantic HTML

This example demonstrates how semantic HTML5 elements can be used to give a web page meaningful structure.

## Concepts Covered

* Semantic HTML
* `<header>`
* `<nav>`
* `<main>`
* `<section>`
* `<footer>`
* `<div>`
* Navigation structure
* Accessibility

## What Is Semantic HTML?

Semantic HTML means choosing HTML elements based on the **meaning and purpose of the content** rather than using generic containers for everything.

HTML5 provides elements that describe different areas of a web page.

Examples include:

```html
<header>
<nav>
<main>
<section>
<footer>
```

These elements help browsers, developers, search engines, and assistive technologies better understand the structure of a page.

## Example Page Structure

```html
<header>
  <nav>
    <ul>
      <li><a href="#accounts">Accounts</a></li>
      <li><a href="#payments">Payments</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Customer Banking Portal</h1>

  <section id="accounts">
    <h2>My Accounts</h2>
    <p>View your account information.</p>
  </section>

  <section id="payments">
    <h2>Recent Payments</h2>
    <p>Review your recent payment activity.</p>
  </section>
</main>

<footer>
  <p>&copy; 2026 Example Banking Portal</p>
</footer>
```

## Common Semantic Elements

| Element     | Purpose                                                            |
| ----------- | ------------------------------------------------------------------ |
| `<header>`  | Introductory content for a page or section                         |
| `<nav>`     | A section containing navigation links                              |
| `<main>`    | The primary content of the document                                |
| `<section>` | Groups related content into a meaningful section                   |
| `<footer>`  | Footer information for a page or section                           |
| `<div>`     | Generic container when no more appropriate semantic element exists |

## Semantic HTML vs. `<div>`

Before HTML5 semantic elements became widely used, developers often relied heavily on generic `<div>` elements to structure pages.

Instead of:

```html
<div class="header">
  ...
</div>
```

we can use:

```html
<header>
  ...
</header>
```

The semantic element communicates the purpose of the content more clearly.

This does **not** mean that `<div>` should never be used. A `<div>` is useful when a generic container is needed and there is no appropriate semantic element.

## Accessibility

Semantic HTML provides meaningful structure that can help users of assistive technologies navigate a page.

For example, screen-reader users can use page landmarks such as:

* Header
* Navigation
* Main content
* Footer

Navigation regions can also be given accessible labels when a page contains more than one navigation area:

```html
<nav aria-label="Main navigation">
```

```html
<nav aria-label="Footer navigation">
```

## Key Takeaway

> Use HTML elements according to the meaning of the content. Use generic elements such as `<div>` when a semantic element is not appropriate.

## Related Topics

* HTML document structure
* Accessibility
* Headings
* Navigation
* `<section>`

## Reference

[MDN Web Docs — HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
