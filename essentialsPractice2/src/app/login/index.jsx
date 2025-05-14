import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../../api/auth";
import { useValidation } from "../../hook/useValidation";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = useValidation("login");

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
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 text-2xl font-medium">Вход</h1>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
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
              className={`w-full rounded-md bg-gray-50 p-3 text-sm outline-none ${
                errors.email
                  ? "border border-red-500"
                  : "border border-gray-200"
              }`}
              autoComplete="username"
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
                className={`w-full rounded-md bg-gray-50 p-3 text-sm outline-none ${
                  errors.password
                    ? "border border-red-500"
                    : "border border-gray-200"
                }`}
                autoComplete="current-password"
                required
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

          {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-purple-700 p-3 text-center text-white hover:bg-purple-800 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
        </form>

        <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
          <p className="font-medium">Тестовые данные для входа:</p>
          <p>Email: eve.holt@reqres.in</p>
          <p>Password: cityslicka</p>
        </div>

        <p className="mt-4 text-center text-sm">
          Нет аккаунта?{" "}
          <Link to="/" className="text-purple-700 hover:underline font-medium">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
