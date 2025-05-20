import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/api";
import { useLikes } from "../context/LikesContext";
import { UserCard } from "../components/UserCard";
import { Pagination } from "../components/Pagination";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { UsersHeader } from "../components/UsersHeader";

export function UsersListContainer() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isLiked, toggleLike } = useLikes();

  useEffect(() => {
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

  const handleLogout = () => {
    navigate("/auth/login");
  };

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <UsersHeader onLogout={handleLogout} />

      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isLiked={isLiked(user.id)}
                  onLikeToggle={toggleLike}
                  onClick={() => handleUserClick(user.id)}
                />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />

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
