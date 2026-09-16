# React Forms

This section covers controlled inputs, form submission, validation, radio buttons, select dropdowns, single and multiple checkboxes, textarea, complete forms, and React 19 form actions.

## Topics

| Topic | Key idea |
|---|---|
| Controlled input | React state is the source of truth |
| `onChange` | Read input with `event.target.value` |
| `value` | Connect a field to React state |
| `defaultValue` | Set an initial value for an uncontrolled field |
| `placeholder` | Show hint text |
| `onSubmit` | Handle traditional form submission |
| `preventDefault()` | Prevent normal browser submission |
| Form validation | Show conditional error messages |
| Radio buttons | Same `name`, different `value`, one selection |
| Select dropdown | Store selected option value |
| Single checkbox | Use `event.target.checked` |
| Multiple checkboxes | Store Boolean preferences or selected values |
| Textarea | Same controlled pattern as a text input |
| One form state object | Keep multiple fields in one object |
| React 19 form actions | Read submitted values through `FormData` |

## Controlled Inputs

```jsx
const [fullname, setFullname] = useState('');

function handleInput(event) {
  setFullname(event.target.value);
}

<input
  name="fullname"
  value={fullname}
  onChange={handleInput}
/>
```

React state is the source of truth.

## `value`, `defaultValue`, and `placeholder`

`value` is used for a controlled field:

```jsx
<input value={fullname} onChange={handleInput} />
```

`defaultValue` provides an initial value for an uncontrolled field:

```jsx
<input defaultValue="Simon" />
```

Do not normally use both `value` and `defaultValue` on the same input.

`placeholder` provides hint text:

```jsx
<input placeholder="Enter your full name" />
```

## Array Input Pattern

```jsx
const [fruitInput, setFruitInput] = useState('');
const [fruits, setFruits] = useState([]);

function handleAddFruit() {
  if (fruitInput.trim() === '') return;

  setFruits((previousFruits) => [
    ...previousFruits,
    fruitInput,
  ]);

  setFruitInput('');
}
```

The input is cleared by resetting its controlled state.

## Login Form

A traditional controlled form can keep username and password in state:

```jsx
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
```

Handle submission with:

```jsx
<form onSubmit={handleSubmit}>
```

and prevent the browser's default behavior:

```jsx
function handleSubmit(event) {
  event.preventDefault();
}
```

Submitted values can be collected into one object:

```jsx
setFormValue({
  username,
  password,
});
```

## Form Validation

```jsx
const [isError, setIsError] = useState(false);

if (!password.includes('@')) {
  setIsError(true);
}
```

Display an error conditionally:

```jsx
{isError && (
  <div className="error-message">
    Invalid password
  </div>
)}
```

## Radio Buttons

Radio buttons in the same group use the same `name`:

```jsx
name="paperless"
```

Each option has a different `value`:

```jsx
value="yes"
value="no"
value="maybe"
```

Read the selected value with:

```jsx
event.target.value
```

A controlled radio uses a condition:

```jsx
checked={radioBtn === 'yes'}
```

## Select Dropdown

A controlled select uses:

```jsx
const [selectedBank, setSelectedBank] = useState('');

function handleSelectChange(event) {
  setSelectedBank(event.target.value);
}
```

```jsx
<select
  value={selectedBank}
  onChange={handleSelectChange}
>
```

Options can be generated with `map()`:

```jsx
bankAccounts.map((bank) => (
  <option key={bank.bankName} value={bank.bankName}>
    {bank.bankName} {bank.lastFour}
  </option>
))
```

## Single Checkbox

Checkboxes use Boolean state:

```jsx
const [isChecked, setIsChecked] = useState(false);

function handleCheckboxChange(event) {
  setIsChecked(event.target.checked);
}
```

Controlled checkbox:

```jsx
checked={isChecked}
```

The event property is:

```jsx
event.target.checked
```

not `event.target.value`.

## Multiple Checkboxes

Multiple checkboxes can use different names when each represents its own Boolean:

```jsx
const [preferences, setPreferences] = useState({
  cheese: false,
  veg: false,
  vegCheese: false,
});
```

Use one handler:

```jsx
function handleCheckboxChange(event) {
  const { name, checked } = event.target;

  setPreferences((previousPreferences) => ({
    ...previousPreferences,
    [name]: checked,
  }));
}
```

A default selection can be set to `true`:

```jsx
cheese: true
```

## Multiple Checkboxes with an Array

For a field such as skills:

```jsx
const [formData, setFormData] = useState({
  skills: [],
});
```

Check whether a skill is selected:

```jsx
checked={formData.skills.includes('react')}
```

Add a selected skill:

```jsx
skills: checked
  ? [...previousData.skills, value]
  : previousData.skills.filter((skill) => skill !== value)
```

## Textarea

A controlled textarea follows the same pattern as an input:

```jsx
const [comments, setComments] = useState('');

function handleChange(event) {
  setComments(event.target.value);
}

<textarea
  value={comments}
  onChange={handleChange}
/>
```

## Complete Form with One State Object

A form with many fields can keep the values in one object:

```jsx
const [formData, setFormData] = useState({
  fullname: '',
  emailaddress: '',
  age: '',
  gender: '',
  state: '',
  skills: [],
  agreeToTerms: false,
});
```

Text, email, number, radio, and select controls generally use:

```jsx
event.target.value
```

Checkboxes use:

```jsx
event.target.checked
```

The `skills` array is updated by adding or filtering values.

## React 19 Form Actions

React 19 supports a form action function:

```jsx
<form action={handleSubmit}>
```

The action receives submitted `FormData`:

```jsx
function handleSubmit(formData) {
  const fullname = formData.get('fullname');
}
```

The parameter name can be anything:

```jsx
function handleSubmit(data) {
  const fullname = data.get('fullname');
}
```

The field's `name` connects the HTML control to `FormData`:

```jsx
<input name="fullname" />
```

### `get()`

Use `get()` for a single submitted value:

```jsx
formData.get('fullname')
formData.get('emailaddress')
formData.get('age')
formData.get('gender')
formData.get('state')
```

### `getAll()`

Use `getAll()` when multiple controls share a name:

```jsx
formData.getAll('skills')
```

Example result:

```text
['react', 'javascript', 'html5']
```

The uncontrolled form fields are reset automatically after a successful form action.

## Controlled Form vs React 19 Form Action

### Traditional controlled form

```text
useState
   ↓
value
   ↓
onChange
   ↓
state object
   ↓
onSubmit
```

### React 19 form action

```text
Form fields
   ↓
<form action={handleSubmit}>
   ↓
FormData
   ↓
formData.get()
formData.getAll()
```

## Practice Files

- `SimpleInput.jsx`
- `FruitInput.jsx`
- `Login.jsx`
- `RadioOption.jsx`
- `SelectDropDown.jsx`
- `SingleCheckBox.jsx`
- `MultipleCheckboxes.jsx`
- `TextArea.jsx`
- `MyForm.jsx`
- `FormReact19.jsx`

## Setup

This project is designed to be run later with Vite:

```bash
npm install
npm run dev
```
