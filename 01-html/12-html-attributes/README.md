# HTML Attributes

HTML attributes provide additional information about an HTML element or change how the element behaves.

Attributes are written inside the opening tag:

```html
<element attribute="value">
```

For example:

```html
<input type="text" id="username" name="username">
```

Here, `type`, `id`, and `name` are attributes.

---

## 1. `id`

The `id` attribute gives an element a unique identifier.

```html
<p id="intro">Welcome to HTML training.</p>
```

An `id` can be used for:

* Identifying a specific element
* CSS styling
* JavaScript
* Linking to a specific location on a page

Example:

```html
<a href="#intro">Go to Introduction</a>
```

An `id` should be unique within the page.

---

## 2. `class`

The `class` attribute assigns one or more class names to an element.

```html
<p class="highlight">Important information</p>
```

Classes are commonly used with CSS and JavaScript.

Multiple classes can be assigned:

```html
<p class="highlight important">Important information</p>
```

---

## 3. `title`

The `title` attribute provides additional advisory information about an element.

```html
<p title="This is additional information">
  Hover over this text.
</p>
```

Browsers commonly display the value as a tooltip when the user hovers over the element.

---

## 4. `lang`

The `lang` attribute identifies the language of the content.

```html
<html lang="en">
```

Another example:

```html
<p lang="fr">Bonjour tout le monde</p>
```

The language information can help browsers, search engines, and assistive technologies interpret the content correctly.

---

## 5. `hidden`

The `hidden` attribute indicates that an element is not currently relevant and should not be presented to the user.

```html
<p hidden>This content is hidden.</p>
```

The browser normally does not display the element.

---

## 6. `data-*`

Custom `data-*` attributes allow developers to store custom data on HTML elements.

```html
<div data-user-role="trainer">
  Training Information
</div>
```

Another example:

```html
<button data-user-id="123">
  View User
</button>
```

JavaScript can access these values through the element's `dataset` property.

---

# Form Attributes

HTML provides many attributes specifically for form controls.

## 7. `name`

The `name` attribute identifies a form control when form data is submitted.

```html
<input
  type="text"
  name="username"
>
```

The `name` attribute is especially important when sending form data to a server.

---

## 8. `value`

The `value` attribute specifies the initial value of a form control.

```html
<input
  type="text"
  name="username"
  value="Tina"
>
```

For many form controls, the value is included when the form is submitted.

---

## 9. `placeholder`

The `placeholder` attribute provides a short hint about what the user should enter.

```html
<input
  type="email"
  placeholder="Enter your email"
>
```

A placeholder is **not a replacement for a `<label>`**.

A label identifies the field, while a placeholder provides an example or hint.

---

## 10. `required`

The `required` attribute indicates that the user must provide a value before the form can be submitted.

```html
<input
  type="email"
  name="email"
  required
>
```

The browser performs built-in client-side validation when the form is submitted.

---

## 11. `readonly`

The `readonly` attribute prevents the user from editing the value of a supported form control.

```html
<input
  type="text"
  value="Tina"
  readonly
>
```

The user can generally focus and select the value, but cannot modify it.

A readonly form control's value can still be submitted with the form.

---

## 12. `disabled`

The `disabled` attribute makes a form control unavailable for interaction.

```html
<input
  type="text"
  value="Tina"
  disabled
>
```

A disabled control cannot normally be focused or edited by the user.

Its value is also not submitted with the form.

---

# `readonly` vs `disabled`

This is an important distinction to remember.

| Attribute  | Can edit? | Can interact/focus? | Submitted with form? |
| ---------- | --------- | ------------------- | -------------------- |
| `readonly` | No        | Generally yes       | Yes                  |
| `disabled` | No        | No                  | No                   |

Example:

```html
<input
  type="text"
  name="accountNumber"
  value="12345"
  readonly
>
```

The value can still be submitted.

Compare that with:

```html
<input
  type="text"
  name="accountNumber"
  value="12345"
  disabled
>
```

The value is not submitted with the form.

---

## 13. `maxlength`

`maxlength` specifies the maximum number of characters allowed for supported text-entry controls.

```html
<input
  type="text"
  maxlength="10"
>
```

The user cannot normally enter more than 10 characters.

---

## 14. `minlength`

`minlength` specifies the minimum number of characters required for supported text-entry controls.

```html
<input
  type="text"
  minlength="3"
>
```

The value must contain at least 3 characters for constraint validation to pass.

---

# Boolean Attributes

Some HTML attributes are boolean attributes.

For example:

```html
<input type="email" required>
```

You don't need:

```html
<input type="email" required="true">
```

The presence of the attribute indicates that it is enabled.

Examples include:

```html
required
readonly
disabled
hidden
multiple
checked
```

---

# Important Concepts

### `id` vs `class`

`id` identifies a particular element.

```html
<p id="intro">Introduction</p>
```

`class` can be shared by multiple elements.

```html
<p class="highlight">First</p>
<p class="highlight">Second</p>
```

### `placeholder` vs `value`

`placeholder` provides a hint:

```html
<input placeholder="Enter your name">
```

`value` provides the control's value:

```html
<input value="Tina">
```

### `readonly` vs `disabled`

`readonly` prevents editing but the value can still be submitted.

`disabled` prevents interaction and the value is not submitted.

---

# Key Takeaways

* Attributes provide additional information or behavior for HTML elements.
* Attributes are placed in the opening tag.
* `id` identifies an element.
* `class` groups elements for styling or scripting.
* `title` provides additional advisory information.
* `lang` identifies the language of content.
* `hidden` hides an element from normal rendering.
* `data-*` stores custom data on elements.
* `name` identifies form data during submission.
* `value` specifies a form control's value.
* `placeholder` provides an input hint.
* `required` makes a supported field mandatory.
* `readonly` prevents editing while allowing the value to be submitted.
* `disabled` prevents interaction and excludes the control from form submission.
* `maxlength` specifies a maximum character length.
* `minlength` specifies a minimum character length.

---

# Practice

Try the following:

1. Create an input with `id`, `class`, `name`, and `placeholder`.
2. Create a required email field.
3. Create a readonly account-number field.
4. Create a disabled field.
5. Create a username field with `minlength="3"` and `maxlength="10"`.
6. Create an element using a `data-*` attribute.
7. Create two elements sharing the same class.
8. Create an internal link using an element's `id`.

---

# Interview Questions

### 1. What is an HTML attribute?

An attribute provides additional information about an HTML element or changes its behavior.

### 2. What is the difference between `id` and `class`?

An `id` identifies a particular element and should be unique on the page. A class can be shared by multiple elements.

### 3. What is the difference between `readonly` and `disabled`?

A readonly control cannot be edited but its value can still be submitted. A disabled control cannot normally be interacted with and its value is not submitted.

### 4. Is `placeholder` a replacement for a label?

No. A placeholder is a hint; a label identifies the form control.

### 5. What is the purpose of `required`?

It indicates that the user must provide a value before the form can pass built-in constraint validation.

### 6. What is the purpose of `maxlength`?

It specifies the maximum number of characters allowed for supported text-entry controls.

### 7. What is the purpose of `minlength`?

It specifies the minimum number of characters required for supported text-entry controls.

### 8. What are `data-*` attributes?

They are custom HTML attributes used to store custom data associated with an element.

### 9. What is a boolean attribute?

A boolean attribute is generally enabled by its presence.

For example:

```html
<input required>
```

The presence of `required` means the field is required.
