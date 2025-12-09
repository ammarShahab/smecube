import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from '../utils/protectedRoute';

// Main Pages
import SMECubeLanding from "../pages/SMECubeLanding";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Blogs from "../pages/Blogs"; 
import Tools from "../pages/Tools";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BlogDetail from "../pages/BlogDetail.jsx";
import GoogleCallback from "../pages/GoogleCallback";
import VideoCall from "../pages/VideoCall";

// Service Pages
import EcommerceSolution from "../pages/services/EcommerceSolution";
import DomainHostings from "../pages/services/DomainHostings";
import BrandPageSetup from "../pages/services/BrandPageSetup";
import BulkSMS from "../pages/services/BulkSMS";
import BusinessConsulting from "../pages/services/BusinessConsulting";
import ChatbotSetup from "../pages/services/ChatbotSetup";
import FacebookBoosting from "../pages/services/FacebookBoosting";
import WebDevelopment from "../pages/services/WebDevelopment";
import GraphicDesign from "../pages/services/GraphicDesign";
import LandingPage from "../pages/services/LandingPage";
import App from "../layouts/App";
import BusinessTraining from "../pages/services/BusinessTraining";
import IssueFixing from "../pages/services/IssueFixing";

// Admin
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminPricing from "../pages/admin/dashboard/AdminPricing";
import AdminSettings from "../pages/admin/dashboard/AdminSettings";
import AdminBlogs from "../pages/admin/dashboard/AdminBlogs";
import AdminWebdev from "../pages/admin/dashboard/AdminWebdev";
import AdminFacebookBoosting from "../pages/admin/dashboard/AdminFacebookBoosting";
import AdminEcommerceSolution from "../pages/admin/dashboard/AdminEcommerceSolution";
import AdminChatbotSetup from "../pages/admin/dashboard/AdminChatbotSetup";
import AdminIssueFixing from "../pages/admin/dashboard/AdminIssueFixing";
import AdminBusinessTraining from "../pages/admin/dashboard/AdminBusinessTraining";
import AdminBulkSMS from "../pages/admin/dashboard/AdminBulkSMS";
import AdminLandingPage from "../pages/admin/dashboard/AdminLandingPage";
import AdminBusinessConsulting from "../pages/admin/dashboard/AdminBusinessConsulting";
import AdminDomainHosting from "../pages/admin/dashboard/AdminDomainHosting.jsx";
import AdminBrandPageSetup from "../pages/admin/dashboard/AdminBrandPageSetup";
import AdminGraphicDesign from "../pages/admin/dashboard/AdminGraphicDesign";
import AdminContact from "../pages/admin/dashboard/AdminContact";
import AdminAbout from "../pages/admin/dashboard/AdminAbout";
import AdminRequests from "../pages/admin/dashboard/AdminRequests";
import AdminUsers from "../pages/admin/dashboard/AdminUsers";
import AdminMessages from "../pages/admin/dashboard/AdminMessages";
import AdminTickets from "../pages/admin/dashboard/AdminTickets";
import AdminNavbarSettings from "../pages/admin/dashboard/AdminNavbarSettings";

// Client
import ClientLayout from "../layouts/ClientLayout";
import ClientDashboard from "../pages/clientUser/ClientDashboard";
import ServicesSubscriptions from "../pages/clientUser/ServicesSubscriptions";
import ClientTools from "../pages/clientUser/ClientTools";
import ProjectsCampaigns from "../pages/clientUser/ProjectsCampaigns";
import BillingPayments from "../pages/clientUser/BillingPayments";
import NotificationsAlerts from "../pages/clientUser/NotificationsAlerts";
import SupportHelpDesk from "../pages/clientUser/SupportHelpDesk.jsx";
import AccountProfileSettings from "../pages/clientUser/AccountProfileSettings";
import ClientMessages from "../pages/clientUser/ClientMessages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SMECubeLanding /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:slug", element: <BlogDetail /> },
      { path: "tools", element: <Tools /> },
      { path: "pricing", element: <Pricing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      
      // Google OAuth Callback
      { path: "auth/google/callback", element: <GoogleCallback /> },

      // Video Call Route
      { path: "video-call/:roomId", element: <VideoCall /> },

      // Service Routes
      { path: "services/brand-page-setup", element: <BrandPageSetup /> },
      { path: "services/web-development", element: <WebDevelopment /> },
      { path: "services/bulk-sms", element: <BulkSMS /> },
      { path: "services/business-consulting", element: <BusinessConsulting /> },
      { path: "services/chatbot-setup", element: <ChatbotSetup /> },
      { path: "services/ecommerce-solution", element: <EcommerceSolution /> },
      { path: "services/facebook-boosting", element: <FacebookBoosting /> },
      { path: "services/graphic-design", element: <GraphicDesign /> },
      { path: "services/landing-page", element: <LandingPage /> },
      { path: "services/hosting", element: <DomainHostings /> },
      { path: "services/issue-fixing", element: <IssueFixing /> },
      { path: "services/business-training", element: <BusinessTraining /> },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "pricing", element: <AdminPricing /> },
      { path: "blogs", element: <AdminBlogs /> },
      { path: "contact", element: <AdminContact /> },
      { path: "about", element: <AdminAbout /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "navbar-settings", element: <AdminNavbarSettings /> },
      { path: "web-development", element: <AdminWebdev /> },
      { path: "domain-hosting", element: <AdminDomainHosting /> },
      { path: "bulk-sms", element: <AdminBulkSMS /> },
      { path: "landing-page", element: <AdminLandingPage /> },
      { path: "facebook-boosting", element: <AdminFacebookBoosting /> },
      { path: "ecommerce-solution", element: <AdminEcommerceSolution /> },
      { path: "chatbot-setup", element: <AdminChatbotSetup /> },
      { path: "issue-fixing", element: <AdminIssueFixing /> },
      { path: "business-training", element: <AdminBusinessTraining /> },
      { path: "business-consulting", element: <AdminBusinessConsulting /> },
      { path: "brand-page-setup", element: <AdminBrandPageSetup /> },
      { path: "graphic-design", element: <AdminGraphicDesign /> },
      { path: "requests", element: <AdminRequests /> },
      { path: "users", element: <AdminUsers /> },
      { path: "messages", element: <AdminMessages /> },
      { path: "tickets", element: <AdminTickets /> },
    ],
  },
  {
    path: "client",
    element: (
      <ProtectedRoute requiredRole="client">
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <ClientDashboard /> },
      { path: "account-profile", element: <AccountProfileSettings /> },
      { path: "notifications-alerts", element: <NotificationsAlerts /> },
      { path: "messages", element: <ClientMessages /> },
      { path: "support-helpdesk", element: <SupportHelpDesk /> },
    ],
  },
]);