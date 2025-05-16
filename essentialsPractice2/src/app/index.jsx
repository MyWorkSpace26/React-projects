import { Routes, Route } from "react-router-dom";
import RegisterPage from "./main/index";
import LoginPage from "./login";
import SuccessPage from "./SuccessPage";

const App = () => {
  return (
    <Routes>
      <Route path={""} element={<RegisterPage />} />
      <Route path={"/auth/login"} element={<LoginPage />} />
      <Route path={"/auth/success"} element={<SuccessPage />} />
    </Routes>
  );
};

export default App;
