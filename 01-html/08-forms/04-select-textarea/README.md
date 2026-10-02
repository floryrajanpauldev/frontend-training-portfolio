# Select and Textarea

This example demonstrates how to use HTML `<select>`, `<option>`, and `<textarea>` elements in forms.

## 1. Select Element

The `<select>` element creates a selection control, commonly displayed as a drop-down list.

```html
<label for="payment-source">Payment Source</label>

<select id="payment-source" name="paymentSource">
  <option value="">-- Select an option --</option>
  <option value="checking">Checking Account</option>
  <option value="savings">Savings Account</option>
  <option value="credit-card">Credit Card</option>
</select>
```

### Important attributes

* `id` — uniquely identifies the element and connects it to the `<label>`.
* `name` — identifies the form field when form data is submitted.
* `<option>` — defines an individual choice.
* `value` — represents the value submitted for that option.

## 2. Multiple Selection

The `multiple` attribute allows the user to select more than one option.

```html
<select id="interests" name="interests" multiple>
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="javascript">JavaScript</option>
  <option value="react">React</option>
</select>
```

## 3. The `size` Attribute

The `size` attribute controls the number of options visible at one time.

```html
<select name="interests" multiple size="3">
```

In this example, three options are visible at once.

## 4. Textarea

The `<textarea>` element is used when the user needs to enter multiple lines of text.

Unlike `<input>`, `<textarea>` has an opening and closing tag.

```html
<label for="comments">Comments</label>

<textarea
  id="comments"
  name="comments"
  rows="5"
  cols="40"
></textarea>
```

### Common textarea attributes

* `rows` — controls the visible number of text lines.
* `cols` — controls the approximate visible width.
* `minlength` — specifies the minimum number of characters.
* `maxlength` — specifies the maximum number of characters.
* `placeholder` — provides a hint about what the user can enter.
* `required` — makes the field mandatory.

Example:

```html
<textarea
  id="comments"
  name="comments"
  rows="5"
  cols="40"
  minlength="10"
  maxlength="250"
  required
></textarea>
```

## Accessibility

Form controls should have associated labels.

```html
<label for="comments">Comments</label>
<textarea id="comments" name="comments"></textarea>
```

The `for` attribute on the label matches the `id` of the form control.

A placeholder should **not** be used as a replacement for a label.

## Key Takeaways

* Use `<select>` to provide a list of choices.
* Use `<option>` for individual choices.
* Use `multiple` when more than one selection is allowed.
* Use `size` to control how many options are visible.
* Use `<textarea>` for multi-line text.
* Use `rows` and `cols` to control the visible textarea dimensions.
* Use `minlength` and `maxlength` for text-length constraints.
* Always provide accessible labels for form controls.

## Practice

Try modifying the example:

1. Add another payment source.
2. Add two more interests.
3. Change `size` from `3` to `4`.
4. Change the textarea `maxlength` to `100`.
5. Add `required` to the textarea.
6. Remove the `<label>` and test the form using keyboard navigation or a screen reader. Then add it back and compare the experience.

## Interview Questions

### 1. What is the purpose of the `<select>` element?

It creates a control that allows the user to choose one or more options.

### 2. What is the purpose of `<option>`?

It defines an individual choice inside a `<select>` element.

### 3. How do you allow multiple selections?

Use the `multiple` attribute:

```html
<select multiple>
```

### 4. What is the difference between `<input>` and `<textarea>`?

`<input>` is generally used for single-line input, while `<textarea>` is designed for multi-line text.

### 5. Why should a `<textarea>` have a `<label>`?

The label identifies the purpose of the field and improves accessibility, especially for users relying on assistive technologies.
