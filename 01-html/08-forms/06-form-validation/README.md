# Form Validation

HTML provides built-in form validation through attributes and input types. This allows the browser to check certain user input before the form is submitted, without requiring JavaScript.

## 1. `required`

The `required` attribute makes a form control mandatory.

```html
<input type="text" id="full-name" name="fullName" required>
```

The browser prevents submission when the required field is empty.

## 2. `minlength`

`minlength` specifies the minimum number of characters allowed for applicable text-entry controls.

```html
<input
  type="password"
  id="password"
  name="password"
  minlength="8"
>
```

In this example, the password must contain at least 8 characters.

## 3. `maxlength`

`maxlength` specifies the maximum number of characters allowed.

```html
<textarea
  id="comments"
  name="comments"
  maxlength="250"
></textarea>
```

The user can enter up to 250 characters.

## 4. `readonly`

The `readonly` attribute prevents the user from editing the value through the normal form control interface.

```html
<input
  type="text"
  id="account-number"
  name="accountNumber"
  value="123456789"
  readonly
>
```

Unlike `disabled`, a readonly form control can still be submitted with the form.

## 5. Input Types and Validation

HTML input types can provide built-in validation and appropriate input behavior.

For example:

```html
<input type="email" name="email" required>
```

The browser can check that the entered value conforms to the expected email format.

Other useful input types include:

* `text`
* `email`
* `password`
* `tel`
* `date`
* `number`
* `url`

The exact validation behavior depends on the input type.

## 6. Combining Validation Attributes

Multiple validation attributes can be used on the same control.

```html
<input
  type="password"
  id="password"
  name="password"
  required
  minlength="8"
  maxlength="20"
>
```

This field:

* Must contain a value.
* Must contain at least 8 characters.
* Cannot exceed 20 characters.

## 7. `reset` Button

A reset button restores form controls to their initial values.

```html
<button type="reset">Reset</button>
```

It is useful when a user wants to clear their changes and return the form to its starting state.

## Accessibility

Form validation should be designed with accessibility in mind.

Important practices include:

* Provide a `<label>` for form controls.
* Use appropriate input types.
* Use `required` when a field is actually mandatory.
* Provide clear instructions when specific input is expected.
* Do not rely only on color to communicate validation errors.
* Make validation messages understandable to users.

HTML's built-in validation is useful, but real applications may also need additional client-side and server-side validation.

## Client-Side vs. Server-Side Validation

HTML validation happens in the browser and provides immediate feedback to the user.

However, client-side validation should **not** be treated as a security mechanism.

A server should validate submitted data as well because users can bypass browser-side validation.

## Key Takeaways

* HTML provides built-in client-side form validation.
* `required` makes a field mandatory.
* `minlength` specifies a minimum character length.
* `maxlength` specifies a maximum character length.
* `readonly` prevents normal editing while allowing the value to be submitted.
* Input types such as `email` provide type-specific validation.
* Multiple validation attributes can be combined.
* `type="reset"` restores controls to their initial values.
* Client-side validation improves user experience but does not replace server-side validation.

## Practice

Try modifying the example:

1. Make the phone number required.
2. Change the password minimum length from `8` to `10`.
3. Change the comments maximum length from `250` to `100`.
4. Add `required` to the email field.
5. Add a `date` input and make it required.
6. Add a `number` input and experiment with `min` and `max`.
7. Try submitting the form with invalid values and observe the browser's validation messages.

## Interview Questions

### 1. What does the `required` attribute do?

It makes a form control mandatory before the form can be submitted.

### 2. What is the difference between `minlength` and `maxlength`?

`minlength` specifies the minimum number of characters, while `maxlength` specifies the maximum.

### 3. What is the purpose of `readonly`?

It prevents the user from editing the value through the normal control interface while allowing the value to remain part of form submission.

### 4. Is HTML form validation enough for application security?

No. Client-side validation can be bypassed. Server-side validation is also required for data integrity and security.

### 5. Does form validation require JavaScript?

No. HTML provides several built-in validation features through attributes and input types.

### 6. What is the difference between `readonly` and `disabled`?

`readonly` prevents editing but the control's value can still be submitted. A disabled control is not submitted with the form.

### 7. Why should we use the correct `input` type?

Appropriate input types can provide better user interfaces, device-specific input behavior, and built-in constraint validation.
