import { useRef, useState } from "react";

function OverlayExample() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current.focus();
  };

  return (
    <div>
      <button ref={triggerRef} onClick={handleOpen}>
        Open Overlay
      </button>

      {isOpen && (
        <div>
          <h2>Overlay</h2>

          <button onClick={handleClose}>
            Close Overlay
          </button>
        </div>
      )}
    </div>
  );
}

export default OverlayExample;