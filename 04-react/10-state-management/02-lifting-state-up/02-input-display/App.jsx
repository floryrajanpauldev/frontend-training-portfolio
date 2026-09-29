import { useState } from "react";
import Input from "./Input";
import DisplayInput from "./DisplayInput";

function App() {
  const [fullname, setFullName] = useState("");

  const handleInputChange = (event) => {
    setFullName(event.target.value);
  };

  return (
    <>
      <h1>Lifting State Up - Input Example</h1>

      <Input
        fullname={fullname}
        onHandleChange={handleInputChange}
      />

      <DisplayInput fullname={fullname} />
    </>
  );
}

export default App;