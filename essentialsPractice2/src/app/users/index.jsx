import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { getUsers } from "../../api/api";
import { logout } from "../../api/auth";

export default function UsersPage() {
  const navigation = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const savedLikes = localStorage.getItem("likedUsers");
    if (savedLikes) {
      setLikedUsers(JSON.parse(savedLikes));
    }

    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNum) => {
    setLoading(true);
    try {
      const data = await getUsers(pageNum);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation("/auth/login");
  };

  const toggleLike = (userId) => {
    setLikedUsers((prev) => {
      const newLikes = prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];
      localStorage.setItem("likedUsers", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const handleUserClick = (userId) => {
    navigation(`/users/${userId}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 p-6 text-center text-white">
        <div className="relative mx-auto max-w-6xl">
          <h1 className="mb-2 text-3xl font-bold">Наша команда</h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base">
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые лежатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </p>
          <button
            onClick={handleLogout}
            className="absolute right-0 top-0 rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
          >
            Выход
          </button>
        </div>
      </header>

      {/* Users Grid */}
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-700 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="relative flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className="mb-3 h-24 w-24 overflow-hidden rounded-full">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={`${user.first_name} ${user.last_name}`}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-center font-medium">
                    {user.first_name} {user.last_name}
                  </h3>
                  <button
                    className="absolute bottom-4 right-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(user.id);
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likedUsers.includes(user.id)
                          ? "fill-purple-700 text-purple-700"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              {totalPages > 1 && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="rounded-md border border-gray-300 px-3 py-1 disabled:opacity-50 cursor-pointer   "
                  >
                    Назад
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`rounded-md px-3 py-1 cursor-pointer ${
                        page === i + 1
                          ? "bg-purple-700 text-white"
                          : "border border-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="rounded-md border border-gray-300 px-3 py-1 disabled:opacity-50 cursor-pointer"
                  >
                    Вперед
                  </button>
                </div>
              )}
            </div>

            {/* Show More Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm disabled:opacity-50 cursor-pointer"
              >
                Показать еще
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
