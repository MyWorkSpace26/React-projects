import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProjectsStateProvider } from "./components/context/ProjectsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProjectsStateProvider>
    <App />
  </ProjectsStateProvider>
);
