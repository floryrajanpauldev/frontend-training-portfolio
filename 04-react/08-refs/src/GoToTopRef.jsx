import { useRef } from "react";

function GoToTopRef() {
  const topRef = useRef(null);

  const handleGoTop = () => {
    topRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div ref={topRef}>
        <h1>Top of the Page</h1>
      </div>

      <p>Content...</p>
      <p>Content...</p>
      <p>Content...</p>
      <p>Content...</p>
      <p>Content...</p>
      <p>Content...</p>
      <p>Content...</p>
      <p>Content...</p>
      <p>Content...</p>

      <button onClick={handleGoTop}>
        Go to Top
      </button>
    </div>
  );
}

export default GoToTopRef;