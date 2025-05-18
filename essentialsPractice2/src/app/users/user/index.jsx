import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
/* import Image from "next/image"; */
import { Heart, Phone, Mail, Briefcase } from "lucide-react";
import { getUserDetails } from "../../../api/api";
import { logout } from "../../../api/auth";
import { useParams } from "react-router-dom";

export default function UserPage({ params }) {
  const navigation = useNavigate();
  const { id } = useParams();
  const userId = Number(id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  useEffect(() => {
    const savedLikes = localStorage.getItem("likedUsers");
    if (savedLikes) {
      const likedUsers = JSON.parse(savedLikes);
      setLiked(likedUsers.includes(userId));
    }

    const savedAvatar = localStorage.getItem(`avatar_${userId}`);
    if (savedAvatar) {
      setUploadedAvatar(savedAvatar);
    }

    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const userData = await getUserDetails(userId);
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation("/auth/login");
  };

  const toggleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      const savedLikes = localStorage.getItem("likedUsers");
      let likedUsers = savedLikes ? JSON.parse(savedLikes) : [];

      if (newLiked) {
        if (!likedUsers.includes(userId)) {
          likedUsers.push(userId);
        }
      } else {
        likedUsers = likedUsers.filter((likedId) => likedId !== userId);
      }

      localStorage.setItem("likedUsers", JSON.stringify(likedUsers));
      return newLiked;
    });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        setUploadedAvatar(result);
        localStorage.setItem(`avatar_${userId}`, result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-700 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-medium">Пользователь не найден</h2>
          <button
            onClick={() => navigation("/users")}
            className="rounded-md bg-purple-700 px-4 py-2 text-white"
          >
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative bg-purple-700 pb-10 pt-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigation("/users")}
              className="rounded-md border border-white/30 px-4 py-1.5 text-sm text-white hover:bg-white/10"
            >
              Назад
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md border border-white/30 px-4 py-1.5 text-sm text-white hover:bg-white/10"
            >
              Выход
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8">
            <div className="relative mb-4 h-36 w-36 sm:mb-0">
              <div className="h-full w-full overflow-hidden rounded-full border-4 border-white/20">
                <img
                  src={uploadedAvatar || user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  width={144}
                  height={144}
                  className="h-full w-full object-cover"
                />
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-purple-700 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white">
                {user.first_name} {user.last_name}
              </h1>
              <p className="mt-1 text-xl text-white/80">{user.position}</p>
            </div>
          </div>
        </div>
      </header>

      {/* User Info */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <p className="mb-4 text-gray-800">{user.bio}</p>

              <p className="mb-4 text-gray-800">
                В работе с клиентами недостаточно просто решить конкретную
                проблему или помочь справиться с трудностями. Не менее важно
                уделять внимание обмену знаниями: "Один из самых позитивных
                моментов — это осознание того, что ты помог клиенту перейти на
                совершенно новый уровень компетентности, уверенность в том, что
                после окончания проекта у клиента есть все необходимое, чтобы
                дальше развиваться самостоятельно".
              </p>

              {user.projects && user.projects.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-medium">Проекты</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.projects.map((project, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-purple-100 px-3 py-1 text-sm text-purple-800"
                      >
                        <Briefcase className="mr-1.5 h-4 w-4" />
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {user.skills && user.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-medium">Навыки</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">
                Контактная информация
              </h3>
              <div className="space-y-3">
                {user.phone && (
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5 text-purple-700" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-purple-700" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Действия</h3>
              <button
                onClick={toggleLike}
                className={`flex w-full items-center justify-center rounded-md border px-4 py-2 ${
                  liked
                    ? "border-purple-700 bg-purple-700 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${liked ? "fill-white" : ""}`}
                />
                {liked ? "В избранном" : "Добавить в избранное"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
