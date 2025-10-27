/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";
import { UserType } from "@/types/api.type";
import usePermissions from "@/hooks/use-permissions";
import { PermissionType } from "@/constant";
import useAuth from "@/hooks/use-auth";

// Define the context shape
type AuthContextType = {
  user?: UserType;
  hasPermission: (permission: PermissionType) => boolean;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetchAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: authData,
    error,
    isLoading,
    isFetching,
    refetch: refetchAuth,
  } = useAuth();

  const user = authData?.user;

  const permissions = usePermissions(user);

  const hasPermission = (permission: PermissionType): boolean => {
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        hasPermission,
        error,
        isLoading,
        isFetching,
        refetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
