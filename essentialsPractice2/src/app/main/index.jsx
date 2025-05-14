import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useValidation } from "../../hook/useValidation";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = useValidation("registration");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
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
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 text-2xl font-medium">Регистрация</h1>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-md border bg-gray-50 p-3 text-sm outline-none ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
              autoComplete="name"
              required
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md border bg-gray-50 p-3 text-sm outline-none ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              autoComplete="email"
              required
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-md border bg-gray-50 p-3 text-sm outline-none ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
                autoComplete="new-password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Подтвердите пароль
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-md border bg-gray-50 p-3 text-sm outline-none ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showConfirmPassword ? "Скрыть пароль" : "Показать пароль"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-purple-700 p-3 text-center text-white hover:bg-purple-800 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
          <p className="font-medium">Тестовые данные для регистрации:</p>
          <p>Email: eve.holt@reqres.in</p>
          <p>Password: Любой пароль (минимум 6 символов)</p>
        </div>

        <p className="mt-4 text-center text-sm">
          Уже есть аккаунт?{" "}
          <Link
            to="/auth/login"
            className="text-purple-700 hover:underline font-medium"
          >
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
