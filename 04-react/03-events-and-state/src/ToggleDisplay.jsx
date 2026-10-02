import { useState } from 'react';

function ToggleDisplay() {
  const [isVisible, setIsVisible] = useState(true);

  function handleToggle() {
    setIsVisible((previousValue) => !previousValue);
  }

  return (
    <div>
      <h2>Toggle Display</h2>
      <button onClick={handleToggle}>Toggle</button>
      {isVisible && <div>This text can be shown or hidden.</div>}
    </div>
  );
}

export default ToggleDisplay;
