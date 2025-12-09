// src/layouts/AdminLayout.js
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import ScrollToTop from "../utils/ScrollToTop";

const AdminLayout = () => {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Sidebar>
        <Outlet />
      </Sidebar>
    </HelmetProvider>
  );
};

export default AdminLayout;