import { Routes, Route } from "react-router-dom";
import RegisterPage from "./main/index";
import LoginPage from "./login";

const App = () => {
  return (
    <Routes>
      <Route path={""} element={<RegisterPage />} />
      <Route path={"/auth/login"} element={<LoginPage />} />
    </Routes>
  );
};

export default App;
