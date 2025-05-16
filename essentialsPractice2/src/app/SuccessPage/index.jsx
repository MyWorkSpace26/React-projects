import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  let navigation = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation("/auth/login");
    }, 5000);

    return () => clearTimeout(timer);
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mb-2 text-2xl font-medium">Регистрация успешна!</h1>
        <p className="mb-6 text-gray-600">
          Ваш аккаунт был успешно создан. Теперь вы можете войти в систему.
        </p>
        <button
          onClick={() => router.push("/auth/login")}
          className="w-full rounded-md bg-purple-700 p-3 text-center text-white hover:bg-purple-800"
        >
          Перейти к входу
        </button>
      </div>
    </main>
  );
}
