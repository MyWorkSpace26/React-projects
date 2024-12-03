import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root.jsx";
import InputFormPage from "./pages/InputFormPage.jsx";
import LogInFormPage from "./pages/LogInFormPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LogInFormPage /> },
      { path: "/signup", element: <InputFormPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
