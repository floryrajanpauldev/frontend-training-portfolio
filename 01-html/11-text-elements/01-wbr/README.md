# `<wbr>` — Word Break Opportunity

The HTML `<wbr>` element represents a **word break opportunity**.

It tells the browser where a long word, URL, or unbroken string **may be broken if necessary** to fit the available space.

## Basic Example

```html
super<wbr>long<wbr>training<wbr>example
```

The browser does not necessarily break the text at these locations. It may use them when the available space is too narrow to display the complete string.

## `<wbr>` vs `<br>`

These two elements have different purposes.

### `<br>`

`<br>` forces a line break.

```html
This is line one<br>
This is line two
```

The browser will move the second line to a new line.

### `<wbr>`

`<wbr>` provides an optional break opportunity.

```html
super<wbr>long<wbr>word
```

The browser can break the word at one of those locations if needed.

## Long URLs and Links

`<wbr>` can be useful when displaying very long URLs or other strings that do not naturally contain spaces.

```html
<a href="https://example.com">
  https://example.com/very<wbr>long<wbr>page<wbr>name<wbr>with<wbr>many<wbr>characters
</a>
```

This gives the browser possible locations where the URL can wrap instead of allowing the long string to cause unwanted horizontal overflow.

## Why Use `<wbr>`?

It can help with:

* Very long words
* Long URLs
* Long identifiers
* Other unbroken strings
* Responsive layouts where text needs an opportunity to wrap

## Important Point

`<wbr>` does **not** force a line break.

It simply tells the browser:

> This is an acceptable place to break the text if necessary.

## Key Takeaways

* `<wbr>` stands for **Word Break Opportunity**.
* It provides an optional location for a line break.
* It is useful for long, unbroken strings.
* It can help prevent long text from causing horizontal overflow.
* `<br>` forces a line break, while `<wbr>` only allows one when needed.

## Practice

Try modifying the example:

1. Add more `<wbr>` elements to a long word.
2. Resize the browser window and observe when the text wraps.
3. Create a very long URL and add `<wbr>` at appropriate locations.
4. Compare the behavior of `<br>` and `<wbr>`.
5. Remove all `<wbr>` elements and observe the difference on a narrow screen.

## Interview Questions

### 1. What does `<wbr>` stand for?

Word Break Opportunity.

### 2. Does `<wbr>` force a line break?

No. It provides an optional location where the browser may break the text.

### 3. What is the difference between `<br>` and `<wbr>`?

`<br>` forces a line break, while `<wbr>` only provides an opportunity for the browser to break the text when necessary.

### 4. When would you use `<wbr>`?

It can be useful for long words, URLs, identifiers, or other unbroken strings that may not wrap naturally.

### 5. Is `<wbr>` useful for responsive web pages?

Yes. It can provide possible break points for long strings and help prevent unwanted horizontal overflow.
