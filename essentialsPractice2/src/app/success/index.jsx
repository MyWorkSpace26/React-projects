import SuccessCard from "../../components/ui/SuccessCard/index";
import useAutoRedirect from "../../hook/useAutoRedirect";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();
  useAutoRedirect("/auth/login", 5000);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <SuccessCard
        title="Регистрация успешна!"
        description="Ваш аккаунт был успешно создан. Теперь вы можете войти в систему."
        buttonText="Перейти к входу"
        onButtonClick={() => navigate("/auth/login")}
      />
    </main>
  );
}
