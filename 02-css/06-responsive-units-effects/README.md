````markdown
# Responsive Units and CSS Effects

This module covers responsive CSS units, modern CSS functions,
transitions, transforms, animations, and text overflow handling.

---

## Topics Covered

| Topic | What I Learned | Example |
|---|---|---|
| `%` | Relative to the size of the containing element. | `width: 75%;` |
| `rem` | Relative to the root (`html`) font size. | `font-size: 2rem;` |
| `em` | Relative to the font size of the current context. | `padding: 1em;` |
| `vw` | 1% of the viewport width. | `width: 50vw;` |
| `vh` | 1% of the viewport height. | `height: 50vh;` |
| `calc()` | Performs calculations between CSS values. | `width: calc(100% - 20px);` |
| `min()` | Uses the smallest value from the supplied options. | `width: min(100%, 300px);` |
| `max()` | Uses the largest value from the supplied options. | `width: max(200px, 50%);` |
| `clamp()` | Sets a minimum, preferred, and maximum value. | `clamp(1rem, 2vw, 2rem)` |
| Transitions | Creates smooth changes between CSS states. | `transition: transform .3s;` |
| Transforms | Changes an element's position, size, or rotation. | `translate()`, `scale()`, `rotate()` |
| Animations | Creates repeated or timed CSS animations. | `@keyframes` |
| `overflow` | Controls content that exceeds an element's box. | `overflow: hidden;` |
| `text-overflow` | Controls how overflowing text is displayed. | `text-overflow: ellipsis;` |
| `white-space` | Controls how whitespace and wrapping are handled. | `white-space: nowrap;` |
| `overflow-wrap` | Allows long words to break when necessary. | `overflow-wrap: break-word;` |

---

# Responsive Units

## Percentage `%`

Percentages are generally relative to the size of the
containing element.

```css
.container {
  width: 75%;
}
````

---

## `rem`

`rem` is relative to the font size of the root `html` element.

If:

```css
html {
  font-size: 16px;
}
```

Then:

```text
1rem  = 16px
2rem  = 32px
3rem  = 48px
```

Example:

```css
.heading {
  font-size: 2rem;
}
```

`rem` is useful for creating scalable and consistent sizing.

---

## `em`

`em` is relative to the font size of the current element's
context.

Example:

```css
.box {
  font-size: 1.2em;
  padding: 1em;
}
```

Unlike `rem`, the value of `em` can change depending on
the font size inherited from its context.

---

## Viewport Units

### `vw`

`vw` means viewport width.

```css
.container {
  width: 50vw;
}
```

`1vw` represents 1% of the viewport width.

### `vh`

`vh` means viewport height.

```css
.hero {
  min-height: 50vh;
}
```

`1vh` represents 1% of the viewport height.

---

# CSS Functions

## `calc()`

`calc()` allows mathematical calculations.

```css
.container {
  width: calc(100% - 40px);
}
```

It can combine different CSS units.

---

## `min()`

`min()` returns the smallest value.

```css
.container {
  width: min(90%, 1200px);
}
```

This is useful for responsive containers.

---

## `max()`

`max()` returns the largest value.

```css
.container {
  width: max(200px, 50%);
}
```

---

## `clamp()`

`clamp()` takes three values:

```text
clamp(minimum, preferred, maximum)
```

Example:

```css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

This allows the font size to grow with the viewport while
remaining within the minimum and maximum limits.

---

# Transitions

Transitions create smooth changes between CSS states.

Example:

```css
button {
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}
```

Common transition properties include:

```text
transition-property
transition-duration
transition-timing-function
transition-delay
```

Shorthand:

```css
transition: transform 0.3s ease;
```

---

# Transforms

Transforms allow an element to be visually changed without
changing the normal document flow.

## Translate

Moves an element.

```css
.box {
  transform: translate(20px, -10px);
}
```

## Scale

Changes the size of an element.

```css
.box {
  transform: scale(1.2);
}
```

## Rotate

Rotates an element.

```css
.box {
  transform: rotate(15deg);
}
```

Multiple transforms can also be combined:

```css
.box {
  transform: translateX(20px) scale(1.1) rotate(5deg);
}
```

---

# Animations

CSS animations use `@keyframes`.

```css
.box {
  animation: move-box 3s ease-in-out infinite alternate;
}

@keyframes move-box {

  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(150px);
  }

}
```

Important animation properties include:

```text
animation-name
animation-duration
animation-timing-function
animation-delay
animation-iteration-count
animation-direction
animation-fill-mode
```

---

# Overflow and Text Handling

## `overflow`

Controls content that extends outside an element's box.

```css
.container {
  overflow: auto;
}
```

Common values:

```text
visible
hidden
scroll
auto
```

Individual directions can also be controlled:

```css
overflow-x: auto;
overflow-y: auto;
```

---

## `white-space`

Controls how whitespace and line wrapping are handled.

```css
.text {
  white-space: nowrap;
}
```

`nowrap` prevents text from wrapping to another line.

---

## `text-overflow`

Often used with `overflow` and `white-space` to display
an ellipsis for overflowing text.

```css
.text {
  width: 300px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

The result can display something similar to:

```text
This is a very long piece of text...
```

---

## `overflow-wrap`

Allows long words to break when necessary.

```css
.text {
  overflow-wrap: break-word;
}
```

This is useful when dealing with long technical terms,
URLs, or other content that could overflow its container.

---

# Responsive Design

Responsive units and CSS functions can be combined to
create flexible layouts.

Example:

```css
.container {
  width: min(90%, 1200px);
}

h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

This allows the layout and typography to adapt to different
screen sizes without requiring many individual breakpoints.

---

# Accessibility

Animations and transitions should not create problems for
users who prefer reduced motion.

A production application can respect the user's operating
system preference:

```css
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

}
```

Avoid using animation as the only way to communicate important
information.

---

# Project Structure

```text
02-css/
├── 01-css-fundamentals/
├── 02-position-background-typography/
├── 03-flexbox/
├── 04-grid/
├── 05-media-queries/
└── 06-responsive-units-effects/
    ├── index.html
    ├── style.css
    └── README.md
```

---

# Practice Checklist

* [x] Percentage units
* [x] `rem`
* [x] `em`
* [x] `vw`
* [x] `vh`
* [x] `calc()`
* [x] `min()`
* [x] `max()`
* [x] `clamp()`
* [x] Transitions
* [x] Transforms
* [x] `@keyframes`
* [x] Animations
* [x] `overflow`
* [x] `text-overflow`
* [x] `white-space`
* [x] `overflow-wrap`
* [x] Responsive design
* [x] `prefers-reduced-motion`

```
```
