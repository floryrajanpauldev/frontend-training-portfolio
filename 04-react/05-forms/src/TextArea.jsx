import { useState } from 'react';

function TextArea() {
  const [comments, setComments] = useState('');

  function handleChange(event) {
    setComments(event.target.value);
  }

  return (
    <div>
      <h2>Controlled Textarea</h2>
      <label htmlFor="comments">Comments:</label>
      <textarea
        id="comments"
        name="comments"
        value={comments}
        onChange={handleChange}
        placeholder="Enter your comments"
      />
      <p>{comments}</p>
    </div>
  );
}

export default TextArea;
