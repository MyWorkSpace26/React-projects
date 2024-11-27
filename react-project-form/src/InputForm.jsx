import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RegistrationActions } from "./store";

const validateField = (field, value, state) => {
  let error = "";
  if (!value) {
    error = "Поле не должно быть пустым.";
  } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Введите корректный адрес электронной почты.";
  } else if (field === "password" && value.length < 6) {
    error = "Пароль должен содержать не менее 6 символов.";
  } else if (field === "confirmPassword" && value !== state.password) {
    error = "Пароли не совпадают.";
  } else if (field === "phone" && !/^\+?\d{10,15}$/.test(value)) {
    error = "Введите корректный номер телефона.";
  }
  return error;
};

const InputForm = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.infoperson);
  const blur = useSelector((state) => state.didEdit);
  const errors = useSelector((state) => state.errors);

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
    let isValid = true;
    Object.keys(info).forEach((field) => {
      const error = validateField(field, info[field], info);
      if (error) isValid = false;
      dispatch(RegistrationActions.setError({ field, error }));
    });

    if (isValid) {
      alert("Данные отправлены:", info);
    } else {
      alert("Ошибки в форме:", errors);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={submitHandler}>
        <h2>Регистрация</h2>
        {Object.keys(info).map((field) => (
          <div className="input-field" key={field}>
            <input
              type={
                field === "email"
                  ? "email"
                  : field === "phone"
                  ? "tel"
                  : field === "password" || field === "confirmPassword"
                  ? "password"
                  : "text"
              }
              id={field}
              value={info[field]}
              required
              onChange={(e) => handleInputChange(field, e.target.value)}
              onBlur={() => handleInputBlur(field)}
            />
            <label htmlFor={field}>
              {field === "firstName"
                ? "Имя"
                : field === "lastName"
                ? "Фамилия"
                : field === "email"
                ? "Электронная почта"
                : field === "password"
                ? "Пароль"
                : field === "confirmPassword"
                ? "Подтвердите пароль"
                : "Телефон"}
            </label>
            {blur[field] && errors[field] && (
              <div className="control-error">
                <p>{errors[field]}</p>
              </div>
            )}
          </div>
        ))}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default InputForm;
