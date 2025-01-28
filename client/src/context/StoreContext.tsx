import { StoreContextType, User } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const StoreContext = createContext<null | StoreContextType>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <StoreContext.Provider value={{ user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  return context;
};

export default useStore;
