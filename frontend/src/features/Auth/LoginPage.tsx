import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/pages/icons";
import { Github } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate("/projects"); // or wherever you want to redirect after login
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-4 top-1/2 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="container relative flex items-center justify-center md:justify-between px-8 py-12">
        {/* Left Side Content */}
        <div className="hidden md:block max-w-md">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome back to DevCollab
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Connect with developers worldwide, exchange knowledge, and grow
            together.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Active Users", value: "2,543+" },
              { title: "Learning Sessions", value: "1,200+" },
              { title: "Skills Shared", value: "500+" },
              { title: "Success Rate", value: "94%" },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50"
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-8 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/50"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign in to your account
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-background/50"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  className="text-xs text-primary"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </a>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                className="bg-background/50"
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign in
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-background/50">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="text-primary"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
