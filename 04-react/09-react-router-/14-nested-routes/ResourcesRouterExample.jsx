import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router";

import ResourceLayout from "./ResourceLayout";
import ResourcesHome from "./ResourcesHome";
import Guides from "./Guides";
import Articles from "./Articles";
import FAQs from "./FAQs";
import Benefits from "./Benefits";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function ResourcesRouterExample() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/resources">Resources</Link> |{" "}
        <Link to="/benefits">Benefits</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/resources" element={<ResourceLayout />}>
          <Route index element={<ResourcesHome />} />

          <Route path="guides" element={<Guides />} />

          <Route path="articles" element={<Articles />} />

          <Route path="faqs" element={<FAQs />} />
        </Route>

        <Route path="/benefits" element={<Benefits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ResourcesRouterExample;