# CSS Flexbox

| Topic               | What I Learned                                                 | Example                           |
| ------------------- | -------------------------------------------------------------- | --------------------------------- |
| **Flex Container**  | Flex properties are primarily applied to the parent/container. | `display: flex;`                  |
| **Display Flex**    | Creates a flexible layout for the direct children.             | `display: flex;`                  |
| **Flex Direction**  | Defines the direction of the main axis.                        | `flex-direction: row;`            |
| **Main Axis**       | The primary axis determined by `flex-direction`.               | Row → horizontal                  |
| **Cross Axis**      | The axis perpendicular to the main axis.                       | Row → vertical                    |
| **Flex Wrap**       | Allows flex items to move to another line when needed.         | `flex-wrap: wrap;`                |
| **Justify Content** | Aligns items along the main axis.                              | `justify-content: space-between;` |
| **Align Items**     | Aligns items along the cross axis.                             | `align-items: center;`            |
| **Align Content**   | Aligns multiple flex lines when wrapping is enabled.           | `align-content: space-evenly;`    |
| **Gap**             | Adds space between flex items and rows.                        | `gap: 20px;`                      |
| **Flex Flow**       | Shorthand for `flex-direction` and `flex-wrap`.                | `flex-flow: row wrap;`            |
| **Flex Grow**       | Allows an item to take available extra space.                  | `flex-grow: 1;`                   |
| **Flex Shrink**     | Controls how an item shrinks when space is limited.            | `flex-shrink: 0;`                 |
| **Align Self**      | Allows an individual item to override `align-items`.           | `align-self: center;`             |
| **Order**           | Changes the visual order of flex items.                        | `order: 3;`                       |

## Main Axis & Cross Axis

With:

```css
.container {
  display: flex;
  flex-direction: row;
}
```

The main axis is horizontal and the cross axis is vertical.

With:

```css
.container {
  display: flex;
  flex-direction: column;
}
```

The main axis becomes vertical and the cross axis becomes horizontal.

## Flexbox Practice

This project demonstrates:

* 3-column and 2-row layouts
* Main-axis alignment
* Cross-axis alignment
* Flex wrapping
* Spacing with `gap`
* Growing and shrinking flex items
* Individual item alignment
* Flex item ordering

## Accessibility Note

Use `order` carefully. The visual order of elements can differ from their HTML/DOM order, which can create a confusing experience for keyboard and assistive-technology users.

Keep the HTML order logical whenever possible.

