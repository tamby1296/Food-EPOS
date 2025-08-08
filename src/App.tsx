import { Outlet } from "react-router";
import Navigation from "./components/Navigation";

function App() {
  return (
    <main className="flex pl-[100px]">
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
