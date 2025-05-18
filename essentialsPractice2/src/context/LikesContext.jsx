import { createContext, useContext, useState, useEffect } from 'react';

const LikesContext = createContext();

export function LikesProvider({ children }) {
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const savedLikes = localStorage.getItem("likedUsers");
    if (savedLikes) {
      setLikedUsers(JSON.parse(savedLikes));
    }
  }, []);

  const toggleLike = (userId) => {
    setLikedUsers(prev => {
      const newLikes = prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId];
      localStorage.setItem("likedUsers", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const isLiked = (userId) => likedUsers.includes(userId);

  return (
    <LikesContext.Provider value={{ likedUsers, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
}
