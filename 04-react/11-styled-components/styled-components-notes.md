# Styled Components — Concepts & Notes

## 1. Introduction to Styled Components

In a React application, we normally separate our markup and CSS.

For example:

```jsx
<h1 className="title">Welcome</h1>
```

And the CSS may be defined in `App.css`:

```css
.title {
  color: red;
  font-size: 24px;
}
```

As an application grows, many components may use class names. This can lead to:

* Repeated class names
* CSS conflicts
* Unintended style overrides
* Difficulty finding where a component's styles are defined

Styled Components provides another approach.

Instead of creating a regular HTML element and then assigning a class name, we create a **styled component**.

The component contains both:

* The element that should be rendered
* The styles associated with that component

This makes component-specific styling easier to organize.

---

## 2. Creating a Styled Component

Install Styled Components:

```bash
npm install styled-components
```

Import it:

```jsx
import styled from "styled-components";
```

Create a styled component:

```jsx
const Title = styled.h2`
  color: red;
  font-size: 24px;
`;
```

Use it like a normal React component:

```jsx
<Title>Welcome</Title>
```

Although `Title` is a React component, it renders an HTML `<h2>` element.

### Important idea

```jsx
styled.h2
```

means:

> Create a styled component that renders an `h2`.

Similarly:

```jsx
styled.div
styled.button
styled.header
styled.span
styled.p
```

create components that render those corresponding HTML elements.

---

## 3. Template Literals

Styled Components uses JavaScript template literals.

The styles are written between backticks:

```jsx
const Button = styled.button`
  background: blue;
  color: white;
`;
```

The backtick syntax was introduced with ES6 template literals.

It also allows JavaScript expressions to be inserted using:

```jsx
${}
```

This becomes especially useful for dynamic styling.

---

## 4. Keeping Styles in a Separate File

Styled components do not have to be declared directly inside the component file.

For example:

```text
Header.jsx
HeaderStyled.js
```

`HeaderStyled.js`:

```jsx
import styled from "styled-components";

export const Header = styled.header`
  background: lightgray;
  padding: 20px;
`;
```

`Header.jsx`:

```jsx
import { Header } from "./HeaderStyled";

function HeaderComponent() {
  return (
    <Header>
      <h1>Welcome</h1>
    </Header>
  );
}

export default HeaderComponent;
```

This keeps the component logic and styling organized separately.

---

## 5. Named Exports and Default Exports

### Named export

```jsx
export const Title = styled.h2`
  color: red;
`;
```

Import using curly braces:

```jsx
import { Title } from "./styled-css";
```

The imported name should normally match the exported name.

### Default export

```jsx
const Button = styled.button`
  background: blue;
`;

export default Button;
```

It can be imported using any name:

```jsx
import ButtonCSS from "./styled-css";
```

For a collection of styled components, named exports are often clearer because the component names remain consistent.

---

## 6. Props and Dynamic Styling

Styled components can receive props just like normal React components.

Example:

```jsx
<Title special>Special Title</Title>
```

The styled component can use the prop:

```jsx
export const Title = styled.h2`
  color: ${({ special }) =>
    special ? "green" : "red"};
`;
```

Now:

```jsx
<Title special>Special Title</Title>
<Title>Normal Title</Title>
```

can have different styles.

This is called **dynamic or conditional styling**.

---

## 7. Conditional Styling

Conditional styling is useful when the appearance of a component depends on its state or props.

For example:

```jsx
export const Message = styled.p`
  color: ${({ success }) =>
    success ? "green" : "red"};
`;
```

Usage:

```jsx
<Message success>Operation successful</Message>
<Message>Operation failed</Message>
```

Conditional styling can use:

* Ternary operators
* Logical `&&`
* Functions
* Multiple props

---

## 8. Extending Styled Components

A styled component can be extended to create another styled component.

Example:

