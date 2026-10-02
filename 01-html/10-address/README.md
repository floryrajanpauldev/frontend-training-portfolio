# HTML Address Element

The HTML `<address>` element is a semantic element used for contact information related to a page, article, or the nearest section.

## Basic Example

```html
<address>
  Tina Smith<br>
  123 Main Street<br>
  Dayton, OH 45402
</address>
```

The `<br>` elements are used to place each part of the address on a separate line.

## Contact Information

`<address>` can also contain other types of contact information, such as email addresses and telephone numbers.

```html
<address>
  Contact us at
  <a href="mailto:info@example.com">info@example.com</a><br>

  Call us at
  <a href="tel:+15551234567">+1 (555) 123-4567</a>
</address>
```

## When to Use `<address>`

Use `<address>` when the content represents contact information associated with the relevant page or content.

Examples include:

* Author contact information
* Company contact information
* Business contact details
* Contact information displayed on a confirmation or information page

## When Not to Use `<address>`

The element should not be used simply because some text happens to contain a physical address.

For example, if an article is discussing the location of a historic building, that address is not necessarily contact information and does not automatically belong inside `<address>`.

The semantic purpose of the element is **contact information**, not simply "postal address."

## Accessibility and Semantics

Using `<address>` gives the content semantic meaning.

Semantic HTML helps browsers and assistive technologies understand the purpose of content instead of treating everything as a generic container.

## Key Takeaways

* `<address>` represents contact information.
* It can contain physical addresses, email addresses, telephone numbers, and other relevant contact details.
* It can be associated with a page, article, or the nearest section.
* It is not simply a replacement for displaying any postal address.
* It is a semantic HTML element.

## Practice

Try modifying the example:

1. Add a company name.
2. Add an email address.
3. Add a telephone number.
4. Create an author contact section using `<address>`.
5. Add links using `mailto:` and `tel:`.

## Interview Questions

### 1. What is the purpose of the `<address>` element?

It represents contact information related to the page, article, or nearest section.

### 2. Can `<address>` contain an email address?

Yes.

### 3. Can `<address>` contain a telephone number?

Yes.

### 4. Is `<address>` only used for postal addresses?

No. Its semantic purpose is contact information, which can include postal addresses, email addresses, telephone numbers, and other relevant contact details.

### 5. Is `<address>` a semantic HTML element?

Yes. It communicates the meaning and purpose of the contact information to browsers and assistive technologies.
