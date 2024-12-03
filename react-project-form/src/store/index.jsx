import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: 1, email: "test@example.com", password: "123456", name: "Иван" },
    {
      id: 2,
      email: "user@example.com",
      password: "password123",
      name: "Мария",
    },
  ], // Массив зарегистрированных пользователей
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
    registerUser(state) {
      state.users.push({ ...state.infoperson }); // Добавляем нового пользователя
      state.infoperson = {
        // Очищаем форму после успешной регистрации
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      };
      state.didEdit = {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        phone: false,
      };
    },
  },
});

export const RegistrationActions = infoRegistrationSlice.actions;

export default configureStore({
  reducer: infoRegistrationSlice.reducer,
});
