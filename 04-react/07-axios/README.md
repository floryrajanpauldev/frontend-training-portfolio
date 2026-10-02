# 07 - Axios

## Overview

Axios is a **third-party HTTP client library** used to make HTTP requests.

* Axios is **not part of React**.
* Axios is **not part of JavaScript**.
* Axios needs to be installed separately.

### Installation

```bash
npm install axios
```

After installation, Axios is added to `package.json` as a dependency.

---

# Axios vs Fetch

| Fetch                                                    | Axios                                              |
| -------------------------------------------------------- | -------------------------------------------------- |
| Built into JavaScript/browser                            | Third-party library                                |
| No installation required                                 | Requires `npm install axios`                       |
| Need to use `response.json()` to read JSON response data | Response data is available through `response.data` |
| POST commonly uses `body: JSON.stringify(data)`          | POST data can be passed directly                   |
| Uses `fetch()`                                           | Uses Axios methods or `axios({})`                  |

---

# GET Request

Axios provides shorthand methods for HTTP requests.

## 1. GET using Axios shorthand

```js
axios.get(url)
```

Example:

```js
const response = await axios.get(url);
console.log(response.data);
```

Axios also allows configuration such as query parameters:

```js
const response = await axios.get(url, {
  params: {
    name: searchQuery
  }
});
```

---

## 2. GET using configurable syntax

Axios can also be called using a configuration object:

```js
const response = await axios({
  method: "get",
  url: url
});
```

The same query parameters can be added to the configuration:

```js
const response = await axios({
  method: "get",
  url: url,
  params: {
    name: searchQuery
  }
});
```

### Comparing the two GET approaches

**Shorthand:**

```js
axios.get(url);
```

**Configurable:**

```js
axios({
  method: "get",
  url: url
});
```

Both make a GET request.

The configurable syntax allows additional request options to be specified in one configuration object.

---

# Query Parameters

Axios allows query parameters to be passed using the `params` property.

```js
axios.get(url, {
  params: {
    name: "John"
  }
});
```

This creates a URL similar to:

```text
/users?name=John
```

---

# POST Request

Axios provides a shorthand method for POST requests.

## 1. POST using Axios shorthand

```js
axios.post(url, data);
```

Example:

```js
const response = await axios.post(
  "https://jsonplaceholder.typicode.com/users",
  userInput
);

console.log(response.data);
```

The form data can be passed directly to Axios.

---

## 2. POST using configurable syntax

The same POST request can be written using Axios configuration:

```js
const response = await axios({
  method: "post",
  url: "https://jsonplaceholder.typicode.com/users",
  data: userInput
});
```

### Comparing the two POST approaches

**Shorthand:**

```js
axios.post(url, userInput);
```

**Configurable:**

```js
axios({
  method: "post",
  url: url,
  data: userInput
});
```

Both make a POST request.

---

# Axios POST vs Fetch POST

With Fetch, POST data is commonly sent using:

```js
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(userInput)
});
```

With Axios, the data can be passed directly:

```js
axios.post(url, userInput);
```

Axios handles the request body serialization for the common JSON case.

---

# Reading Response Data

With Axios, response data is available through:

```js
response.data
```

Example:

```js
const response = await axios.get(url);

console.log(response.data);
```

With Fetch, we commonly need:

```js
const response = await fetch(url);
const data = await response.json();
```

---

# Error Handling

Axios requests can be handled using `try...catch` with `async/await`:

```js
try {
  const response = await axios.get(url);

  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

---

# Files

## `AxiosGet.jsx`

Demonstrates:

* Axios GET request
* `axios.get()` shorthand syntax
* Configurable `axios({ ... })` syntax
* Query parameters using `params`
* `response.data`
* Error handling
* Displaying API results

## `AxiosPost.jsx`

Demonstrates:

* React form handling
* Full Name input
* Email Address input
* Controlled inputs
* `axios.post()` shorthand syntax
* Configurable `axios({ ... })` POST syntax
* Sending form data using `data`
* `response.data`
* Error handling

---

# Key Takeaways

1. Axios is a third-party HTTP client library.
2. Axios must be installed separately.
3. Axios provides shorthand methods such as `axios.get()` and `axios.post()`.
4. Axios also supports a configurable request using `axios({ ... })`.
5. GET query parameters can be provided using `params`.
6. POST data can be passed directly to Axios.
7. Axios response data is available through `response.data`.
8. Axios provides a simpler syntax for many common HTTP requests compared with Fetch.
