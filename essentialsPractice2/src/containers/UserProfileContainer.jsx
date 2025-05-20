import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../api/api";
import { useLikes } from "../context/LikesContext";
import { UserProfile } from "../components/UserProfile";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function UserProfileContainer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = Number(id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const { isLiked, toggleLike } = useLikes();

  useEffect(() => {
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
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-medium">Пользователь не найден</h2>
          <button
            onClick={() => navigate("/users")}
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
      <header className="relative bg-purple-800 pb-10 pt-6">
        <div className="mx-auto max-w-6xl px-4">
          <UserProfile
            user={user}
            isLiked={isLiked(userId)}
            onLikeToggle={() => toggleLike(userId)}
            onBack={() => navigate("/users")}
            onLogout={() => navigate("/auth/login")}
            onAvatarUpload={handleAvatarUpload}
            uploadedAvatar={uploadedAvatar}
          />
        </div>
      </header>
    </main>
  );
}
