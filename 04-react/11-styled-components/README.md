# Styled Components

Styled Components is a CSS-in-JS library that allows us to create styled React components.

Instead of maintaining CSS classes separately, we can define the styles along with the component.

## Installation

```bash
npm install styled-components
```

For Emotion:

```bash
npm install @emotion/react @emotion/styled
```

---

## Basic Syntax

```jsx
import styled from "styled-components";

const Title = styled.h2`
  color: red;
  font-size: 24px;
`;
```

Use it like a React component:

```jsx
<Title>Hello World</Title>
```

---

## Styled HTML Elements

```jsx
const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
`;
```

The syntax is:

```jsx
const ComponentName = styled.tagName`
  CSS properties
`;
```

---

## Separate Styled Components

Styled components can be placed in a separate file.

### Export

```jsx
export const Title = styled.h2`
  color: red;
`;
```

### Import

```jsx
import { Title } from "./styled-css";
```

Named exports use curly braces.

---

## Dynamic Styling with Props

```jsx
const Title = styled.h2`
  color: ${({ special }) =>
    special ? "green" : "red"};
`;
```

Usage:

```jsx
<Title special>Special Title</Title>
<Title>Normal Title</Title>
```

---

## Extending a Styled Component

```jsx
const Button = styled.button`
  background: blue;
  color: white;
`;

const ResetButton = styled(Button)`
  background: white;
  color: black;
`;
```

`ResetButton` inherits the styles from `Button` and can add or override styles.

---

## Styling Third-Party Components

Styled Components can be used with components from libraries such as Material UI.

```jsx
import { Button } from "@mui/material";

const MaterialButton = styled(Button)`
  width: 150px;
  text-transform: capitalize;
`;
```

The syntax is:

```jsx
styled(ThirdPartyComponent)`
  CSS
`;
```

---

## Nested Styling

Styled Components can style child elements and class names.

```jsx
const Wrapper = styled.div`
  text-align: center;

  h2 {
    color: blue;
  }

  .underline {
    background: blue;
  }
`;
```

---

## Wrapping a Functional Component

An existing functional component can be wrapped:

```jsx
const Wrapper = styled(ComponentA)`
  background: lightgray;
  padding: 20px;
`;
```

The wrapped component receives a generated `className`.

The component must pass that `className` to its DOM element:

```jsx
function ComponentA({ title, className }) {
  return (
    <div className={className}>
      <h2>{title}</h2>
    </div>
  );
}
```

---

## Quick Syntax Reference

| Requirement         | Syntax                      |
| ------------------- | --------------------------- |
| HTML element        | `styled.div`                |
| Heading             | `styled.h2`                 |
| Button              | `styled.button`             |
| Existing component  | `styled(Component)`         |
| Props               | `${({ prop }) => ...}`      |
| Conditional styling | `prop ? value1 : value2`    |
| Child element       | `h2 { ... }`                |
| Class selector      | `.className { ... }`        |
| Named export        | `export const Title = ...`  |
| Named import        | `import { Title } from ...` |

---

## Topics Covered

* [01 - Basic Styled Components](./01-basic-styled-components/)
* [02 - Separate Styles](./02-separate-styles/)
* [03 - Props & Dynamic Styles](./03-props-dynamic-styles/)
* [04 - Extending Components](./04-extending-components/)
* [05 - Third-Party Components](./05-third-party-components/)
* [06 - Nested Styles](./06-nested-styles/)
* [07 - Wrapping Components](./07-wrapping-components/)

> **Note:** Additional Styled Components topics will be added as they are covered in training.

# Styled Components — Quick Reference

## 11. Media Queries

Use normal CSS media queries inside styled components.

```jsx
const Card = styled.article`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
```

**Use for:** responsive layouts and device-specific styling.

---

## 12. Hover & Pseudo-elements

### Hover

```jsx
const Button = styled.button`
  &:hover {
    transform: scale(1.05);
  }
`;
```

`&` represents the current styled component.

### Pseudo-element

```jsx
const Title = styled.h2`
  &::before {
    content: "Recipe: ";
  }
`;
```

Common pseudo-elements:

```text
::before
::after
::marker
```

---

## 13. Theming

