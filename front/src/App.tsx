import { Outlet } from "react-router";
import Navigation from "./components/Navigation";
import MobileBlocker from "./components/MobileBlocker";

function App() {
  return (
    <main className="flex pl-[100px] min-h-[100vh]">
      <MobileBlocker />
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
