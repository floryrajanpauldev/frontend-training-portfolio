import { useState } from 'react';

function SingleCheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  return (
    <div>
      <h2>Single Checkbox</h2>
      <input
        type="checkbox"
        id="rememberLogin"
        name="rememberLogin"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="rememberLogin">Remember login</label>
      <p>{isChecked ? 'Yes, checked' : 'No, not checked'}</p>
    </div>
  );
}

export default SingleCheckBox;
