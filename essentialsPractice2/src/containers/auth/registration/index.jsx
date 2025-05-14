import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/auth";
import { useValidation } from "../../../hook/useValidation";
import RegistrationForm from "../../../components/forms/RegistrationForm/index";

const RegistrationContainer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = useValidation("registration");

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
      const response = await registerUser(formData.email, formData.password);
      if (response.token) {
        navigate("/auth/success", { replace: true });
      } else {
        setSubmitError("Регистрация завершена, но токен не получен");
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      setSubmitError(
        error.message || "Ошибка регистрации. Пожалуйста, попробуйте снова."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationForm
      formData={formData}
      errors={errors}
      submitError={submitError}
      isLoading={isLoading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistrationContainer;
