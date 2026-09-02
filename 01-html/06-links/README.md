# HTML5 Links and Anchors

This example demonstrates how to create links in HTML using the `<a>` (anchor) element. It covers external links, internal page navigation, opening links in a new browsing context, and telephone and email links.

## Concepts Covered

* `<a>` anchor element
* `href` attribute
* External links
* Internal page links
* Fragment identifiers (`#id`)
* `target` attribute
* `target="_blank"`
* `rel="noopener noreferrer"`
* Navigation links
* `tel:` links
* `mailto:` links
* Accessibility considerations

## Basic Link

The `<a>` element creates a hyperlink.

```html
<a href="https://example.com">Visit Example</a>
```

The `href` attribute specifies the destination of the link.

## External Links

External links can navigate users to another website.

```html
<a href="https://developer.mozilla.org/">
  Visit MDN Web Docs
</a>
```

## Opening a Link in a New Browsing Context

The `target="_blank"` attribute can be used when a link should open in a new browsing context.

```html
<a
  href="https://developer.mozilla.org/"
  target="_blank"
  rel="noopener noreferrer"
>
  Visit MDN Web Docs
</a>
```

### Common `target` Values

| Value     | Purpose                                 |
| --------- | --------------------------------------- |
| `_self`   | Opens in the current browsing context   |
| `_blank`  | Opens in a new browsing context         |
| `_parent` | Opens in the parent browsing context    |
| `_top`    | Opens in the top-level browsing context |

`_parent` and `_top` are primarily relevant when working with nested browsing contexts such as frames.

### Security Consideration

When using `target="_blank"` for external destinations, `rel="noopener noreferrer"` can be used to prevent the newly opened page from accessing the originating window through `window.opener` and to avoid sending the referrer in the request.

## Internal Page Links

A link can navigate to a specific section of the same page using a fragment identifier.

```html
<a href="#contact">Go to Contact</a>
```

The destination element has a matching `id`:

```html
<section id="contact">
  <h2>Contact</h2>
</section>
```

The `#contact` in the `href` points to the element with `id="contact"`.

### Example: Back to Top

```html
<header id="top">
  ...
</header>

<a href="#top">Back to top</a>
```

Internal links can be particularly useful on long pages because they allow users to move directly to important sections.

## Links in Navigation

Navigation commonly uses a combination of `<nav>`, `<ul>`, `<li>`, and `<a>`:

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="#accounts">Accounts</a></li>
    <li><a href="#payments">Payments</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

## Telephone Links

The `tel:` URI scheme can be used to create a clickable telephone link.

```html
<a href="tel:+15551234567">
  Call us
</a>
```

On supported devices, selecting the link can open the phone or dialer application.

## Email Links

The `mailto:` URI scheme can be used to create a link that opens the user's configured email application.

```html
<a href="mailto:info@example.com">
  Email us
</a>
```

A subject can also be included:

```html
<a href="mailto:info@example.com?subject=Training%20Question">
  Email us
</a>
```

## Accessibility Considerations

Links should have meaningful text that communicates their destination or purpose.

Prefer:

```html
<a href="/payment-history">View payment history</a>
```

Instead of:

```html
<a href="/payment-history">Click here</a>
```

Internal page links can also improve keyboard and assistive-technology navigation by allowing users to move directly to relevant sections.

When multiple navigation regions exist on a page, accessible labels can help distinguish them:

```html
<nav aria-label="Main navigation">
```

```html
<nav aria-label="Footer navigation">
```

## Key Takeaways

* Use `<a>` for navigation to another resource or location.
* Use `href` to specify the destination.
* Use fragment identifiers such as `#contact` for navigation within a page.
* Use meaningful link text.
* Use `tel:` for telephone links.
* Use `mailto:` for email links.
* Use `target="_blank"` thoughtfully when a new browsing context is appropriate.

## Related Topics

* Semantic HTML
* Navigation
* Accessibility
* HTML forms
* Document structure

## Reference

[MDN Web Docs — `<a>`: The Anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a)
