import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Channel from "./pages/Channel";
import Threads from "./pages/Threads";
import Activity from "./pages/Activity";
import Starred from "./pages/Starred";
import Directories from "./pages/Directories";
import Huddles from "./pages/Huddles";
import NewMessage from "./pages/NewMessage";
import DMs from "./pages/DMs";
import Files from "./pages/Files";
import More from "./pages/More";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/c/:channelId" element={<Channel />} />
      <Route path="/threads" element={<Threads />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/starred" element={<Starred />} />
      <Route path="/directories" element={<Directories />} />
      <Route path="/huddles" element={<Huddles />} />
      <Route path="/new-message" element={<NewMessage />} />
      <Route path="/dms" element={<DMs />} />
      <Route path="/files" element={<Files />} />
      <Route path="/more" element={<More />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
