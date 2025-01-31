import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import useStore from "./context/StoreContext";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { getUser } from "./graphql/query";
import toast from "react-hot-toast";
import Transaction from "./pages/Transaction";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

const App = () => {
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  const [getUserHandler] = useLazyQuery(getUser);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: responseData } = await getUserHandler({
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        const { success, message, data: userData } = responseData?.getUser;
        if (success) {
          setUser(userData);
          navigate("/");
        } else {
          toast.error(message || "Something went wrong");
        }
      } catch (e: any) {
        console.log(e);
        toast.error(e.message);
      }
    };

    const token = localStorage.getItem("token");
    if (token && !user) {
      getUser();
    }
  }, [user]);

  return (
    <>
      <div className="min-h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute flex items-center justify-center -z-10">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white  hover:bg-dot-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route
          path="/hi"
          element={<ProtectedRoute element={<Home />} />}
        ></Route>
        <Route
          path="/"
          element={<ProtectedRoute element={<Transaction />} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