```jsx
export const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
`;
```

Create another button based on it:

```jsx
export const NewButton = styled(Button)`
  background: white;
  color: black;
  border: 2px solid black;
`;
```

`NewButton` inherits the styles from `Button` and adds or overrides styles.

This is useful when several components share a common base style.

---

## 9. Styling Third-Party Components

Styled Components can also style components provided by other libraries.

For example, Material UI provides a `Button` component.

```jsx
import { Button } from "@mui/material";
import styled from "styled-components";
```

We can create our own styled version:

```jsx
export const MaterialButton = styled(Button)`
  width: 150px;
  height: 40px;
  margin: 10px auto;
  text-transform: capitalize;
`;
```

The component still has the functionality provided by Material UI, while we customize its appearance.

This approach is also useful when a project has its own reusable component library.

---

## 10. Nested Styles

Styled Components supports nested CSS.

Example:

```jsx
const Wrapper = styled.div`
  text-align: center;

  h2 {
    color: blue;
    font-size: 30px;
  }

  .underline {
    width: 200px;
    height: 5px;
    background: blue;
    margin: 10px auto;
  }
`;
```

The elements inside the styled component can be styled within the component's style definition.

This can make a component's related styles easier to keep together.

---

## 11. Class Name Isolation

One of the benefits of Styled Components is that it generates unique class names for styled components.

For example, two components could both contain a class such as:

```jsx
.underline
```

but their styles can remain associated with their respective styled components.

This helps reduce the CSS conflicts that commonly occur with traditional global class names.

---

## 12. Wrapping an Existing Functional Component

An existing React component can also be wrapped with Styled Components.

Example:

```jsx
function ComponentA({ title, className }) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <span>This is a wrapped component.</span>
    </div>
  );
}
```

Then:

```jsx
const Wrapper = styled(ComponentA)`
  background: lightgray;
  padding: 20px;

  h2 {
    color: blue;
  }
`;
```

The important part is that the wrapped component receives and forwards the `className` prop:

```jsx
<div className={className}>
```

Without forwarding `className` to a DOM element, the generated Styled Components styles cannot be applied to that element.

This is a useful technique, but it can be more complex than styling a normal HTML element, so it should be used when appropriate.

---

# 13. Global CSS

Styled Components does not mean that all CSS must be moved into styled components.

Some styles are appropriate as global styles.

Examples include:

* Common anchor styles
* Base typography
* Body styles
* Application-wide defaults
* Styles that genuinely apply across many components

For example:

```css
a {
  color: blue;
}
```

This can remain in a global CSS file such as:

```text
App.css
```

or:

```text
index.css
```

### General rule

Use:

**Styled Components**

for styles specific to a component.

Use:

**Global CSS**

for styles that intentionally apply throughout the application.

---

# 14. Avoid Overriding Global CSS

A common CSS practice to avoid is creating a global class and then trying to override that same class inside a styled component.

For example, if `App.css` contains:

```css
.title {
  color: red;
}
```

we should avoid creating another `.title` rule inside a styled component simply to override it:

```jsx
const Wrapper = styled.div`
  .title {
    color: blue;
  }
`;
```

Instead, decide where the style belongs.

If `title` is a global style, use the global style.

If the title belongs specifically to a component, create a styled component for it.

The goal is to avoid having multiple styling systems fighting over the same element.

---

# 15. CSS Variables / Custom Properties

CSS allows us to define reusable variables called **custom properties**.

They are commonly defined inside `:root`:

```css
:root {
  --text-color: #232323;
  --link-color: #3057b9;
  --border-radius: 8px;
  --main-padding: 15px;
}
```

The variable name starts with two dashes:

```css
--variable-name
```

The value can then be reused with:

```css
var(--variable-name)
```

Example:

```css
a {
  color: var(--link-color);
}

.card {
  border-radius: var(--border-radius);
}
```

---

# 16. Why Use CSS Variables?

CSS variables are useful when the same value is used repeatedly.

For example, if an application uses the same brand color throughout the application:

```css
:root {
  --primary-color: #3057b9;
}
```

Then:

```css
button {
  background: var(--primary-color);
}

a {
  color: var(--primary-color);
}
```

If the design changes later, we can update the value in one place.

This is especially useful for:

* Brand colors
* Text colors
* Link colors
* Spacing
* Border radius
* Typography values
* Theme values

CSS variables can also be useful for theming, such as light and dark themes.

---

# 17. Reusable Style Constants in JavaScript

Instead of defining reusable values only in CSS, we can also define them in a JavaScript file.

For example:

```text
StyledUtils.js
```

```jsx
export const colors = {
  primary: "#3057B9",
  success: "#008000",
  error: "#FF0000",
  dark: "#232323",
  white: "#FFFFFF",
};

export const spacing = {
  small: "8px",
  medium: "16px",
  large: "32px",
};
```

These are named exports, so they can be imported into other files.

```jsx
import { colors, spacing } from "./StyledUtils";
```

---

# 18. Using JavaScript Style Constants with Styled Components

The constants can be used inside a styled component.

```jsx
import styled from "styled-components";
import { colors, spacing } from "./StyledUtils";

