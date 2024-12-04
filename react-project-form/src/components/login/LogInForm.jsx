import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RegistrationActions } from "../../store";
import { Link, NavLink } from "react-router-dom";

const validateField = (field, value, state) => {
  let error = "";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Введите корректный адрес электронной почты.";
  } else if (field === "password" && value.length < 6) {
    error = "Пароль должен содержать не менее 6 символов.";
  }
  return error;
};

const LogInForm = () => {
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
    let isValid = true;

    // Очистка ошибок перед проверкой
    Object.keys(info).forEach((field) => {
      dispatch(RegistrationActions.setError({ field, error: "" }));
    });

    // Проверка всех полей на базовые ошибки (например, формат email, длина пароля)
    Object.keys(info).forEach((field) => {
      const error = validateField(field, info[field], info);
      if (error) isValid = false; // Если есть ошибка, помечаем форму как невалидную
      dispatch(RegistrationActions.setError({ field, error }));
    });

    // Проверка наличия пользователя с указанным email
    const existingUser = users.find((user) => user.email === info.email);

    if (!existingUser) {
      dispatch(
        RegistrationActions.setError({
          field: "email",
          error: "Пользователь с такой почтой не зарегистрирован.",
        })
      );
      isValid = false;
    } else if (existingUser.password !== info.password) {
      // Если email найден, проверяем правильность пароля
      dispatch(
        RegistrationActions.setError({
          field: "password",
          error: "Неверный пароль. Попробуйте еще раз.",
        })
      );
      isValid = false;
    }

    if (isValid) {
      alert(`Добро пожаловать, ${existingUser.name || "пользователь"}!`);
      // Здесь можно вызвать действие для успешного входа
      /* dispatch(RegistrationActions.loginUser(existingUser)); */
    } else {
      alert("Исправьте ошибки в форме.");
    }
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
        <button
          type="submit"
          disabled={!!errors["password"] || !!errors["email"]}
        >
          {errors["password"] || errors["email"]
            ? "Неактивная кнопка"
            : "Войти в систему"}
        </button>
        <div class="register">
          <p>
            У вас нет аккаунта ?{" "}
            <NavLink to="/signup" className="register-link">
              Зарегистрируйтесь
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
