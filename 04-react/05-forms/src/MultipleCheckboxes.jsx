import { useState } from 'react';

function MultipleCheckboxes() {
  const [preferences, setPreferences] = useState({
    cheese: false,
    veg: false,
    vegCheese: false,
  });

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;

    setPreferences((previousPreferences) => ({
      ...previousPreferences,
      [name]: checked,
    }));
  }

  return (
    <div>
      <h2>Multiple Checkboxes - Pizza Preferences</h2>

      <div>
        <input
          type="checkbox"
          id="cheese"
          name="cheese"
          checked={preferences.cheese}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="cheese">Cheese</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="veg"
          name="veg"
          checked={preferences.veg}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="veg">Veg</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="vegCheese"
          name="vegCheese"
          checked={preferences.vegCheese}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="vegCheese">Veg and Cheese</label>
      </div>

      <p>Checked values: {JSON.stringify(preferences)}</p>
    </div>
  );
}

export default MultipleCheckboxes;
