function FormReact19() {
  function handleSubmit(formData) {
    const fullname = formData.get('fullname');
    const emailaddress = formData.get('emailaddress');
    const age = formData.get('age');
    const gender = formData.get('gender');
    const state = formData.get('state');
    const agreeToTerms = formData.get('agreeToTerms');
    const skills = formData.getAll('skills');

    console.log('Full Name:', fullname);
    console.log('Email:', emailaddress);
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('State:', state);
    console.log('Agree to Terms:', agreeToTerms);
    console.log('Skills:', skills);

    const formValues={
      fullname,
      emailaddress,
      age,
      gender,
      state,
      agreeToTerms,
      skills
    }
    console.log(formValues);
  }

  return (
    <div>
      <h2>Form Using React 19</h2>

      <form action={handleSubmit}>
        <div>
          <label htmlFor="r19-fullname">Full Name:</label>
          <input id="r19-fullname" type="text" name="fullname" />
        </div>

        <div>
          <label htmlFor="r19-emailaddress">Email Address:</label>
          <input id="r19-emailaddress" type="email" name="emailaddress" />
        </div>

        <div>
          <label htmlFor="r19-age">Age:</label>
          <input id="r19-age" type="number" name="age" />
        </div>

        <fieldset>
          <legend>Gender:</legend>

          <input id="r19-male" type="radio" name="gender" value="male" />
          <label htmlFor="r19-male">M</label>

          <input id="r19-female" type="radio" name="gender" value="female" />
          <label htmlFor="r19-female">F</label>
        </fieldset>

        <div>
          <label htmlFor="r19-state">State:</label>
          <select id="r19-state" name="state" defaultValue="">
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
            <input id="r19-react" type="checkbox" name="skills" value="react" />
            <label htmlFor="r19-react">React</label>
          </div>

          <div>
            <input id="r19-javascript" type="checkbox" name="skills" value="javascript" />
            <label htmlFor="r19-javascript">JavaScript</label>
          </div>

          <div>
            <input id="r19-html5" type="checkbox" name="skills" value="html5" />
            <label htmlFor="r19-html5">HTML5</label>
          </div>
        </fieldset>

        <div>
          <input id="r19-terms" type="checkbox" name="agreeToTerms" value="yes" />
          <label htmlFor="r19-terms">I agree to the terms</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormReact19;
