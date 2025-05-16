import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoRedirect = (path, delay = 5000) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(path);
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, path, delay]);
};

export default useAutoRedirect;
