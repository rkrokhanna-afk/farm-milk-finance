import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/lib/app-context";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout";
import FarmerHome from "./pages/farmer/FarmerHome";
import FarmerMilk from "./pages/farmer/FarmerMilk";
import FarmerIncome from "./pages/farmer/FarmerIncome";
import FarmerAI from "./pages/farmer/FarmerAI";
import CenterHome from "./pages/center/CenterHome";
import CenterCollection from "./pages/center/CenterCollection";
import CenterFarmers from "./pages/center/CenterFarmers";
import CenterInventory from "./pages/center/CenterInventory";
import AdminHome from "./pages/admin/AdminHome";
import AdminCenters from "./pages/admin/AdminCenters";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isLoggedIn } = useApp();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/farmer" /> : <LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/farmer" element={<FarmerHome />} />
        <Route path="/farmer/milk" element={<FarmerMilk />} />
        <Route path="/farmer/income" element={<FarmerIncome />} />
        <Route path="/farmer/ai" element={<FarmerAI />} />
        <Route path="/center" element={<CenterHome />} />
        <Route path="/center/collection" element={<CenterCollection />} />
        <Route path="/center/farmers" element={<CenterFarmers />} />
        <Route path="/center/inventory" element={<CenterInventory />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/centers" element={<AdminCenters />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
