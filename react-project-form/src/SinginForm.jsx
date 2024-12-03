import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RegistrationActions } from "./store";

const validateField = (field, value, state) => {
  let error = "";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Введите корректный адрес электронной почты.";
  } else if (field === "password" && value.length < 6) {
    error = "Пароль должен содержать не менее 6 символов.";
  }
  return error;
};

const SinginForm = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.infoperson);
  const blur = useSelector((state) => state.didEdit);
  const errors = useSelector((state) => state.errors);
  const users = useSelector((state) => state.users);

  const handleInputChange = (field, value) => {
    dispatch(RegistrationActions.updateField({ field, value }));
    dispatch(RegistrationActions.setDidEdit({ field, value: false }));
    const error = validateField(field, value, info);
    dispatch(RegistrationActions.setError({ field, error }));
  };

  const handleInputBlur = (field) => {
    dispatch(RegistrationActions.setDidEdit({ field, value: true }));
    const error = validateField(field, info[field], info);
    dispatch(RegistrationActions.setError({ field, error }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(info);
  };
  return (
    <div className="wrapper">
      <form onSubmit={submitHandler}>
        <h2>Авторизации</h2>
        <div className={`input-field ${errors["email"] ? "error" : ""}`}>
          <input
            type="email"
            id="email"
            value={info.email}
            required
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleInputBlur("email", true)}
          />
          <label htmlFor="email">Электронная почта</label>
          {blur["email"] && errors["email"] && (
            <div className="control-error">
              <p>{errors["email"]}</p>
            </div>
          )}
        </div>
        <div className={`input-field ${errors["password"] ? "error" : ""}`}>
          <input
            type="password"
            id="password"
            value={info.password}
            required
            onChange={(e) => handleInputChange("password", e.target.value)}
            onBlur={() => handleInputBlur("password", true)}
          />
          <label htmlFor="password">Пароль</label>
          {blur["password"] && errors["password"] && (
            <div className="control-error">
              <p>{errors["password"]}</p>
            </div>
          )}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default SinginForm;
