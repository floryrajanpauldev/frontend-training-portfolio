# Responsive CSS Boilerplate

A mobile-first responsive HTML and CSS boilerplate created as part of the Frontend Development Training.

The purpose of this example is to demonstrate how common CSS styles, CSS variables, utility styles, and responsive media queries can be organized into a reusable starting point for a web page.

## Project Structure

```text
07-responsive-boilerplate/
├── index.html
├── style.css
├── util.css
└── README.md
```

## HTML Setup

The HTML page uses a basic responsive document structure:

* `<!DOCTYPE html>`
* Semantic HTML elements
* Responsive viewport meta tag
* External CSS files
* Header
* Navigation
* Main content
* Sections
* Footer

The responsive viewport is enabled using:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## CSS Files

### style.css

Contains the main page styles:

* CSS reset
* `box-sizing`
* CSS custom properties
* Colors
* Font sizes
* Body styles
* Navigation styles
* Card styles
* Section styles
* Footer styles
* Reduced-motion accessibility
* Responsive styles

### util.css

Contains common reusable styles and responsive container breakpoints.

## CSS Custom Properties

Common application colors and sizes are stored in `:root`.

Example:

```css
:root {
  --color-black: #000;
  --color-orange: orange;
  --color-blue: blue;
  --color-dark-blue: darkblue;

  --size-base: 1rem;
  --size-lg: 1.125rem;
  --size-xlg: 1.25rem;
  --size-2xlg: 1.5rem;
}
```

The variables can then be reused throughout the stylesheet:

```css
color: var(--color-blue);
font-size: var(--size-lg);
```

This helps avoid repeating the same values throughout an application.

## CSS Reset

A basic reset is used to remove default browser margins and padding and to make the box model easier to work with.

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## Smooth Scrolling

```css
html {
  scroll-behavior: smooth;
}
```

This allows links to page sections to scroll smoothly.

## Responsive Design

This example follows a **mobile-first approach**.

The base CSS is written for smaller screens first. Media queries are then added for larger screen sizes.

### Breakpoints

| Breakpoint | Maximum Container Width |
| ---------- | ----------------------: |
| Base       |                    100% |
| 475px      |                   475px |
| 640px      |                   640px |
| 768px      |                   768px |
| 1024px     |                  1024px |
| 1536px     |                  1536px |

Example:

```css
@media screen and (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}
```

## Reduced Motion

CSS can respect a user's accessibility preference for reduced motion.

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

This reduces animations and transitions for users who have enabled reduced-motion settings.

## Responsive Navigation

The navigation starts with a mobile-friendly layout.

At larger screen sizes, Flexbox is used to place the logo, navigation, and button in a horizontal layout.

```css
@media screen and (min-width: 768px) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
```

## Responsive Cards

The cards are displayed vertically on smaller screens.

At larger screen sizes, CSS Grid is used to create three columns:

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

## Key Concepts Demonstrated

| Concept                  | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| CSS Reset                | Provides consistent starting styles            |
| `:root`                  | Stores reusable CSS custom properties          |
| CSS Variables            | Reuses colors and sizing values                |
| `rem`                    | Provides scalable font sizing                  |
| `box-sizing`             | Controls how element dimensions are calculated |
| `scroll-behavior`        | Enables smooth scrolling                       |
| Media Queries            | Creates responsive layouts                     |
| Mobile First             | Starts design with smaller screens             |
| Flexbox                  | Creates responsive navigation                  |
| Grid                     | Creates responsive card layouts                |
| `prefers-reduced-motion` | Supports accessibility preferences             |
| Utility CSS              | Stores reusable common styles                  |

## Learning Goal

This boilerplate demonstrates how individual CSS concepts can be combined to create a reusable foundation for responsive web development.
