import { Heart } from "lucide-react";

export function UserCard({ user, isLiked, onLikeToggle, onClick }) {
  return (
    <div
      className="relative flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
      onClick={onClick}
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
          onLikeToggle(user.id);
        }}
      >
        <Heart
          className={`h-5 w-5 ${
            isLiked ? "fill-purple-700 text-purple-700" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
}
