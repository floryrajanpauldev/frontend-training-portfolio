# Pre and Code

The HTML `<pre>` and `<code>` elements are commonly used when displaying computer code or other preformatted text.

## 1. The `<pre>` Element

`<pre>` represents preformatted text.

Whitespace and line breaks inside the element are preserved.

```html
<pre>
This text
    has spaces
        and line breaks
            that are preserved.
</pre>
```

Unlike normal HTML text, the browser preserves the whitespace inside `<pre>`.

## 2. The `<code>` Element

The `<code>` element represents a fragment of computer code.

For example:

```html
<p>Use <code>const</code> to declare a constant.</p>
```

`<code>` is useful for short, inline pieces of code.

## 3. Using `<pre>` and `<code>` Together

For larger blocks of source code, `<pre>` and `<code>` are commonly used together.

```html
<pre><code>function greet(name) {
  console.log("Hello, " + name);
}

greet("Tina");</code></pre>
```

Here, the two elements have different purposes:

* `<code>` identifies the content as computer code.
* `<pre>` preserves the formatting and whitespace.

## 4. Inline Code

For a short piece of code within a paragraph, `<code>` can be used by itself.

```html
<p>
  Use <code>const</code> to declare a constant in JavaScript.
</p>
```

Another example:

```html
<p>
  The <code>&lt;section&gt;</code> element represents a section of content.
</p>
```

## When to Use `<pre>`

`<pre>` is useful when whitespace and line breaks are meaningful and need to be preserved.

Common examples include:

* Source code
* ASCII art
* Preformatted text
* Text where spacing is significant

## When to Use `<code>`

Use `<code>` when representing computer code.

It can be used:

* Inline within a paragraph
* Inside a `<pre>` element for larger code blocks

## Accessibility and Semantics

These elements provide semantic information about the content.

Using `<code>` communicates that the content represents computer code rather than ordinary text.

Using `<pre>` communicates that the whitespace and formatting of the content are significant.

## Key Takeaways

* `<pre>` represents preformatted text.
* `<pre>` preserves whitespace and line breaks.
* `<code>` represents computer code.
* `<code>` can be used for inline code.
* `<pre>` and `<code>` are commonly combined for code blocks.
* `<pre>` handles formatting preservation while `<code>` provides the semantic meaning that the content is code.

## Practice

Try modifying the example:

1. Add a JavaScript function.
2. Add an HTML code example.
3. Add a CSS code example.
4. Display the code using `<pre><code>...</code></pre>`.
5. Add an inline `<code>` example inside a paragraph.
6. Add spaces and line breaks inside `<pre>` and observe how the browser preserves them.

## Interview Questions

### 1. What is the purpose of `<pre>`?

It represents preformatted text where whitespace and line breaks are preserved.

### 2. What is the purpose of `<code>`?

It represents a fragment of computer code.

### 3. Why are `<pre>` and `<code>` often used together?

`<code>` identifies the content as computer code, while `<pre>` preserves its formatting and whitespace.

### 4. Can `<code>` be used without `<pre>`?

Yes. `<code>` can be used for short, inline pieces of code.

### 5. Does `<pre>` automatically mean the content is computer code?

No. `<pre>` means the text is preformatted. If the content is source code, `<code>` can be used with it to provide the appropriate semantic meaning.
