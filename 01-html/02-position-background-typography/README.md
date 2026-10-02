# CSS Position, Background, Typography & Effects

| Topic                     | What I Learned                                                                                                                     | Example                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Position: static**      | Default position. `top`, `right`, `bottom`, and `left` do not affect it.                                                           | `position: static;`                                             |
| **Position: relative**    | Keeps the element in normal document flow and allows it to be offset. Also provides a positioning reference for an absolute child. | `position: relative;`                                           |
| **Position: absolute**    | Removes the element from normal document flow and positions it relative to its nearest positioned ancestor.                        | `position: absolute;`                                           |
| **Position: fixed**       | Removes the element from normal flow and positions it relative to the viewport. It stays fixed while scrolling.                    | `position: fixed;`                                              |
| **Position: sticky**      | Behaves like relative positioning until it reaches the specified threshold, then sticks while scrolling.                           | `position: sticky; top: 0;`                                     |
| **Position properties**   | Used to offset positioned elements.                                                                                                | `top`, `right`, `bottom`, `left`                                |
| **z-index**               | Controls stacking order when elements overlap. Higher values generally appear above lower values in the same stacking context.     | `z-index: 2;`                                                   |
| **Background color**      | Sets the background color of an element.                                                                                           | `background-color: aqua;`                                       |
| **Background image**      | Adds an image as the background.                                                                                                   | `background-image: url("./image.jpg");`                         |
| **Linear gradient**       | Creates a gradient background.                                                                                                     | `linear-gradient(to right, aqua, blue)`                         |
| **Background repeat**     | Controls whether a background image repeats.                                                                                       | `background-repeat: no-repeat;`                                 |
| **Background attachment** | Controls how the background behaves while scrolling.                                                                               | `background-attachment: fixed;`                                 |
| **Background size**       | Controls the size of the background image. `contain` shows the entire image; `cover` fills the container and may crop the image.   | `background-size: cover;`                                       |
| **Background position**   | Controls where the background image is positioned.                                                                                 | `background-position: center;`                                  |
| **Background shorthand**  | Combines multiple background properties.                                                                                           | `background: blue url("./image.jpg") center / cover no-repeat;` |
| **Font family**           | Specifies the typeface.                                                                                                            | `font-family: Arial, sans-serif;`                               |
| **Font size**             | Controls the size of text.                                                                                                         | `font-size: 16px;`                                              |
| **Font style**            | Controls normal/italic text style.                                                                                                 | `font-style: italic;`                                           |
| **Font weight**           | Controls the thickness of text.                                                                                                    | `font-weight: bold;`                                            |
| **Text alignment**        | Controls horizontal text alignment.                                                                                                | `text-align: center;`                                           |
| **Line height**           | Controls vertical spacing between lines.                                                                                           | `line-height: 22px;`                                            |
| **Word spacing**          | Controls the space between words.                                                                                                  | `word-spacing: 3px;`                                            |
| **Text decoration**       | Adds decorations such as underline.                                                                                                | `text-decoration: underline;`                                   |
| **em unit**               | Relative font-size unit. Its value depends on the relevant inherited/current font-size context.                                    | `font-size: 1.5em;`                                             |
| **Box shadow**            | Adds a shadow around an element.                                                                                                   | `box-shadow: 10px 10px 10px #ccc;`                              |
| **Inset shadow**          | Creates an inner shadow.                                                                                                           | `box-shadow: inset 0 0 10px #ccc;`                              |
| **Opacity**               | Controls transparency from `0` (transparent) to `1` (opaque).                                                                      | `opacity: 0.5;`                                                 |
| **Backdrop**              | Commonly used behind modals/overlays to cover the page.                                                                            | `position: fixed; inset: 0;`                                    |
| **Overlay**               | Content displayed above a backdrop, such as a modal.                                                                               | `position: fixed; z-index: 2;`                                  |
| **Overflow**              | Controls content that exceeds an element's available space.                                                                        | `overflow: auto;`                                               |
| **Overflow-y**            | Controls vertical overflow/scrolling.                                                                                              | `overflow-y: auto;`                                             |
| **Overflow-x**            | Controls horizontal overflow/scrolling.                                                                                            | `overflow-x: auto;`                                             |

## Common Modal / Overlay Pattern

```css
.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: black;
  opacity: 0.5;
  z-index: 1;
}

.overlay {
  position: fixed;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 2;
}
