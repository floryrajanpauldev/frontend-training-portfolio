# HTML5 Lists

This example demonstrates the three main types of HTML lists and how lists can be used to structure navigation.

## Concepts Covered

* Unordered lists: `<ul>`
* Ordered lists: `<ol>`
* List items: `<li>`
* Description lists: `<dl>`, `<dt>`, `<dd>`
* Using lists within navigation
* Accessibility considerations

## Unordered List

Use an unordered list when the order of the items does not matter.

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

The browser normally displays unordered list items with bullets.

### Common Use Cases

* Navigation menus
* Features
* Categories
* Collections of related items

---

## Ordered List

Use an ordered list when the sequence or ranking of the items is important.

```html
<ol>
  <li>Plan the page</li>
  <li>Write the HTML</li>
  <li>Test the page</li>
</ol>
```

The browser normally displays the items using numbers.

Ordered lists can also represent different numbering styles, such as letters or Roman numerals.

---

## Description List

A description list is used for groups of terms and their associated descriptions or details.

```html
<dl>
  <dt>Favorite Color</dt>
  <dd>Red</dd>
  <dd>White</dd>

  <dt>Role</dt>
  <dd>Frontend Developer</dd>
</dl>
```

### Elements

| Element | Purpose                                       |
| ------- | --------------------------------------------- |
| `<dl>`  | Defines the description list                  |
| `<dt>`  | Defines a term/name                           |
| `<dd>`  | Provides the associated description or detail |

### Examples

Description lists can be useful for content such as:

* Frequently asked questions
* Terms and definitions
* Personal details
* Metadata or name/value information

The structure should be chosen based on the relationship between the terms and their descriptions.

---

## Lists in Navigation

A common pattern for navigation is to use a `<nav>` element containing a list of links:

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

Using a list communicates that the navigation links form a related collection of items.

## Accessibility

Lists provide meaningful structure to assistive technologies.

For navigation:

* Use `<nav>` for navigation sections.
* Use meaningful link text.
* Use `<ul>` when the navigation represents a collection of links.
* Use an accessible label such as `aria-label` when multiple navigation regions need to be distinguished.

## Key Takeaway

> Choose the type of list based on the meaning and relationship of the content, rather than simply how you want the list to look.

## Related Topics

* Semantic HTML
* Navigation
* Accessibility
* Links

## Reference

[MDN Web Docs — Lists](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements#content_sectioning)
