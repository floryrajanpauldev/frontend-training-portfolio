import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";

function Home() { return <h2>Home</h2>; }
function Products() { return <h2>Products</h2>; }
function About() { return <h2>About</h2>; }

function Navigation() {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav>
      <NavLink to="/" end className={getNavLinkClass}>Home</NavLink>{" "}
      <NavLink to="/products" className={getNavLinkClass}>Products</NavLink>{" "}
      <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
    </nav>
  );
}

export default function NavLinkExample() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
