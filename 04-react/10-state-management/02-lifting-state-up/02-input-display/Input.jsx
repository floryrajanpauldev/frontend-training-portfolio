function Input(props) {
  const { fullname, onHandleChange } = props;

  return (
    <div>
      <label>Enter your name: </label>

      <input
        type="text"
        name="fullname"
        value={fullname}
        onChange={onHandleChange}
      />
    </div>
  );
}

export default Input;