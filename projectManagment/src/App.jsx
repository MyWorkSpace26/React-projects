import ProjectsSidebar from "./components/ProjectsSidebar";
import NewPoject from "./components/NewPoject";
import NoProjectSelected from "./components/NoProjectSelected";
function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {/* <NewPoject /> */}
      <NoProjectSelected />
    </main>
  );
}

export default App;
