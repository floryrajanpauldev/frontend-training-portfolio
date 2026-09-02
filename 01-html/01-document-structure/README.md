# HTML5 Document Structure

This example demonstrates the basic structure of an HTML5 document and introduces the essential elements that make up a web page.

## Concepts Covered

* `<!DOCTYPE html>`
* `<html>`
* `lang` attribute
* `<head>`
* `<meta charset="UTF-8">`
* `<meta name="description">`
* `<title>`
* `<body>`
* `<h1>`
* `<p>`

## HTML5 Document Structure

A basic HTML5 document follows a standard structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="description" content="Description of the page">
  <title>Page Title</title>
</head>

<body>
  <h1>Page Heading</h1>
  <p>Page content goes here.</p>
</body>
</html>
```

## Key Concepts

### `<!DOCTYPE html>`

Declares the document as HTML and tells the browser to render the page using standards mode.

### `<html lang="en">`

The `<html>` element is the root element of the document.

The `lang` attribute identifies the primary language of the page.

Examples:

```html
<html lang="en">
```

```html
<html lang="fr">
```

Providing the correct language is important for accessibility because assistive technologies such as screen readers can use this information to determine how the content should be pronounced.

### `<head>`

Contains metadata and other information about the document that is not normally displayed as page content.

### `<meta charset="UTF-8">`

Defines the character encoding used by the document.

UTF-8 supports a wide range of characters, symbols, and languages.

### `<title>`

Defines the title of the document.

The title is displayed in places such as the browser tab and can also be used by search engines when presenting pages in search results.

A meaningful title is also important for accessibility and helps users understand which page they are currently viewing.

### `<meta name="description">`

Provides a description of the page that can be used by search engines when generating search-result snippets.

### `<body>`

Contains the content displayed as part of the web page.

## Accessibility Considerations

* Always provide an appropriate `lang` attribute.
* Give every page a meaningful `<title>`.
* Use a logical heading structure.
* Use semantic HTML elements where appropriate.

## Common Mistakes

❌ Missing the doctype:

```html
<html>
```

✅ Use:

```html
<!DOCTYPE html>
<html lang="en">
```

❌ Using a generic or missing page title.

✅ Use a meaningful title that describes the page.

## Related Topics

* Semantic HTML
* Headings
* Accessibility
* SEO

## Reference

[MDN Web Docs — HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
