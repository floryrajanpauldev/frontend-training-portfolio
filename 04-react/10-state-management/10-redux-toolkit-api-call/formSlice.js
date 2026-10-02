import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Common Axios configuration
const axiosConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000,
};

// GET API call
export const fetchProducts = createAsyncThunk(
  "form/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://dummyjson.com/products",
      axiosConfig
    );

    return response.data;
  }
);

// POST API call
export const submitFormData = createAsyncThunk(
  "form/submitFormData",
  async ({ name, selectedOption }) => {
    const response = await axios.post(
      "https://dummyjson.com/products/add",
      {
        title: name,
        description: `Selected product ID: ${selectedOption}`,
        userId: 1,
      },
      axiosConfig
    );

    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const submitting = state.form.submitting;

      // Prevent another request if one is already being submitted
      if (submitting) {
        return false;
      }

      return true;
    },
  }
);

const initialState = {
  name: "",
  options: [],
  selectedOption: "",
  loading: false,
  submitting: false,
  error: null,
  submitError: null,
  submittedData: null,
};

const formSlice = createSlice({
  name: "form",

  initialState,

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },

    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // -------------------------
      // fetchProducts - pending
      // -------------------------
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // -------------------------
      // fetchProducts - fulfilled
      // -------------------------
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload.products;
      })

      // -------------------------
      // fetchProducts - rejected
      // -------------------------
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // -------------------------
      // submitFormData - pending
      // -------------------------
      .addCase(submitFormData.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
      })

      // -------------------------
      // submitFormData - fulfilled
      // -------------------------
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.submitting = false;
        state.submittedData = action.payload;
      })

      // -------------------------
      // submitFormData - rejected
      // -------------------------
      .addCase(submitFormData.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.error.message;
      });
  },
});

export const { setName, setSelectedOption } = formSlice.actions;

export default formSlice.reducer;