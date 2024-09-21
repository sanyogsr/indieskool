import { useSession } from "next-auth/react";

export const useCustomSession = () => {
  const { data: session, status } = useSession();

  const isLoggedIn = !!session;
  const loading = status === "loading";

  return {
    session,
    isLoggedIn,
    loading,
  };
};
