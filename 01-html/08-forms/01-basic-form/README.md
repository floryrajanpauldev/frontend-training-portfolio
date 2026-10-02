# Basic HTML Form

This example demonstrates the basic structure of an HTML form and shows how labels and form controls are associated for accessibility.

## Concepts Covered

* `<form>`
* `action`
* `method`
* `<label>`
* `<input>`
* `type="text"`
* `type="email"`
* `type="password"`
* `id`
* `name`
* Submit button
* Form accessibility

## Basic Form Structure

HTML form controls should be placed inside a `<form>` element when they are part of a form submission.

```html id="uwp5ga"
<form action="#" method="post">
  ...
</form>
```

### `action`

The `action` attribute specifies where the form data should be submitted.

```html id="b80eyq"
<form action="/submit" method="post">
```

### `method`

The `method` attribute specifies how the form data is submitted.

Common methods include:

* `get`
* `post`

The appropriate method depends on the purpose of the form and how the server processes the data.

## Labels and Form Controls

Every user-facing form control should have an associated label.

```html id="9w1a2x"
<label for="full-name">Full Name</label>

<input
  type="text"
  id="full-name"
  name="fullName"
>
```

The `for` attribute of the `<label>` matches the `id` of the `<input>`.

This association helps users understand what information should be entered and is particularly important for accessibility.

## `id` vs. `name`

These attributes serve different purposes.

### `id`

The `id` uniquely identifies the element within the document and can be used to associate a `<label>` with a form control.

```html id="c6ij5m"
<label for="email">Email Address</label>

<input id="email">
```

### `name`

The `name` identifies the form field when its value is submitted as part of the form data.

```html id="7k6k4p"
<input
  type="email"
  id="email"
  name="email"
>
```

## Common Input Types

### Text

```html id="3pybci"
<input type="text">
```

Used for general text input such as names.

### Email

```html id="wykk8w"
<input type="email">
```

Used for email addresses and provides built-in browser validation for email-like input.

### Password

```html id="g8ml15"
<input type="password">
```

Used for password input. Browsers typically obscure the entered characters visually.

## Submit Button

A form can be submitted using a button:

```html id="g5tjmx"
<button type="submit">Submit</button>
```

An alternative is:

```html id="8b3zjt"
<input type="submit" value="Submit">
```

Both approaches are valid.

## Accessibility

Good form accessibility includes:

* Providing labels for form controls.
* Associating labels with controls using `for` and `id`.
* Using appropriate input types.
* Providing clear instructions when additional information is needed.
* Making sure form controls can be reached and operated using the keyboard.

## Key Takeaway

> A well-structured form uses meaningful labels, appropriate input types, and correctly associated form controls.

## Related Topics

* Form validation
* Radio buttons
* Checkboxes
* Select controls
* Textareas
* Fieldsets and legends
* Accessibility

## Reference

[MDN Web Docs — `<form>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)

[MDN Web Docs — `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)

[MDN Web Docs — `<label>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label)
