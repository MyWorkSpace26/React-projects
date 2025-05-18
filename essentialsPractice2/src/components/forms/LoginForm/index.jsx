import PasswordInput from "../../../containers/PasswordInput/index";
import AuthLayout from "../../layout/index";
import AuthFormButton from "../../AuthFormButton/index";
import Input from "../../Input";

const LoginForm = (props) => {
  return (
    <AuthLayout
      title="Вход"
      testData={{
        title: "Тестовые данные для входа:",
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      }}
      footerLinks={[
        {
          text: "Нет аккаунта?",
          path: "/",
          label: "Зарегистрироваться",
        },
      ]}
    >
      <form className="space-y-5" onSubmit={props.onSubmit} noValidate>
        <Input
          id="email"
          name="email"
          type="email"
          value={props.formData.email}
          onChange={props.onChange}
          error={props.errors.email}
          label="Электронная почта"
          autoComplete="username"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          value={props.formData.password}
          onChange={props.onChange}
          error={props.errors.password}
          label="Пароль"
          autoComplete="current-password"
          required
        />

        {props.submitError && (
          <p className="text-center text-sm text-red-500">
            {props.submitError}
          </p>
        )}

        <AuthFormButton isLoading={props.isLoading}>Войти</AuthFormButton>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
