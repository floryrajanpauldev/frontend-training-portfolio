# HTML Headings

HTML provides six levels of headings, from `<h1>` through `<h6>`. Headings help organize the content of a web page into a clear hierarchy.

## Heading Levels

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

`<h1>` represents the highest heading level, while `<h6>` represents the lowest.

## Heading Hierarchy

Headings should create a logical outline for the page.

For example:

```text
H1 — HTML Training Guide
 ├── H2 — HTML Fundamentals
 │    ├── H3 — Document Structure
 │    └── H3 — Semantic HTML
 │
 └── H2 — Forms
      ├── H3 — Form Controls
      └── H3 — Form Validation
```

A heading level should be chosen based on the content's place in the hierarchy, not simply because of how large the text looks.

## `<h1>`

The `<h1>` should normally identify the main topic of the page.

Example:

```html
<h1>HTML Training Guide</h1>
```

For a typical page, using one clear `<h1>` is a good practice.

## `<h2>` and Below

Use lower-level headings to organize sections and subsections.

```html
<h1>HTML Training Guide</h1>

<h2>HTML Fundamentals</h2>

<h3>Document Structure</h3>

<h3>Semantic HTML</h3>

<h2>Forms</h2>

<h3>Form Controls</h3>

<h3>Form Validation</h3>
```

Here, the `<h3>` elements are subsections of their corresponding `<h2>` sections.

## Accessibility

Headings provide important structure for assistive technology.

Screen-reader users can navigate by headings to quickly find sections of a page.

A logical heading hierarchy therefore makes the page easier to understand and navigate.

## Don't Use Headings Just for Styling

Avoid choosing a heading level simply because the browser displays it at the desired size.

For example, don't use:

```html
<h1>This text needs to look large</h1>
```

when the text isn't actually the main heading.

Use CSS to control visual appearance:

```css
.heading {
  font-size: 2rem;
}
```

The HTML element should describe the semantic importance of the content.

## Best Practices

* Use headings to describe page sections.
* Use `<h1>` for the main page topic.
* Use `<h2>` for major sections.
* Use `<h3>` and lower levels for subsections.
* Maintain a logical hierarchy.
* Don't choose heading levels based only on visual appearance.
* Don't use headings as generic containers for styling.
* Avoid unnecessarily skipping heading levels.

## Key Takeaways

* HTML has six heading levels: `<h1>` through `<h6>`.
* `<h1>` is the highest heading level.
* `<h6>` is the lowest heading level.
* Headings provide semantic structure.
* Headings are important for accessibility and navigation.
* One clear `<h1>` is a good practical guideline for a typical page.
* CSS should be used to control the visual size of headings.

## Practice

Try modifying the example:

1. Change the `<h1>` text to describe the page more accurately.
2. Add another `<h2>` section.
3. Add `<h3>` subsections under the new `<h2>`.
4. Try changing an `<h3>` to an `<h5>` and observe the hierarchy.
5. Use CSS to make an `<h3>` visually larger without changing its semantic level.

## Interview Questions

### 1. How many heading levels are available in HTML?

Six: `<h1>` through `<h6>`.

### 2. Which heading has the highest level?

`<h1>`.

### 3. Why are headings important for accessibility?

They provide structure and allow assistive-technology users, including screen-reader users, to navigate content more efficiently.

### 4. Should headings be used only to make text larger?

No. Heading elements should be selected based on the semantic structure of the content. CSS should be used for visual sizing.

### 5. Should a page have an `<h1>`?

A typical page should have a clear main heading, and using one `<h1>` is a good practical best practice.

### 6. What is the relationship between `<h2>` and `<h3>`?

An `<h3>` normally represents a subsection within the preceding `<h2>` section.
