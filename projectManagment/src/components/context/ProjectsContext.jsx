import React, { createContext, useState, useContext } from "react";

const ProjectsContext = createContext();

export const useProjectsState = () => useContext(ProjectsContext);

export const ProjectsStateProvider = ({ children }) => {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  return (
    <ProjectsContext.Provider
      value={{ projectsState, setProjectsState, handleAddProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;
