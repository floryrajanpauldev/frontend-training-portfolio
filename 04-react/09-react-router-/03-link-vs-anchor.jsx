import { BrowserRouter, Link } from "react-router-dom";

export default function LinkVsAnchorExample() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/about">React Router Link</Link>
        <br />
        <a href="/about">Normal Anchor</a>
      </div>
    </BrowserRouter>
  );
}
