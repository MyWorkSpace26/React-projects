import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth";
import { useValidation } from "../../../hook/useValidation";
import LoginForm from "../../../components/forms/LoginForm/index";

const LoginContainer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      const response = await loginUser(formData.email, formData.password);
      if (response.token) {
        navigate("/users", { replace: true });
      } else {
        setSubmitError("Произошла неизвестная ошибка");
      }
    } catch (error) {
      setSubmitError(error.message || "Неверный email или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      formData={formData}
      errors={errors}
      submitError={submitError}
      isLoading={isLoading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
