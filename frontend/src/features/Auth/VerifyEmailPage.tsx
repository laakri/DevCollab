import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/pages/icons";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import confetti from "canvas-confetti";
import { CheckCircle, XCircle } from "lucide-react";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [verificationState, setVerificationState] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const { toast } = useToast();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      console.log("No token found");
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      await authService.verifyEmail(token);
      setVerificationState("success");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
      toast({
        title: "Success",
        description: "Email verified successfully! Welcome to DevCollab!",
        variant: "default",
      });
    } catch (error) {
      setVerificationState("error");
      toast({
        title: "Error",
        description: "Email verification failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-4 top-1/2 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={verificationState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-md w-full p-8 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/50"
        >
          {verificationState === "verifying" && (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Icons.spinner className="h-12 w-12 text-primary" />
              </motion.div>
              <h2 className="mt-6 text-2xl font-semibold">
                Verifying Your Email
              </h2>
              <p className="mt-2 text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {verificationState === "success" && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              </motion.div>
              <h2 className="mt-6 text-2xl font-semibold">Email Verified!</h2>
              <p className="mt-2 text-muted-foreground">
                Your email has been successfully verified. Welcome to DevCollab!
              </p>
              <div className="mt-8 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Redirecting you to login in 5 seconds...
                </p>
                <Button className="w-full" onClick={() => navigate("/login")}>
                  Go to Login
                </Button>
              </div>
            </div>
          )}

          {verificationState === "error" && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <XCircle className="h-12 w-12 text-destructive mx-auto" />
              </motion.div>
              <h2 className="mt-6 text-2xl font-semibold">
                Verification Failed
              </h2>
              <p className="mt-2 text-muted-foreground">
                We couldn't verify your email. The link might be expired or
                invalid.
              </p>
              <div className="mt-8 space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/signup")}
                >
                  Try Again
                </Button>
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VerifyEmailPage;
