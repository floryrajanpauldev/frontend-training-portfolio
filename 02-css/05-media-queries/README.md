````markdown
# CSS Media Queries

Media queries allow CSS styles to change based on the viewport,
media type, orientation, and other conditions.

## Topics Covered

| Topic | Description | Example |
|---|---|---|
| Media Query | Applies CSS based on conditions | `@media ...` |
| `screen` | Applies styles to screens | `@media screen` |
| `print` | Applies styles when printing | `@media print` |
| `all` | Applies to all media types | `@media all` |
| `max-width` | Applies styles at or below a width | `max-width: 500px` |
| `min-width` | Applies styles at or above a width | `min-width: 768px` |
| Orientation | Detects portrait or landscape | `orientation: landscape` |
| `and` | Combines conditions | `and` |
| Comma | Represents OR between media conditions | `screen, print` |
| Breakpoints | Points where layout changes | `768px`, `1024px` |
| Mobile First | Starts with smaller screens | `min-width` |
| Desktop First | Starts with larger screens | `max-width` |
| Print Styles | Creates print-specific styling | `@media print` |

---

## Basic Syntax

```css
@media screen and (max-width: 500px) {

  h2 {
    color: red;
  }

}
````

The styles apply when the viewport is 500px wide or smaller.

---

## `min-width`

```css
@media screen and (min-width: 768px) {

  .container {
    max-width: 768px;
  }

}
```

The styles apply when the viewport is 768px wide or larger.

---

## `max-width`

```css
@media screen and (max-width: 768px) {

  .container {
    max-width: 640px;
  }

}
```

The styles apply when the viewport is 768px wide or smaller.

---

## Orientation

### Landscape

```css
@media screen and (orientation: landscape) {

  section {
    min-height: 150px;
  }

}
```

### Portrait

```css
@media screen and (orientation: portrait) {

  section {
    min-height: 200px;
  }

}
```

Conditions can also be combined:

```css
@media screen and (min-width: 501px)
       and (orientation: landscape) {

  section {
    min-height: 150px;
  }

}
```

---

# Mobile-First Approach

Mobile-first development starts with the design for smaller screens.

The base CSS handles the mobile layout.

Media queries using `min-width` progressively enhance the layout
for larger screens.

```text
Mobile
   ↓
475px
   ↓
640px
   ↓
768px
   ↓
1024px
   ↓
1536px
```

Example:

```css
.container {
  width: 100%;
}

@media screen and (min-width: 768px) {

  .container {
    max-width: 768px;
  }

}
```

### Common Breakpoints Used in This Example

```css
@media screen and (min-width: 475px) { }

@media screen and (min-width: 640px) { }

@media screen and (min-width: 768px) { }

@media screen and (min-width: 1024px) { }

@media screen and (min-width: 1536px) { }
```

These are example breakpoints, not device requirements.

Breakpoints should ultimately be chosen based on when the content
and layout need to change.

---

# Desktop-First Approach

Desktop-first development starts with the larger-screen design.

Media queries using `max-width` progressively adjust the layout
for smaller screens.

```text
Desktop
   ↓
1536px
   ↓
1280px
   ↓
1024px
   ↓
768px
   ↓
640px
   ↓
475px
```

Example:

```css
.container {
  width: 100%;
  max-width: 1536px;
}

@media screen and (max-width: 1024px) {

  .container {
    max-width: 768px;
  }

}
```

### Common Breakpoints Used in This Example

```css
@media screen and (max-width: 1536px) { }

@media screen and (max-width: 1280px) { }

@media screen and (max-width: 1024px) { }

@media screen and (max-width: 768px) { }

@media screen and (max-width: 640px) { }
```

---

# Mobile First vs Desktop First

| Approach      | Starts With     | Common Query |
| ------------- | --------------- | ------------ |
| Mobile First  | Smaller screens | `min-width`  |
| Desktop First | Larger screens  | `max-width`  |

## Recommended Approach

Mobile-first is generally preferred for responsive development.

Start with the simplest layout for smaller screens and progressively
enhance the design as more screen space becomes available.

---

# Print Media

Print-specific CSS can be created using:

```css
@media print {

  header,
  footer {
    display: none;
  }

}
```

This allows unnecessary screen elements to be removed from printed output.

---

# Accessibility

Responsive design should not remove important content or functionality
simply because the screen is smaller.

Keep the HTML structure logical and make sure navigation,
interactive elements, and content remain accessible.

When using CSS to change visual order or hide elements, consider
keyboard users and assistive technologies.

---

# Project Files

```text
05-media-queries/
├── mobile-first.html
├── desktop-first.html
├── style.css
├── desktop-first.css
└── README.md
```

## Practice

Open both HTML files and resize the browser window.

Compare how:

* `min-width` is used in the mobile-first approach.
* `max-width` is used in the desktop-first approach.
* Navigation changes at different breakpoints.
* Container widths change.
* Orientation affects the layout.
* Print styles change the page when printed.

```
```
