import { useState } from 'react';

function SimpleInput() {
  const [fullname, setFullname] = useState('');

  function handleInput(event) {
    setFullname(event.target.value);
  }

  return (
    <div>
      <h2>Simple Controlled Input</h2>
      <label htmlFor="fullname">Full Name:</label>
      <input
        id="fullname"
        name="fullname"
        placeholder="Enter your full name"
        value={fullname}
        onChange={handleInput}
      />
      <p>You entered: {fullname}</p>
    </div>
  );
}

export default SimpleInput;
