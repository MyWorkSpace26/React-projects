import { Heart, Phone, Mail, Briefcase } from "lucide-react";
import { use } from "react";

export function UserProfile({
  user,
  isLiked,
  onLikeToggle,
  onBack,
  onLogout,
  onAvatarUpload,
  uploadedAvatar,
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative h-36 w-36">
                <img
                  src={uploadedAvatar || user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="h-full w-full rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-purple-700 p-2 text-white shadow-lg">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onAvatarUpload}
                  />
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </label>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-4">О специалисте</h3>
            <p className="mb-4 text-gray-800">{user.bio}</p>

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
            <h3 className="mb-4 text-lg font-medium">Контактная информация</h3>
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
            <div className="space-y-3 ">
              <button
                onClick={onLikeToggle}
                className={`flex w-full items-center justify-center rounded-md border px-4 py-2 cursor-pointer ${
                  isLiked
                    ? "border-purple-700 bg-purple-700 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${isLiked ? "fill-white" : ""}`}
                />
                {isLiked ? "В избранном" : "Добавить в избранное"}
              </button>
              <button
                onClick={onBack}
                className="w-full rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                Назад к списку
              </button>
              <button
                onClick={onLogout}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-red-600 hover:bg-gray-50 cursor-pointer"
              >
                Выход
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
