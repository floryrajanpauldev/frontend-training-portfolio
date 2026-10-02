import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>Go Back</button>;
}

export default function UseNavigateExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
