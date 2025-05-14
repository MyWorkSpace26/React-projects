import { useState } from "react";
import { useValidation } from "../../hook/useValidation";
import InputField from "../../components/forms/InputField/index";
import PasswordField from "../../components/forms/PasswordField/index";
import SubmitButton from "../../components/forms/SubmitButton/index";
import Alert from "../../components/ui/Alert";

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = useValidation("login");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const { errors: validationErrors, isValid } = validate(formData);
    setErrors(validationErrors);

    if (!isValid) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      setSubmitError(error.message || "Неверный email или пароль");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <InputField
        label="Электронная почта"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="username"
        required
      />

      <PasswordField
        label="Пароль"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        showPassword={showPassword}
        onToggleVisibility={() => setShowPassword(!showPassword)}
        autoComplete="current-password"
        required
      />

      {submitError && <Alert type="error" message={submitError} />}

      <SubmitButton isLoading={isLoading}>
        {isLoading ? "Загрузка..." : "Войти"}
      </SubmitButton>
    </form>
  );
};

export default LoginForm;