export const Card = styled.div`
  background: ${colors.white};
  padding: ${spacing.medium};
  border-radius: 8px;
`;
```

The `${}` syntax allows JavaScript values to be inserted into the Styled Components template literal.

---

# 19. Why Use a JavaScript Style Utility File?

A JS utility file can be useful when the application has reusable design values or styling logic.

For example:

```jsx
export const colors = {
  primary: "#3057B9",
  success: "#008000",
  error: "#FF0000",
};
```

Instead of repeating these values throughout the application, components can reuse them.

This can be particularly useful when building reusable components or working with a design system.

---

# 20. Style Helper Functions

Because the values are in JavaScript, we can also create functions that contain styling logic.

Example:

```jsx
export const getStatusColor = ({
  isError,
  isSuccess,
}) => {
  if (isError) {
    return colors.error;
  }

  if (isSuccess) {
    return colors.success;
  }

  return "transparent";
};
```

The function can then be used by a styled component.

```jsx
const StatusText = styled.span`
  color: ${({ isError, isSuccess }) =>
    getStatusColor({ isError, isSuccess })};
`;
```

This allows styling decisions to be centralized in reusable JavaScript functions.

---

# 21. State-Driven Styling

Styled Components can work together with React state.

For example, an application might make an API call.

The result could update state:

```jsx
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
```

Those values can be passed as props:

```jsx
<StatusText
  isError={isError}
  isSuccess={isSuccess}
>
  System Status
</StatusText>
```

The styled component can then determine its color based on those props.

Conceptually:

```text
API result
    ↓
React state
    ↓
Props
    ↓
Styled Component
    ↓
Conditional styling
```

For example:

```jsx
const StatusText = styled.span`
  color: ${({ isError, isSuccess }) =>
    isError
      ? colors.error
      : isSuccess
      ? colors.success
      : colors.dark};
`;
```

This pattern is useful for UI states such as:

* Success
* Error
* Warning
* Loading
* Active
* Disabled

---

# 22. Choosing Where Styles Should Live

A useful way to think about the different approaches is:

| Styling approach              | Best suited for                          |
| ----------------------------- | ---------------------------------------- |
| Styled Component              | Styles specific to a component           |
| Global CSS                    | Application-wide/common styles           |
| CSS Variables                 | Reusable CSS values                      |
| JS style constants            | Reusable values accessed from JavaScript |
| JS helper functions           | Reusable styling logic                   |
| Third-party component styling | Customizing library components           |

The goal is not to eliminate CSS.

The goal is to organize styles so that:

* Component-specific styles stay with their components.
* Common styles remain global.
* Repeated values are centralized.
* Styling logic can be reused when necessary.
* CSS conflicts are minimized.

---

# 23. Main Takeaways

Styled Components allows us to:

1. Create React components with styles.
2. Use meaningful component names instead of relying entirely on class names.
3. Keep component-specific styles close to the component.
4. Move styles into separate style files when appropriate.
5. Use props for dynamic styling.
6. Extend existing styled components.
7. Style third-party components.
8. Use nested styles.
9. Wrap existing functional components.
10. Keep truly global styles in global CSS.
11. Use CSS variables for reusable CSS values.
12. Store reusable style constants in JavaScript.
13. Create helper functions for reusable styling logic.
14. Connect React state to dynamic component styling.

The main idea is:

> **Create styles that belong to a component and keep those styles organized with that component, while still using global CSS and reusable variables where they make sense.**


# Styled Components — Topics 11–17

## 11. Media Queries

Styled Components supports regular CSS media queries inside a styled component.

```jsx
const Card = styled.article`
  padding: 20px;
  background: lightgray;

  @media (max-width: 768px) {
    padding: 10px;
    background: lightblue;
  }
`;
```

Media queries can be used for responsive designs.

Common examples include:

* `max-width`
* `min-width`
* `@media print`

The same responsive CSS concepts used in traditional CSS can be used inside Styled Components.

---

## 12. Hover and Pseudo-elements

Styled Components supports CSS pseudo-classes and pseudo-elements.

### Hovering the Styled Component

Use `&:hover` when the hover state belongs to the current styled component.

```jsx
const Button = styled.button`
  &:hover {
    transform: scale(1.05);
  }
`;
```

The `&` represents the current styled component.

### Nested Element Hover

A nested selector can target a child element:

```jsx
const Card = styled.div`
  .recipe-block:hover {
    background: lightgray;
  }
`;
```

### Pseudo-elements

Pseudo-elements such as `::before` and `::after` can also be used.

```jsx
const RecipeName = styled.h2`
  &::before {
    content: "Recipe: ";
  }
`;
```

### Key distinction

```css
&:hover
```

targets the current styled component.

```css
.child:hover
```

targets a child element with that class.

```css
&::before
```

targets the pseudo-element of the current styled component.

---

## 13. Theming with `ThemeProvider`

A theme provides a centralized source of truth for an application's visual values.

Instead of hardcoding colors, spacing, border radius, and other design values throughout the application, they can be stored in a theme object.

### Theme Object

```jsx
export const appTheme = {
  colors: {
    primary: "#3057B9",
    success: "#008000",
    error: "#FF0000",
    text: "#232323",
    background: "#FFFFFF",
  },

  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },

  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};
```

### `ThemeProvider`

The application can be wrapped with `ThemeProvider`.

```jsx
import { ThemeProvider } from "styled-components";

<ThemeProvider theme={appTheme}>
  <App />
