import { Outlet } from "react-router";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AuthProvider } from "../providers/auth";
import Logout from "./logout";
export default function Layout() {
 
  return (
    <AuthProvider>
    <DashboardLayout defaultSidebarCollapsed={true} 
      slots={{
        sidebarFooter: Logout ,
      }}
    >
      <div className="h-full bg-[#F2F2F2] p-5">
        <Outlet />
      </div>
    </DashboardLayout>
    </AuthProvider>

  );
}
