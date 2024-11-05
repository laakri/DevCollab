import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@/components/theme-provider";
import LearningExchangePage from "./features/LearningExchange/LearningExchangePage";
import LoginPage from "./features/Auth/LoginPage";
import { Navbar } from "./components/pages/Navbar";
import CollaborationPage from "./features/Collaboration/CollaborationPage";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import MatchupPage from "./features/Matchup/MatchupPage";
import LearningJourneyPage from "./pages/LearningJourneyPage";
import ProfilePage from "./features/Profile/ProfilePage";
import DocumentationPage from "./pages/Documentation";
import { Toaster } from "@/components/ui/toaster";
import SignUpPage from "@/features/Auth/SignUpPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LearningPostsPage from "@/features/LearningPosts/LearningPostsPage";
import VerifyEmailPage from "@/features/Auth/VerifyEmailPage";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import SettingsPage from "./features/Profile/SettingsPage";
import { LiarGame } from "./features/game/LiarGame";

function App() {
  useAuthCheck();

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Toaster />
            {window.location.pathname !== "/tahchifih" && <Navbar />}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/projects" element={<LearningExchangePage />} />
              <Route path="/tahchifih" element={<LiarGame />} />
              <Route
                path="/CollaborationPage"
                element={<CollaborationPage />}
              />
              <Route path="/matchup" element={<MatchupPage />} />
              <Route path="/learninge" element={<LearningJourneyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/learning-posts"
                element={
                  <ProtectedRoute>
                    <LearningPostsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
