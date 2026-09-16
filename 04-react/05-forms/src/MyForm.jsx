import { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    emailaddress: '',
    age: '',
    gender: '',
    state: '',
    skills: [],
    agreeToTerms: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox' && name === 'skills') {
      setFormData((previousData) => ({
        ...previousData,
        skills: checked
          ? [...previousData.skills, value]
          : previousData.skills.filter((skill) => skill !== value),
      }));
      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      <h2>Enter Your Details</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="emailaddress">Email Address:</label>
          <input
            id="emailaddress"
            type="email"
            name="emailaddress"
            value={formData.emailaddress}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <fieldset>
          <legend>Gender:</legend>

          <input
            id="gender-male"
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          <label htmlFor="gender-male">M</label>

          <input
            id="gender-female"
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          <label htmlFor="gender-female">F</label>
        </fieldset>

        <div>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Choose a state</option>
            <option value="Ohio">Ohio</option>
            <option value="California">California</option>
            <option value="Texas">Texas</option>
            <option value="New York">New York</option>
          </select>
        </div>

        <fieldset>
          <legend>Skills:</legend>

          <div>
            <input
              id="skill-react"
              type="checkbox"
              name="skills"
              value="react"
              checked={formData.skills.includes('react')}
              onChange={handleChange}
            />
            <label htmlFor="skill-react">React</label>
          </div>

          <div>
            <input
              id="skill-javascript"
              type="checkbox"
              name="skills"
              value="javascript"
              checked={formData.skills.includes('javascript')}
              onChange={handleChange}
            />
            <label htmlFor="skill-javascript">JavaScript</label>
          </div>

          <div>
            <input
              id="skill-html5"
              type="checkbox"
              name="skills"
              value="html5"
              checked={formData.skills.includes('html5')}
              onChange={handleChange}
            />
            <label htmlFor="skill-html5">HTML5</label>
          </div>
        </fieldset>

        <div>
          <input
            id="agreeToTerms"
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeToTerms">I agree to the terms</label>
        </div>

        <button type="submit">Submit</button>
      </form>

      <h3>Current Form Data</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

export default MyForm;
