````markdown
# CSS Grid

| Topic | What I Learned | Example |
|---|---|---|
| **Display Grid** | Creates a grid layout for the direct children of a container. | `display: grid;` |
| **Grid Rows** | Defines the size of grid rows. | `grid-template-rows: 100px 100px 100px;` |
| **Grid Columns** | Defines the size of grid columns. | `grid-template-columns: 100px 100px 100px;` |
| **fr Unit** | Represents a fraction of the available space in the grid container. | `grid-template-columns: 1fr 1fr 1fr;` |
| **Mixed Units** | Grid tracks can use different units together. | `200px 1fr 2fr` |
| **repeat()** | Repeats grid tracks without writing them individually. | `repeat(4, 1fr)` |
| **minmax()** | Defines a minimum and maximum size for a grid track. | `minmax(200px, 1fr)` |
| **auto-fit** | Automatically fits as many columns as possible into the available space. | `repeat(auto-fit, minmax(250px, 1fr))` |
| **Gap** | Adds space between rows and columns. | `gap: 20px;` |
| **Row/Column Gap** | Allows different gaps for rows and columns. | `gap: 20px 30px;` |
| **justify-items** | Aligns grid items horizontally inside their individual grid areas. | `justify-items: center;` |
| **align-items** | Aligns grid items vertically inside their individual grid areas. | `align-items: center;` |
| **justify-content** | Aligns the entire grid horizontally inside its container when extra space exists. | `justify-content: center;` |
| **align-content** | Aligns the entire grid vertically inside its container when extra space exists. | `align-content: center;` |
| **Grid Row Positioning** | Controls where an item starts and ends across rows. | `grid-row: 1 / 3;` |
| **Grid Column Positioning** | Controls where an item starts and ends across columns. | `grid-column: 1 / 4;` |
| **grid-area** | Shorthand for row start, column start, row end, and column end. | `grid-area: 1 / 2 / 3 / 4;` |
| **z-index in Grid** | Allows grid items to stack when their grid areas overlap. | `z-index: 1;` |
| **Grid Template Areas** | Creates named areas that define the page layout. | `grid-template-areas: "header header" "main aside" "footer footer";` |
| **grid-area Names** | Assigns an item to a named grid area. | `grid-area: header;` |
| **Subgrid** | Allows a nested grid to inherit the parent grid's track sizing. | `grid-template-rows: subgrid;` |

## Grid Alignment

### `justify-items`

Aligns individual grid items horizontally within their grid areas.

```css
.container {
  justify-items: center;
}
````

Common values:

```text
start
center
end
stretch
```

### `align-items`

Aligns individual grid items vertically within their grid areas.

```css
.container {
  align-items: center;
}
```

### `justify-content`

Moves the entire grid horizontally when there is extra space in the container.

```css
.container {
  justify-content: center;
}
```

### `align-content`

Moves the entire grid vertically when there is extra space in the container.

```css
.container {
  align-content: center;
}
```

## Grid Template Areas

Grid areas can be used to create a page layout:

```css
.container {
  display: grid;

  grid-template-columns: 3fr 1fr;

  grid-template-areas:
    "header header"
    "main aside"
    "footer footer";
}
```

The repeated `header` means the header occupies both columns.

Then assign elements to the named areas:

```css
.header {
  grid-area: header;
}

.main {
  grid-area: main;
}

.aside {
  grid-area: aside;
}

.footer {
  grid-area: footer;
}
```

## Responsive Grid

A common responsive Grid pattern is:

```css
.container {
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
}
```

This allows the number of columns to adjust according to the available space.

## Subgrid

`subgrid` allows a nested grid to use the parent grid's track sizing.

Example:

```css
.box {
  display: grid;

  grid-template-rows: subgrid;

  grid-row: span 3;
}
```

This can help keep headings, content, and images aligned across cards even when the amount of content differs.

## Accessibility Note

CSS Grid can change the visual placement of elements, but the HTML/DOM order should remain logical.

Avoid using visual positioning to create an order that conflicts with the natural reading and keyboard navigation order.

```

```
```
