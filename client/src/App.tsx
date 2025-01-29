import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import { Home } from "lucide-react";
import useStore from "./context/StoreContext";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { getUser } from "./graphql/query";
import toast from "react-hot-toast";

const App = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();
  const [getUserHandler, { data, error }] = useLazyQuery(getUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserHandler({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data.getUser.data);
      navigate("/home");
    } else if (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
  }, [data, error]);

  return (
    <>
      <div className="min-h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute flex items-center justify-center -z-10">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white  hover:bg-dot-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default App;
