import { Outlet } from "react-router-dom";

import MainNavigation from "../components/navigation/MainNavigation.jsx";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
