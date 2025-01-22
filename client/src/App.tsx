import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      <div className="min-h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute flex items-center justify-center -z-10">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white  hover:bg-dot-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
