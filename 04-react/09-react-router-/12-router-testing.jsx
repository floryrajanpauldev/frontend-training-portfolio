import { MemoryRouter, Routes, Route } from "react-router-dom";

function UserDetails() {
  return <h2>User Details</h2>;
}

export default function RouterTestingExample() {
  return (
    <MemoryRouter initialEntries={["/users/101"]}>
      <Routes>
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </MemoryRouter>
  );
}

// In a real test, render this router with React Testing Library and assert
// that the expected content appears for the initial route.
