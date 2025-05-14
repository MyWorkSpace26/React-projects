export const validateRegistration = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Имя обязательно";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email обязателен";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Некорректный email";
  }

  if (!formData.password) {
    errors.password = "Пароль обязателен";
  } else if (formData.password.length < 6) {
    errors.password = "Пароль должен содержать минимум 6 символов";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
  }

  return errors;
};

export const validateLogin = (formData) => {
  const errors = {};

  if (!formData.email?.trim()) {
    errors.email = "Email обязателен";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Некорректный email";
  }

  if (!formData.password || formData.password.length < 6) {
    errors.password = "Пароль обязателен";
  }

  return errors;
};
