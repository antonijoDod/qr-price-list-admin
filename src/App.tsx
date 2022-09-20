import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import AuthContextProvider from "context/AuthContext";
import ProtectedRoute from "protectedRoute";
/* import DashboardLayout from "./components/layout/DashboardLayout"; */
import Register from "./pages/register";
import Login from "./pages/login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard";
import Business from "./pages/business";
import QrBuilder from "./pages/qrBuilder";
import PriceList from "./pages/price-list";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/business" element={<Business />} />
              <Route path="/price-list" element={<PriceList />} />
              <Route path="/qr-builder" element={<QrBuilder />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
