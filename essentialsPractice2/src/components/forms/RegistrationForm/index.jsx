import { Link } from "react-router-dom";
import PasswordInput from "../../ui/PasswordInput/index";

const RegistrationForm = ({
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
        <h1 className="mb-6 text-2xl font-medium">Регистрация</h1>

        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          {/* Поле имени */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
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
              autoComplete="email"
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
            autoComplete="new-password"
            required
            minLength={6}
          />

          {/* Поле подтверждения пароля */}
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            error={errors.confirmPassword}
            label="Подтвердите пароль"
            autoComplete="new-password"
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

export default RegistrationForm;
