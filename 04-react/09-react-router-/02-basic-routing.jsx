import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() { return <h2>Home</h2>; }
function About() { return <h2>About</h2>; }
function Contact() { return <h2>Contact</h2>; }

export default function BasicRoutingExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
