import { useEffect, useRef } from "react";

function FocusInputRef() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter your name"
      />
    </div>
  );
}

export default FocusInputRef;