import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/pages/icons";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/hooks/use-toast";
import { Github } from "lucide-react";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    email: z.string().email("Please enter a valid email address"),
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be less than 50 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        username: data.username,
      });

      toast({
        title: "Success",
        description: "Account created successfully. Please verify your email.",
      });
      navigate("/verify-email");
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
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
            Join DevCollab Today
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Start your journey with our community of developers. Learn, teach,
            and grow together.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Global Community", value: "150+ Countries" },
              { title: "Active Mentors", value: "500+" },
              { title: "Learning Paths", value: "50+" },
              { title: "Success Stories", value: "1000+" },
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

        {/* Right Side - Sign Up Form */}
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-8 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/50"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Create your account
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your details below to join our developer community
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    {...register("username")}
                    id="username"
                    placeholder="johndoe"
                    className="bg-background/50"
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    {...register("fullName")}
                    id="fullName"
                    placeholder="John Doe"
                    className="bg-background/50"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    className="bg-background/50"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create account
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
              Already have an account?{" "}
              <Button
                variant="link"
                className="text-primary"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
