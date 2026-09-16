# React Array and Object State

This section focuses on updating arrays and objects stored in React state without directly mutating the existing state.

## Topics

| Topic | Key idea |
|---|---|
| Array state | Store an array with `useState()` |
| Array spread | Create a new array while preserving old items |
| `map()` | Display, transform, or update array items |
| `filter()` | Keep or remove array items |
| Object state | Store an object with `useState()` |
| Object spread | Create a new object while preserving properties |
| Array of objects | Update one object using `map()` and spread |
| `Object.keys()` | Convert object keys into an array |
| `Object.values()` | Convert object values into an array |
| `Object.entries()` | Convert object key-value pairs into an array |

## Updating Array State

Avoid mutating the existing array:

```jsx
fruitList.push('Mango');
```

Instead create a new array:

```jsx
setFruits((previousFruits) => [
  ...previousFruits,
  newFruit,
]);
```

## Displaying an Array with `map()`

```jsx
fruits.map((fruit) => (
  <li key={fruit}>{fruit}</li>
))
```

`map()` works directly on arrays.

## Updating One Object Inside an Array

```jsx
setUsers((previousUsers) =>
  previousUsers.map((user) =>
    user.id === id
      ? { ...user, name: newName }
      : user
  )
);
```

The matching object gets a new property value, while all nonmatching users are returned unchanged.

## `map()` vs `filter()`

| Method | Main purpose |
|---|---|
| `map()` | Transform or update items |
| `filter()` | Keep or remove items |

Remove a user:

```jsx
setUsers((previousUsers) =>
  previousUsers.filter((user) => user.id !== id)
);
```

Memory trick: **map → change**, **filter → keep/remove**.

## Updating Object State

For one object, access properties directly:

```jsx
person.name
person.age
person.city
```

Update one property with spread:

```jsx
setPerson((previousPerson) => ({
  ...previousPerson,
  name: 'Alice',
}));
```

The spread operator preserves the existing properties and the later property value replaces the matching property.

## Object Iteration Helpers

A plain object does not have `map()`. JavaScript provides `Object.keys()`, `Object.values()`, and `Object.entries()` to convert an object's properties into arrays that can then be iterated with array methods such as `map()`.

### `Object.keys()`

Returns an array containing the object's **property names (keys)**.

```jsx
const person = {
  name: 'Jane',
  age: 30,
  city: 'London',
  profession: 'Developer',
};

const keys = Object.keys(person);

console.log(keys);
```

Result:

```text
['name', 'age', 'city', 'profession']
```

Because `Object.keys()` returns an array, `map()` can be used:

```jsx
const displayPerson = Object.keys(person).map((key) => (
  <li key={key}>
    {key}: {person[key]}
  </li>
));
```

Output:

```text
name: Jane
age: 30
city: London
profession: Developer
```

Use `Object.keys()` when you need the **property names**.

### `Object.values()`

Returns an array containing the object's **values**.

```jsx
const values = Object.values(person);

console.log(values);
```

Result:

```text
['Jane', 30, 'London', 'Developer']
```

Because the result is an array, `map()` can be used:

```jsx
const displayValues = Object.values(person).map((value, index) => (
  <li key={index}>
    {value}
  </li>
));
```

Output:

```text
Jane
30
London
Developer
```

Use `Object.values()` when you need the **values** but do not need the property names.

### `Object.entries()`

Returns an array containing **key-value pairs**.

```jsx
const entries = Object.entries(person);

console.log(entries);
```

Result:

```text
[
  ['name', 'Jane'],
  ['age', 30],
  ['city', 'London'],
  ['profession', 'Developer']
]
```

Each item is an array containing:

```text
[key, value]
```

You can use `map()` and destructuring to access both:

```jsx
const displayPerson = Object.entries(person).map(
  ([key, value]) => (
    <li key={key}>
      {key}: {value}
    </li>
  )
);
```

Output:

```text
name: Jane
age: 30
city: London
profession: Developer
```

The syntax:

```jsx
([key, value])
```

uses destructuring to separate each key-value pair.

### Quick Comparison

| Method             | Returns                       | Use when                |
| ------------------ | ----------------------------- | ----------------------- |
| `Object.keys()`    | Array of keys                 | You need property names |
| `Object.values()`  | Array of values               | You need only values    |
| `Object.entries()` | Array of `[key, value]` pairs | You need both           |

### Remember

```text
Plain object
    ↓
Object.keys()     → Array
Object.values()   → Array
Object.entries()  → Array
                        ↓
                      map()
```

So:

```jsx
person.map(...)
```

does not work because `person` is an object.

But:

```jsx
Object.keys(person).map(...)
```

works because `Object.keys(person)` returns an array.


## Object vs Array

One object:

```jsx
const person = {
  name: 'Jane',
  age: 30,
};
```

Use direct property access:

```jsx
person.name
person.age
```

Array of objects:

```jsx
const people = [
  { id: 1, name: 'Jane' },
  { id: 2, name: 'John' },
];
```

Use array methods such as:

```jsx
people.map(...)
people.filter(...)
```

A plain object does not have `map()`.

## Quick Patterns

Add to an array:

```jsx
setItems((previousItems) => [
  ...previousItems,
  newItem,
]);
```

Update one array item:

```jsx
setItems((previousItems) =>
  previousItems.map((item) =>
    item.id === id
      ? { ...item, name: newName }
      : item
  )
);
```

Remove an array item:

```jsx
setItems((previousItems) =>
  previousItems.filter((item) => item.id !== id)
);
```

Update an object property:

```jsx
setPerson((previousPerson) => ({
  ...previousPerson,
  name: newName,
}));
```

## Practice Challenges Included

1. Add fruits to array state.
2. Build a pizza ingredient list using array state and `map()`.
3. Update an object property with object spread.
4. Update one user's name inside an array of user objects.


## Interview Question: Is `useState` Synchronous or Asynchronous?

### Question

**Is `useState` synchronous or asynchronous?**

### Answer

* `useState()` itself is not an asynchronous API like `fetch()`.
* The **state setter function** (`setState`) does **not immediately update the state variable in the current render**.
* React **schedules** the state update and re-renders the component.
* The updated state value is available in the **next render**.
* React may **batch multiple state updates** together.

### Example

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);

  console.log(count); // 0 — current render's value
};
```

After React re-renders:

```jsx
console.log(count); // 1
```

### Interview-Friendly Answer

> **"State updates with the setter function are scheduled by React rather than immediately changing the state variable in the current render. React may batch updates and makes the new state available on the next render."**

### Important

Avoid answering simply:

> ❌ "`useState` is synchronous."

Also avoid oversimplifying it as:

> ❌ "`useState` is asynchronous."

A more accurate explanation is:

> ✅ **"The state setter schedules an update, and the updated state is available on the next render."**