Create a centralized theme:

```jsx
const appTheme = {
  colors: {
    primary: "#3057B9",
    text: "#232323",
  },
  spacing: {
    small: "8px",
    medium: "16px",
  },
};
```

Provide it using `ThemeProvider`:

```jsx
<ThemeProvider theme={appTheme}>
  <App />
</ThemeProvider>
```

Access values:

```jsx
const Title = styled.h2`
  color: ${({ theme }) =>
    theme.colors.primary};
`;
```

**Purpose:** centralized design values and consistency.

---

## 14. CSS Animations

Use `keyframes` to define animations.

```jsx
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  animation: ${spin} 1s linear infinite;
`;
```

**Common use:** loaders, spinners, transitions, visual effects.

---

## 15. `as` Prop

The `as` prop changes the underlying HTML element while preserving the styled component's styles.

```jsx
const Button = styled.button`
  padding: 10px 20px;
`;
```

Render as a link:

```jsx
<Button
  as="a"
  href="https://react.dev"
>
  React Docs
</Button>
```

Render a styled heading as another heading level:

```jsx
<Title as="h2">
  Section Heading
</Title>
```

**Remember:**

```text
as="a"
```

changes the **HTML element**.

It is different from:

```jsx
variant="outline"
```

which changes **styling based on a prop**.

---

## 16. Conditional / Value-driven Styling

Use props to change styles based on values.

### Price Example

```jsx
const ProductPrice = styled.span`
  color: ${({ $price }) => {
    if ($price < 100) return "green";
    if ($price > 100) return "red";

    return "#232323";
  }};
`;
```

Usage:

```jsx
<ProductPrice $price={50}>
  $50
</ProductPrice>
```

The `$` prefix creates a styling-only transient prop.

### Variant Example

```jsx
const Button = styled.button`
  background: ${({ variant }) =>
    variant === "outline"
      ? "transparent"
      : "#3057B9"};

  color: ${({ variant }) =>
    variant === "outline"
      ? "#3057B9"
      : "white"};
`;
```

Usage:

```jsx
<Button>Save</Button>

<Button variant="outline">
  Cancel
</Button>
```

**Concept:**

```text
Value → Prop → Styled Component → Style
```

---

## 17. React `style` vs. Emotion `css` Prop

### React Inline `style`

React's `style` prop uses a JavaScript object.

```jsx
<button
  style={{
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
  }}
>
  Save
</button>
```

CSS property names use JavaScript camelCase:

```text
backgroundColor
fontSize
marginTop
```

---

### Emotion `css` Prop

Emotion provides a `css` prop:

```jsx
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

const buttonStyle = css`
  background: blue;
  color: white;
  padding: 10px 20px;
`;

<button css={buttonStyle}>
  Save
</button>
```

### Conditional CSS

```jsx
const filledStyle = css`
  background: blue;
  color: white;
`;

const outlineStyle = css`
  background: transparent;
  color: blue;
`;
```

Choose the style based on a value:

```jsx
<button
  css={
    variant === "outline"
      ? outlineStyle
      : filledStyle
  }
>
  Save
</button>
```

> **Important:** The `css` prop shown here is an **Emotion feature**, not a core Styled Components feature. It is included as a related concept because Emotion was also covered in the training.

---

# Topics 11–17 at a Glance

| Topic                   | Main Concept                                  |
| ----------------------- | --------------------------------------------- |
| Media Queries           | Responsive styling                            |
| Hover & Pseudo-elements | `&:hover`, `::before`, `::after`              |
| Theming                 | `ThemeProvider` and centralized design values |
| CSS Animations          | `keyframes`                                   |
| `as` Prop               | Change rendered HTML element                  |
| Conditional Styling     | Props/values control styles                   |
| Emotion CSS Prop        | `style` vs. Emotion `css`                     |

---

## Quick Mental Model

```text
Styled Components
       │
       ├── Component Styles
       ├── Props → Dynamic Styles
       ├── Nested CSS
       ├── Media Queries
       ├── Hover / Pseudo-elements
       ├── ThemeProvider
       ├── keyframes
       └── as prop

Related Styling
       │
       └── Emotion
             ├── css prop
             └── Conditional CSS
```