</ThemeProvider>
```

The theme is then available to styled components through `theme`.

```jsx
const Title = styled.h2`
  color: ${({ theme }) =>
    theme.colors.primary};

  padding: ${({ theme }) =>
    theme.spacing.medium};
`;
```

### Why use a theme?

A centralized theme provides:

* Consistency
* Reusable design values
* Easier maintenance
* A single source of truth
* Easier future design changes
* Support for different visual modes such as light and dark themes

---

## 14. CSS Animations with `keyframes`

Styled Components provides a `keyframes` helper for defining CSS animations.

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
```

The animation can then be used inside a styled component.

```jsx
const Loader = styled.div`
  width: 40px;
  height: 40px;

  border: 4px solid #ccc;
  border-left-color: #3057B9;
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;
```

This is useful for UI elements such as:

* Loading indicators
* Spinners
* Animated buttons
* Transitions and other visual effects

The important concept is knowing how `keyframes` is created and connected to a styled component.

---

## 15. The `as` Prop

The `as` prop allows a styled component to render as a different HTML element while keeping its styles.

For example:

```jsx
const StyledButton = styled.button`
  background: #3057B9;
  color: white;
  padding: 10px 20px;
`;
```

It can normally render as a button:

```jsx
<StyledButton>
  Save
</StyledButton>
```

It can also render as an anchor:

```jsx
<StyledButton
  as="a"
  href="https://react.dev"
>
  React Documentation
</StyledButton>
```

The styles remain the same, but the underlying HTML element becomes an `<a>`.

### Changing Heading Level

The `as` prop can also be useful for semantic HTML.

For example, a styled title may normally render as an `h1`:

```jsx
const Title = styled.h1`
  color: #3057B9;
`;
```

If the page already has an `h1`, the same component can be rendered as an `h2`:

```jsx
<Title as="h2">
  Section Heading
</Title>
```

This allows the visual style to remain reusable while the semantic HTML structure can change.

### Important

The `as` prop changes the **rendered element**.

It is different from a styling prop such as:

```jsx
<Button variant="outline">
```

where the element stays the same and only its styling changes.

---

## 16. Conditional and Value-driven Styling

Styled Components can use props to change styles based on values.

For example, a product price can determine its display color.

```jsx
const ProductPrice = styled.span`
  color: ${({ $price }) => {
    if ($price < 100) {
      return "green";
    }

    if ($price > 100) {
      return "red";
    }

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

The `$` prefix is useful for a **transient styling prop**. It allows the value to be used by Styled Components without unnecessarily forwarding the styling-only prop to the DOM.

### Conditional Variant Styling

The same concept can be used for component variants.

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

  border: 2px solid #3057B9;
`;
```

Usage:

```jsx
<Button>
  Save
</Button>

<Button variant="outline">
  Cancel
</Button>
```

### Conceptual Flow

```text
Application data
      ↓
React state / values
      ↓
Props
      ↓
Styled Component
      ↓
Conditional styling
```

The styling responds to the value without changing the underlying business logic.

---

## 17. React Inline `style` vs. Emotion `css` Prop

This section was covered as a related styling concept because the training also introduced Emotion.

It is important to distinguish these from Styled Components.

### React Inline `style`

React supports an inline `style` prop using a JavaScript object.

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

Important characteristics:

* Uses a JavaScript object
* CSS property names use camelCase
* Example: `backgroundColor`
* Styles are applied through React's `style` prop

---

### Emotion `css` Prop

Emotion provides a `css` prop for applying CSS to an element.

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

The CSS syntax is closer to regular CSS than React's inline `style` object.

---

### Conditional CSS with Emotion

Emotion can also define different CSS blocks and choose between them.

```jsx
const filledStyle = css`
  background: blue;
  color: white;
  border: 2px solid blue;
`;

const outlineStyle = css`
  background: transparent;
  color: blue;
  border: 2px solid blue;
`;
```

The appropriate style can be selected based on a value:

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

### Important Distinction

The `css` prop demonstrated here is an **Emotion feature**, not a core Styled Components feature.

The portfolio therefore keeps this as a related styling topic rather than presenting it as part of the Styled Components API.

---

# Final Takeaways

After these topics, the main Styled Components concepts covered are:

* Component-scoped styling
* Dynamic styling with props
* Reusable styled components
* Extending components
* Third-party component styling
* Nested styles
* Global CSS
* CSS variables
* JavaScript style utilities
* Responsive styling
* Hover and pseudo-elements
* Centralized theming
* CSS animations
* Changing rendered elements with `as`
* Conditional/value-driven styling

Styled Components provides a reusable approach to component styling while still allowing familiar CSS concepts such as media queries, pseudo-classes, pseudo-elements, animations, and responsive design.

In a real application, these concepts can also work alongside an existing design system or component library.
