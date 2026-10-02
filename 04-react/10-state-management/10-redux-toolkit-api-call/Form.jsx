import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  setName,
  setSelectedOption,
  submitFormData,
} from "./formSlice";

function Form() {
  const dispatch = useDispatch();

  const {
    name,
    options,
    selectedOption,
    loading,
    error,
    submitting,
    submitError,
    submittedData,
  } = useSelector((state) => state.form);

  // Fetch products when the component loads
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      submitFormData({
        name,
        selectedOption,
      })
    );
  };

  return (
    <div className="form-container">
      <h1>Redux Toolkit API Call</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) =>
              dispatch(setName(event.target.value))
            }
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="product">Select Product</label>

          <select
            id="product"
            value={selectedOption}
            onChange={(event) =>
              dispatch(setSelectedOption(event.target.value))
            }
          >
            {loading ? (
              <option value="">Loading...</option>
            ) : (
              <option value="">Select a product</option>
            )}

            {options.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="error">
            Error loading products: {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {submitError && (
        <p className="error">
          Error submitting form: {submitError}
        </p>
      )}

      {submittedData && (
        <div className="success">
          <h3>Form submitted successfully</h3>
          <p>
            Created product ID: {submittedData.id}
          </p>
        </div>
      )}

      <div className="selected-value">
        <strong>Selected Option ID:</strong>{" "}
        {selectedOption || "None"}
      </div>
    </div>
  );
}

export default Form;