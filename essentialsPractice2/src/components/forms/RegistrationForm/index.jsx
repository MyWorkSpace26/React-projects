import PasswordInput from "../../../containers/PasswordInput/index";
import AuthLayout from "../../layout";
import AuthFormButton from "../../AuthFormButton/index";
import Input from "../../Input";

const RegistrationForm = (props) => {
  return (
    <AuthLayout
      title="Регистрация"
      testData={{
        title: "Тестовые данные для регистрации:",
        email: "eve.holt@reqres.in",
        password: "Любой пароль (минимум 6 символов)",
      }}
      footerLinks={[
        {
          text: "Уже есть аккаунт?",
          path: "/auth/login",
          label: "Войти",
        },
      ]}
    >
      <form className="space-y-5" onSubmit={props.onSubmit} noValidate>
        <Input
          id="name"
          name="name"
          value={props.formData.name}
          onChange={props.onChange}
          error={props.errors.name}
          label="Имя"
          autoComplete="name"
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          value={props.formData.email}
          onChange={props.onChange}
          error={props.errors.email}
          label="Электронная почта"
          autoComplete="email"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          value={props.formData.password}
          onChange={props.onChange}
          error={props.errors.password}
          label="Пароль"
          autoComplete="new-password"
          required
          minLength={6}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={props.formData.confirmPassword}
          onChange={props.onChange}
          error={props.errors.confirmPassword}
          label="Подтвердите пароль"
          autoComplete="new-password"
          required
        />

        {props.submitError && (
          <p className="text-center text-sm text-red-500">
            {props.submitError}
          </p>
        )}

        <AuthFormButton isLoading={props.isLoading}>
          Зарегистрироваться
        </AuthFormButton>
      </form>
    </AuthLayout>
  );
};

export default RegistrationForm;
