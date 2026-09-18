import React, { useState } from "react";

function UserFormPostApi() {
  // Step 1: Store form values in state
  const [userInput, setUserInput] = useState({
    name: "",
    emailaddress: "",
  });

  // Step 2: Update the correct state property
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // Step 3: Submit the form and make the POST request
  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInput.name,
        email: userInput.emailaddress,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post user data");
        }

        return response.json();
      })
      .then((data) => {
        console.log("User successfully created:", data);

        setUserInput({
          name: "",
          emailaddress: "",
        });
      })
      .catch((error) => {
        console.log("Error posting user data:", error);
      });
  };

  return (
    <>
      <h2>User Form - POST API</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>

          <input
            type="text"
            id="name"
            name="name"
            value={userInput.name}
            onChange={handleInputChange}
            required
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
            required
          />
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserFormPostApi;
