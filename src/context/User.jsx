import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "../hooks/useUser";
export const User = createContext();

export const UserProvider = ({ children }) => {
  const { getUerDetail } = useUser();
  const { data: userData, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: getUerDetail,
  });

  return (
    <User.Provider value={{ userData, refetch }}>{children}</User.Provider>
  );
};
