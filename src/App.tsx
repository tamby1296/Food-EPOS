import { Outlet } from "react-router";
import Navigation from "./components/Navigation";

function App() {
  return (
    <main className="flex pl-[100px] min-h-[100vh]">
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
