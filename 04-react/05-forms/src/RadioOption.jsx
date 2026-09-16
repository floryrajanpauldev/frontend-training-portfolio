import { useState } from 'react';

function RadioOption() {
  const [radioBtn, setRadioBtn] = useState('');

  function handleRadioChange(event) {
    setRadioBtn(event.target.value);
  }

  return (
    <div>
      <h2>Radio Options - Paperless</h2>

      <div>
        <input
          type="radio"
          id="paperless-yes"
          name="paperless"
          value="yes"
          checked={radioBtn === 'yes'}
          onChange={handleRadioChange}
        />
        <label htmlFor="paperless-yes">Yes</label>
      </div>

      <div>
        <input
          type="radio"
          id="paperless-no"
          name="paperless"
          value="no"
          checked={radioBtn === 'no'}
          onChange={handleRadioChange}
        />
        <label htmlFor="paperless-no">No</label>
      </div>

      <div>
        <input
          type="radio"
          id="paperless-maybe"
          name="paperless"
          value="maybe"
          checked={radioBtn === 'maybe'}
          onChange={handleRadioChange}
        />
        <label htmlFor="paperless-maybe">Maybe</label>
      </div>

      <p>Selected option: {radioBtn}</p>
    </div>
  );
}

export default RadioOption;
