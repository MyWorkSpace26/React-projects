import { Link } from "react-router-dom";
import PasswordInput from "../../ui/PasswordInput/index";

const LoginForm = ({
  formData,
  errors,
  submitError,
  isLoading,
  onChange,
  onSubmit,
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 text-2xl font-medium">Вход</h1>

        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          {/* Поле email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className={`w-full rounded-md border bg-gray-50 p-3 text-sm outline-none ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              autoComplete="username"
              required
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Поле пароля */}
          <PasswordInput
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            error={errors.password}
            label="Пароль"
            autoComplete="current-password"
            required
          />

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

export default LoginForm;
