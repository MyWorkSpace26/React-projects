import React from "react";
import Button from "./Button";
import { useState } from "react";

const ProjectsSidebar = () => {
  return (
    <>
      <aside className="w-1/3 px-9 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
          Your Project
        </h2>
        <div>
          <Button>+ Add Project</Button>
        </div>
        <ul>
          <li>Project 1</li>
          <li>Project 2</li>
          <li>Project 3</li>
        </ul>
      </aside>
    </>
  );
};

export default ProjectsSidebar;
