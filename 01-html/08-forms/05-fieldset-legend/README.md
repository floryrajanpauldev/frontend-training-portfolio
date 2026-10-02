# Fieldset and Legend

This example demonstrates how to group related form controls using the HTML `<fieldset>` and `<legend>` elements.

## 1. `<fieldset>`

The `<fieldset>` element is used to group related form controls together.

```html
<fieldset>
  <!-- related form controls -->
</fieldset>
```

It is especially useful when a form contains multiple groups of related inputs.

## 2. `<legend>`

The `<legend>` element provides a caption or title for a `<fieldset>`.

```html
<fieldset>
  <legend>Personal Information</legend>

  <!-- form controls -->
</fieldset>
```

The legend helps users understand what the group of controls represents.

## 3. Grouping Radio Buttons

Radio buttons that represent one question or choice should be grouped together.

```html
<fieldset>
  <legend>Preferred Contact Method</legend>

  <input type="radio" id="email" name="contactMethod" value="email">
  <label for="email">Email</label>

  <input type="radio" id="phone" name="contactMethod" value="phone">
  <label for="phone">Phone</label>
</fieldset>
```

The radio buttons share the same `name`, so the user can select only one option from this group.

## 4. Grouping Checkboxes

Checkboxes can also be grouped when they represent related choices.

```html
<fieldset>
  <legend>Interests</legend>

  <input type="checkbox" id="html" name="interests" value="html">
  <label for="html">HTML</label>

  <input type="checkbox" id="css" name="interests" value="css">
  <label for="css">CSS</label>

  <input type="checkbox" id="react" name="interests" value="react">
  <label for="react">React</label>
</fieldset>
```

Unlike radio buttons, multiple checkboxes can be selected.

## Accessibility

`<fieldset>` and `<legend>` provide a semantic relationship between a group of controls and its description.

This is particularly helpful for radio-button and checkbox groups because users of assistive technologies can understand what the group of controls is asking.

Individual controls should still have their own `<label>` elements.

For example:

```html
<fieldset>
  <legend>Preferred Contact Method</legend>

  <input type="radio" id="email" name="contactMethod" value="email">
  <label for="email">Email</label>
</fieldset>
```

Here:

* `<fieldset>` groups the controls.
* `<legend>` describes the group.
* `<label>` identifies the individual control.

## Key Takeaways

* Use `<fieldset>` to group related form controls.
* Use `<legend>` to provide a title or description for the group.
* `<fieldset>` and `<legend>` are especially useful for radio buttons and checkboxes.
* Radio buttons in the same group should share the same `name`.
* Checkboxes can have the same `name` when they represent multiple values in the same category.
* Individual form controls should still have associated labels.
* Semantic grouping improves form accessibility.

## Practice

Try modifying the example:

1. Add a new fieldset for "Address Information".
2. Add Street, City, State, and ZIP Code fields.
3. Add another radio-button option.
4. Add another checkbox.
5. Change the `<legend>` text and observe how it describes the group.

## Interview Questions

### 1. What is the purpose of `<fieldset>`?

It groups related form controls together.

### 2. What is the purpose of `<legend>`?

It provides a caption or description for a `<fieldset>`.

### 3. Why are fieldsets useful for radio buttons?

They provide a semantic group around related radio buttons and give the group a meaningful description.

### 4. Can checkboxes be placed inside a `<fieldset>`?

Yes. A fieldset can group any set of related form controls, including checkboxes.

### 5. What is the difference between `<legend>` and `<label>`?

`<legend>` describes the **group of controls**, while `<label>` identifies an **individual form control**.
