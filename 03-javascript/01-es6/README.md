# Modern JavaScript (ES6+)

A practical collection of JavaScript examples covering ES6 and commonly used modern JavaScript features for frontend development.

## Setup

This project can be created with Vite using the Vanilla JavaScript template.

```bash
npm create vite@latest 01-modern-javascript -- --template vanilla
cd 01-modern-javascript
npm install
npm run dev
```

## Topics

| Topic | What it demonstrates |
|---|---|
| `var`, `let`, `const` | Variable declaration, reassignment and scope |
| Hoisting | How JavaScript handles declarations |
| Template literals | Backticks and `${}` interpolation |
| Objects | Properties, methods and object shorthand |
| Destructuring | Extracting values from objects and arrays |
| `for...of` | Iterating over iterable values |
| Spread `...` | Copying and combining arrays and objects |
| Rest `...` | Collecting function arguments into an array |
| Default parameters | Providing fallback parameter values |
| `this` | Understanding how `this` is determined |
| Arrow functions | Short syntax and lexical `this` |
| `map()` | Transforming every array element |
| `filter()` | Selecting matching array elements |
| `find()` | Finding the first matching element |
| `reduce()` | Reducing many values to one result |
| `some()` | Checking whether at least one item matches |
| `every()` | Checking whether all items match |
| `includes()` | Checking whether a value exists |
| `Set` | Storing unique values |
| `Map` | Storing key/value pairs |
| `Object.keys()` | Getting an object's keys |
| `Object.values()` | Getting an object's values |
| `Object.entries()` | Getting key/value pairs |
| `import` / `export` | Sharing code between modules |
| Classes | Creating objects from a blueprint |
| Inheritance | Reusing a parent class with `extends` and `super` |
| Promises | Handling asynchronous operations |
| Promise chaining | Using `.then()`, `.catch()` and `.finally()` |
| `Promise.all()` | Waiting for all promises to fulfill |
| `Promise.any()` | Getting the first fulfilled promise |
| `Promise.race()` | Getting the first settled promise |
| `fetch()` | Making HTTP requests |
| `async` / `await` | Writing promise-based code in a readable way |
| `try` / `catch` | Handling errors in asynchronous code |

## Array Methods

| Method | Simple explanation |
|---|---|
| `map()` | "Give me a changed version of every item." |
| `filter()` | "Give me all items that meet this condition." |
| `find()` | "Give me the first item that meets this condition." |
| `some()` | "Does at least one item meet this condition?" |
| `every()` | "Do all items meet this condition?" |
| `includes()` | "Does this value exist?" |
| `reduce()` | "Turn many values into one result." |

## Set vs Map

| | `Set` | `Map` |
|---|---|---|
| Main purpose | Unique values | Key/value pairs |
| Duplicate values | Not stored | Keys are unique |
| Access | Iterate/check values | Retrieve using a key |
| Example | `new Set(['NY', 'NY'])` | `new Map([['id', 'James']])` |

## Promises

A Promise represents the eventual result of an asynchronous operation.

| State | Meaning |
|---|---|
| Pending | Initial state; operation is still in progress |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

A Promise can be handled with:

- `.then()` for success
- `.catch()` for errors
- `.finally()` for code that should run after completion regardless of success or failure

## Promise Combinators

| Method | Behavior |
|---|---|
| `Promise.all()` | The combined promise fulfills when all input promises fulfill; it rejects if any input promise rejects |
| `Promise.any()` | Fulfills when the first input promise fulfills; rejects if all input promises reject |
| `Promise.race()` | Settles when the first input promise settles, whether fulfilled or rejected |

## Fetch

`fetch()` is used to make HTTP requests.

### GET

GET is the default method:

```js
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

### POST

For a JSON POST request, convert the JavaScript object to a JSON string with `JSON.stringify()`:

```js
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

## async / await

`async` / `await` is syntax for working with Promises. It does not replace Promises.

```js
async function getComments() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

Notice that both `fetch()` and `response.json()` return Promises, so both can be awaited.

## Modules

Code can be separated into files and shared with `export` and `import`.

### Named export

```js
export const employee = {
  name: 'James'
};
```

```js
import { employee } from './constants.js';
```

### Default export

```js
const employees = [];

export default employees;
```

```js
import employees from './constants.js';
```

A default export can be imported using a different local name.

## Classes and Inheritance

A class is a blueprint for creating objects.

```js
class Employee {
  constructor(name) {
    this.name = name;
  }

  salaryCalc() {
    console.log(`${this.name}'s salary`);
  }
}
```

Create an instance with `new`:

```js
const employee = new Employee('James');
```

Inheritance uses `extends`, and `super()` calls the parent constructor:

```js
class Department extends Employee {
  constructor(name, deptName) {
    super(name);
    this.deptName = deptName;
  }
}
```

## Important Notes

- Prefer `let` and `const` over `var` in modern JavaScript.
- `let` and `const` are block-scoped; `var` is function-scoped.
- `const` prevents reassignment of the variable binding, but object properties can still be changed.
- Arrow functions do not have their own `this`; they inherit it from the surrounding lexical scope.
- `map()` returns a new array.
- `filter()` returns a new array containing matching elements.
- `find()` returns the first matching element or `undefined`.
- `reduce()` returns the accumulated result.
- `fetch()` returns a Promise.
- `response.json()` also returns a Promise.
- `async` functions return Promises.
- `try/catch` can be used to handle errors from awaited operations.

## Project Files

| File | Purpose |
|---|---|
| `index.html` | Simple page used to demonstrate JavaScript output |
| `script.js` | Main collection of Modern JavaScript examples |
| `constants.js` | Shared API URL and employee data |
| `Employee.js` | Employee class module |
| `Department.js` | Department class demonstrating inheritance |

## Goal

The purpose of this project is to demonstrate practical Modern JavaScript concepts that form a foundation for frontend development and React.
