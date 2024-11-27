import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  infoperson: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  },
  didEdit: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  },
  errors: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  },
};

const infoRegistrationSlice = createSlice({
  name: "infoRegistration",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state.infoperson[field] = value;
    },
    setDidEdit(state, action) {
      const { field, value } = action.payload;
      state.didEdit[field] = value;
    },
    setError(state, action) {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },
  },
});

export const RegistrationActions = infoRegistrationSlice.actions;

export default configureStore({
  reducer: infoRegistrationSlice.reducer,
});
