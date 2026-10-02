# HTML5 Images

This example demonstrates how to add images to an HTML page and how to provide appropriate alternative text for accessibility.

## Concepts Covered

* `<img>` element
* `src` attribute
* `alt` attribute
* `width` and `height` attributes
* Informative images
* Decorative images
* Accessibility considerations

## Adding an Image

The `<img>` element embeds an image in a web page.

```html
<img
  src="logo.png"
  alt="Example company logo"
  width="200"
  height="80"
>
```

### Common Attributes

| Attribute | Purpose                                 |
| --------- | --------------------------------------- |
| `src`     | Specifies the image resource            |
| `alt`     | Provides alternative text for the image |
| `width`   | Specifies the rendered width            |
| `height`  | Specifies the rendered height           |

## Alternative Text

The `alt` attribute is important for accessibility.

It provides a text alternative when an image cannot be seen or when assistive technology needs to communicate the image's purpose.

### Informative Image

If an image communicates meaningful information, provide descriptive alternative text.

```html
<img
  src="logo.png"
  alt="Example company logo"
>
```

The alternative text should describe the image's purpose rather than simply saying "image."

### Decorative Image

If an image is purely decorative and does not provide meaningful information, use an empty `alt` attribute:

```html
<img
  src="decorative-shape.png"
  alt=""
>
```

This allows assistive technologies such as screen readers to skip the decorative image.

**Do not simply omit the `alt` attribute.**

## Images vs. CSS Background Images

An image that is part of the content should generally be represented using an `<img>` element.

Purely decorative visual effects may instead be implemented using CSS backgrounds.

For example, a decorative design element could be handled through CSS rather than being treated as meaningful page content.

## Accessibility Considerations

When adding an image, ask:

> Does this image communicate information or is it purely decorative?

If it communicates information:

```html
<img src="chart.png" alt="Sales increased from January through March">
```

If it is decorative:

```html
<img src="decoration.png" alt="">
```

Avoid using vague alternative text such as:

```html
alt="image"
```

when the image has meaningful information that should be communicated.

## Performance and Layout

Providing `width` and `height` can help the browser reserve space for an image while the resource loads, which can reduce unexpected layout movement.

In responsive designs, CSS can be used to control how images adapt to different screen sizes.

## Key Takeaway

> Images that communicate information need meaningful alternative text. Decorative images should have an empty `alt` attribute.

## Related Topics

* Accessibility
* Semantic HTML
* CSS
* Responsive design
* Performance

## Reference

[MDN Web Docs — `<img>`: The Image Embed element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img)
