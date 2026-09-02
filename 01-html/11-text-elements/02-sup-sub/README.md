# Superscript and Subscript

HTML provides the `<sup>` and `<sub>` elements for displaying text above or below the normal text baseline when that positioning has semantic meaning.

## 1. Superscript — `<sup>`

The `<sup>` element displays content as superscript, positioned above the normal baseline.

### Mathematical Example

```html
x<sup>2</sup>
```

Displays as:

**x²**

### Ordinal Example

```html
1<sup>st</sup>
```

Displays as:

**1st**

### Trademark Example

```html
Company<sup>®</sup>
```

Displays the registered trademark symbol above the baseline.

## 2. Subscript — `<sub>`

The `<sub>` element displays content as subscript, positioned below the normal baseline.

### Chemical Formula

```html
H<sub>2</sub>O
```

Displays as:

**H₂O**

Another example:

```html
CO<sub>2</sub>
```

Displays as:

**CO₂**

## When to Use `<sup>` and `<sub>`

Use these elements when the positioning of the text has meaning.

Common examples include:

* Mathematical expressions
* Chemical formulas
* Ordinal numbers
* Certain abbreviations or notation
* Mathematical variables and exponents

## `<sup>` vs `<sub>`

| Element | Purpose     | Example |
| ------- | ----------- | ------- |
| `<sup>` | Superscript | x²      |
| `<sub>` | Subscript   | H₂O     |

## Important Point

`<sup>` and `<sub>` are semantic elements. They should not be used simply because you want text to appear visually higher or lower.

If the goal is only visual positioning or styling, CSS should generally be used instead.

## Accessibility

Use `<sup>` and `<sub>` when the positioning contributes to the meaning of the content.

For example, chemical formulas and mathematical notation can depend on the position of characters to communicate their intended meaning.

## Key Takeaways

* `<sup>` creates superscript text.
* `<sub>` creates subscript text.
* `<sup>` is commonly used for exponents and ordinal notation.
* `<sub>` is commonly used for chemical formulas.
* These elements should be used when the positioning has semantic meaning.
* CSS should be used for purely visual positioning.

## Practice

Try creating:

1. `x²`
2. `x³`
3. `H₂O`
4. `CO₂`
5. `10th`
6. `2nd`
7. A simple mathematical expression using superscript and subscript.

## Interview Questions

### 1. What is the purpose of `<sup>`?

It represents superscript text positioned above the normal baseline.

### 2. What is the purpose of `<sub>`?

It represents subscript text positioned below the normal baseline.

### 3. Give an example of `<sup>`.

```html
x<sup>2</sup>
```

### 4. Give an example of `<sub>`.

```html
H<sub>2</sub>O
```

### 5. Should `<sup>` and `<sub>` be used only for visual styling?

No. They should be used when the positioning has semantic meaning. CSS is more appropriate for purely visual positioning.
