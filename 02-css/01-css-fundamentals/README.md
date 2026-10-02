# CSS Fundamentals

| Topic                        | What I Learned                                         | Example                                        |
| ---------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| **Inline CSS**               | CSS written directly on an HTML element                | `<div style="color:red">`                      |
| **Internal CSS**             | CSS written inside `<style>` in `<head>`               | `span { color: blue; }`                        |
| **External CSS**             | CSS written in a separate `.css` file                  | `<link rel="stylesheet" href="styles.css">`    |
| **Universal Selector**       | Selects all elements                                   | `* { margin: 0; }`                             |
| **Element Selector**         | Selects elements by tag name                           | `h1 { color: blue; }`                          |
| **Class Selector**           | Reusable selector                                      | `.highlight { color: green; }`                 |
| **ID Selector**              | Selects a unique element                               | `#main-header { }`                             |
| **Grouping Selector**        | Applies same styles to multiple selectors              | `h1, h2, h3 { }`                               |
| **Multiple Classes**         | Selects an element having multiple classes             | `.navigation.home { }`                         |
| **Descendant Selector**      | Selects elements anywhere inside another element       | `.container span { }`                          |
| **Child Selector**           | Selects only direct children                           | `.container > span { }`                        |
| **General Sibling**          | Selects all matching siblings after an element         | `li.red ~ li { }`                              |
| **Adjacent Sibling**         | Selects the immediately following sibling              | `li.red + li { }`                              |
| **Pseudo-class**             | Selects an element based on state/condition            | `a:hover { }`                                  |
| **Form Pseudo-classes**      | Styles form elements based on state                    | `input:focus`, `:checked`, `:disabled`         |
| **Child Pseudo-classes**     | Selects elements based on position                     | `:first-child`, `:last-child`, `:nth-child(3)` |
| **`:not()`**                 | Selects elements that don't match a selector           | `li:not(.home) { }`                            |
| **`:only-child`**            | Selects an element that is the only child              | `span:only-child { }`                          |
| **Pseudo-elements**          | Styles/generated content for part of an element        | `::before`, `::after`                          |
| **Attribute Selector**       | Selects elements based on attributes                   | `input[type="text"]`                           |
| **Box Model**                | Content → Padding → Border → Margin                    | `width`, `padding`, `border`, `margin`         |
| **`box-sizing`**             | Controls how width/height are calculated               | `box-sizing: border-box;`                      |
| **Display: block**           | Element starts on a new line and takes available width | `display: block;`                              |
| **Display: inline**          | Element stays in the same line                         | `display: inline;`                             |
| **Display: inline-block**    | Inline positioning with box dimensions                 | `display: inline-block;`                       |
| **Display: none**            | Hides element and removes it from layout               | `display: none;`                               |
| **Border**                   | Adds a border around an element                        | `border: 1px solid red;`                       |
| **Border Radius**            | Creates rounded corners                                | `border-radius: 10px;`                         |
| **Individual Corner Radius** | Controls individual corners                            | `border-top-left-radius: 10px;`                |

