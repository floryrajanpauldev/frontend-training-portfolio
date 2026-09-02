# Radio Buttons and Checkboxes

This example demonstrates how radio buttons and checkboxes are used in HTML forms, including how to group related controls and make them accessible.

## Concepts Covered

* `type="radio"`
* `type="checkbox"`
* The `name` attribute
* The `value` attribute
* `<label>`
* `<fieldset>`
* `<legend>`
* Form accessibility

## Radio Buttons

Radio buttons are used when the user should select **one option from a group of mutually exclusive choices**.

```html id="b2f50a"
<input
  type="radio"
  id="coffee"
  name="drink"
  value="coffee"
>

<label for="coffee">Coffee</label>
```

### Grouping Radio Buttons

Radio buttons are grouped using the same `name` value:

```html id="r1a1fa"
<input type="radio" name="drink" value="coffee">
<input type="radio" name="drink" value="tea">
<input type="radio" name="drink" value="cola">
```

Because these controls have the same `name`, the browser treats them as one group and allows the user to select only one option.

Each radio button should still have its own unique `id` when using an associated `<label>`.

## Checkboxes

Checkboxes are used when the user can select **zero, one, or multiple options**.

```html id="9c0qcc"
<input
  type="checkbox"
  id="html"
  name="interests"
  value="html"
>

<label for="html">HTML</label>
```

Multiple checkboxes can be selected:

```text
☑ HTML
☑ CSS
☐ JavaScript
```

## `name` vs. `value`

The `name` and `value` attributes serve different purposes when form data is submitted.

```html id="dsg9h2"
<input
  type="radio"
  name="drink"
  value="coffee"
>
```

* `name` identifies the form field/group.
* `value` represents the value submitted when that option is selected.

## Grouping Related Controls

Use `<fieldset>` to group related form controls and `<legend>` to provide a caption or accessible name for the group.

```html id="r91bvy"
<fieldset>
  <legend>Choose Your Favorite Drink</legend>

  <input type="radio" id="coffee" name="drink" value="coffee">
  <label for="coffee">Coffee</label>

  <input type="radio" id="tea" name="drink" value="tea">
  <label for="tea">Tea</label>
</fieldset>
```

This is particularly useful for groups of radio buttons and checkboxes.

## Accessibility

Accessible radio buttons and checkboxes should have:

* An associated `<label>`
* A unique `id` for each control
* A meaningful `name`
* Related controls grouped appropriately
* `<fieldset>` and `<legend>` when a group needs a shared description

For example:

```html id="dbwhj5"
<fieldset>
  <legend>Choose Your Favorite Drink</legend>
  ...
</fieldset>
```

This gives users additional context about what the group of controls represents.

## Common Mistake

### Incorrect radio grouping

```html id="dy5l3d"
<input type="radio" name="coffee">
<input type="radio" name="tea">
<input type="radio" name="cola">
```

These controls have different names, so the browser treats them as separate groups.

### Correct grouping

```html id="1jps3c"
<input type="radio" name="drink" value="coffee">
<input type="radio" name="drink" value="tea">
<input type="radio" name="drink" value="cola">
```

## Key Takeaway

> Use radio buttons when only one option can be selected from a group. Use checkboxes when multiple selections are allowed.

## Related Topics

* HTML forms
* Form labels
* `<fieldset>` and `<legend>`
* Form validation
* Accessibility

## Reference

[MDN Web Docs — `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)

[MDN Web Docs — `<fieldset>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset)

[MDN Web Docs — `<legend>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend)
