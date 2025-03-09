import React, { createContext, useState, useEffect } from "react";
import { useCustomActionMutation } from "../redux/api";
import Cookie from "js-cookie";
import Login from "../pages/auth/login";
import { EndpointList } from "../redux/endpointList";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/mainSlice";
import { useLocation } from "react-router-dom";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Provider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [
    isLoggingIn,
    {  isLoading: loginLoading },
  ] = useCustomActionMutation();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const token = userData?.token?.token;
    if (token) {
      isLoggingIn({
        url: EndpointList.IS_LOGGED_IN,
        body: {
          token,
        },
      }).then((res: any) => {
        if (res?.error) {
          setIsAuthenticated(false);
          Cookie.remove("userData");
        } else {
          setIsAuthenticated(true);
        }
      });
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname, userData]);

  if (loginLoading) {
    return <div>Loading...</div>; // Burada loading spinner veya başka bir şey gösterebilirsiniz
  }

  // Eğer kullanıcı doğrulanmamışsa Login component'ini gösteriyoruz
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
