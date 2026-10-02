# HTML Input Types

This example demonstrates several commonly used HTML `<input>` types and their purposes in forms.

## Concepts Covered

* `type="text"`
* `type="password"`
* `type="date"`
* `type="tel"`
* `type="file"`
* `type="button"`
* `type="submit"`
* `type="reset"`
* Labels and accessibility

## Common Input Types

### Text

```html
<input type="text" id="name" name="name">
```

Used for general text input such as a person's name.

### Password

```html
<input type="password" id="password" name="password">
```

Used for password input. Browsers typically obscure the characters visually.

> Obscuring the characters on screen is not the same as encrypting the password. Secure handling of passwords also requires appropriate server-side security.

### Date

```html
<input type="date" id="payment-date" name="paymentDate">
```

Provides a date input control. On supported browsers and devices, users may see a date picker.

A date input can be useful for information such as payment dates, appointment dates, or dates of birth.

### Telephone

```html
<input type="tel" id="phone" name="phone">
```

Used for telephone numbers.

On some mobile devices, using `type="tel"` can provide a telephone-optimized keyboard.

### File

```html
<input type="file" id="document" name="document">
```

Allows users to select a file from their device.

When building a real file-upload form, additional server-side handling and appropriate form configuration may be required.

## Button Types

### Regular Button

```html
<input type="button" value="Regular Button">
```

Creates a button that does not submit the form automatically.

It can be used with JavaScript to perform an action.

### Submit

```html
<input type="submit" value="Submit Form">
```

Submits the form.

A modern alternative is:

```html
<button type="submit">Submit Form</button>
```

### Reset

```html
<input type="reset" value="Reset Form">
```

Resets form controls to their initial values.

Reset buttons should be used thoughtfully because users can accidentally clear information they have entered.

## Labels and Accessibility

User-facing form controls should have an associated label.

```html
<label for="phone">Telephone</label>
<input type="tel" id="phone" name="phone">
```

The `for` attribute matches the input's `id`.

This provides a clear relationship between the label and the form control and helps users of assistive technologies understand what information is expected.

## Key Takeaway

> Choose an input type based on the kind of information the user needs to provide. Appropriate input types improve usability, validation, and the experience on different devices.

## Related Topics

* HTML forms
* Form validation
* Labels
* Radio buttons
* Checkboxes
* Select controls
* Accessibility

## Reference

[MDN Web Docs — `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)

[MDN Web Docs — Input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)
