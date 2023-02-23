import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";


type CTX = {
  currentUser?: User | null,
  setCurrentUser: React.Dispatch<User>,
  logout: any
}


export const AuthContext = createContext<CTX | any>(null);

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<User>();

  const logout = () => {
    toast.success("Амжилттай гарлаа");
    localStorage.removeItem("user");
    setCurrentUser(undefined);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    if (localStorage.getItem("user") !== "undefined") {
      const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user") as string) || null
      console.log("hah", user)
      setCurrentUser(user)
    }
    console.log("cur", currentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
