import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white  hover:bg-dot-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
