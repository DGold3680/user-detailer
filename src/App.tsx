import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import UserDetails from "./pages/UserDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <Helmet defaultTitle="User Directory" titleTemplate="%s | User Directory">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:site_name" content="User Directory" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="User Directory" />
          <meta name="twitter:description" content="Browse and manage user profiles in our comprehensive directory." />
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;