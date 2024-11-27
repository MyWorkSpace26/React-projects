import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RegistrationActions } from "./store";

const InputForm = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.infoperson);
  const blur = useSelector((state) => state.didEdit);

  const handleInputChange = (field, value) => {
    dispatch(RegistrationActions.updateField({ field, value }));
    dispatch(RegistrationActions.setDidEdit({ field, value: false }));
  };

  const handleInputBlur = (field, value) => {
    dispatch(RegistrationActions.setDidEdit({ field, value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Submitted data:", info); // go to sing in
  };

  return (
    <div className="wrapper">
      <form onSubmit={submitHandler}>
        <h2>Регистрация</h2>
        <div className="input-field">
          <input
            type="text"
            id="firstName"
            value={info.firstName}
            required
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            onBlur={() => handleInputBlur("firstName", true)}
          />
          <label htmlFor="firstName">Имя</label>
          {/* <div className="control-error">
            {blur.firstName && <p>Please enter a valid email address.</p>}
          </div> */}
        </div>
        <div className="input-field">
          <input
            type="text"
            id="lastName"
            value={info.lastName}
            required
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            onBlur={() => handleInputBlur("lastName", true)}
          />
          <label htmlFor="lastName">Фамилия</label>
        </div>
        <div className="input-field">
          <input
            type="email"
            id="email"
            value={info.email}
            required
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleInputBlur("email", true)}
          />
          <label htmlFor="email">Электронная почта</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            value={info.password}
            required
            onChange={(e) => handleInputChange("password", e.target.value)}
            onBlur={() => handleInputBlur("password", true)}
          />
          <label htmlFor="password">Пароль</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="confirmPassword"
            value={info.confirmPassword}
            required
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            onBlur={() => handleInputBlur("confirmPassword", true)}
          />
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
        </div>
        <div className="input-field">
          <input
            type="tel"
            id="phone"
            value={info.phone}
            required
            onChange={(e) => handleInputChange("phone", e.target.value)}
            onBlur={() => handleInputBlur("phone", true)}
          />
          <label htmlFor="phone">Телефон</label>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default InputForm;
