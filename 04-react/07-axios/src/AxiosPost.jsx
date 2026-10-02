import { useState } from "react";
import axios from "axios";

function AxiosPost() {
  const [userInput, setUserInput] = useState({
    fullname: "",
    emailaddress: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // ------------------------------------
      // Axios POST shorthand method
      // ------------------------------------

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        userInput
      );

      // ------------------------------------
      // Axios configurable syntax
      // ------------------------------------
      /*
      const response = await axios({
        method: "post",
        url: "https://jsonplaceholder.typicode.com/users",
        data: userInput,
      });
      */

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Axios POST Request</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>

          <input
            type="text"
            id="fullname"
            name="fullname"
            value={userInput.fullname}
            onChange={handleInputChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="emailaddress">Email Address:</label>

          <input
            type="email"
            id="emailaddress"
            name="emailaddress"
            value={userInput.emailaddress}
            onChange={handleInputChange}
          />
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AxiosPost;