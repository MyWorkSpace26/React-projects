import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  infoperson: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "1",
  },
  didEdit: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    city: false,
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
    setIsEdit(state, action) {
      const { field, value } = action.payload;
      state.didEdit[field] = value;
    },
  },
});

const store = configureStore({
  reducer: infoRegistrationSlice.reducer,
});

export const RegistrationActions = infoRegistrationSlice.actions;

export default store;
