import { Outlet } from "react-router";
import { AuthProvider } from "@/context/auth-provider";
import Header from "@/components/header";

const AppLayout = () => {
  return (
    <AuthProvider>
      <div>
        <Header />
        <main className="container mx-auto flex flex-col gap-4 px-2 py-4">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
};

export default AppLayout;
