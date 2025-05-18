import { Routes, Route } from "react-router-dom";
import RegisterPage from "./main/index";
import LoginPage from "./login";
import SuccessPage from "./success";
import UsersPage from "./users";
import UserPage from "./users/user";

const App = () => {
  return (
    <Routes>
      <Route path={""} element={<RegisterPage />} />
      <Route path={"/auth/login"} element={<LoginPage />} />
      <Route path={"/auth/success"} element={<SuccessPage />} />
      <Route path={"/users"} element={<UsersPage />} />
      <Route path={"/users/:id"} element={<UserPage />} />
    </Routes>
  );
};

export default App;
