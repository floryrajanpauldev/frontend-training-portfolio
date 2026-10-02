import { useState } from 'react';

function UpdateObjectState() {
  const personObj = {
    name: 'Jane',
    age: 30,
    city: 'London',
  };
  const [person, setPerson] = useState(personObj);

  function handleNameUpdate() {
    setPerson((previousPerson) => ({
      ...previousPerson,
      name: 'Alice',
    }));
  }

  function handleCityUpdate() {
    setPerson((previousPerson) => ({
      ...previousPerson,
      city: 'Paris',
    }));
  }

  return (
    <div>
      <h2>Updating Object Using useState()</h2>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <p>City: {person.city}</p>
      <button onClick={handleNameUpdate}>Update Name</button>
      <button onClick={handleCityUpdate}>Update City</button>
    </div>
  );
}

export default UpdateObjectState;
