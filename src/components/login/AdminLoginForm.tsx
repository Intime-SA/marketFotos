"use client";

import { useState } from "react";
import { useAppDispatch } from "@/src/redux/store/hooks";
import { setUser } from "@/src/redux/slices/userSlice";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useToast } from "@/src/hooks/use-toast";
import { AuthUseCase } from "@/src/useCases/AuthUseCase";
import { FirebaseAuthRepository } from "@/src/data/authRepository";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const authUseCase = new AuthUseCase(new FirebaseAuthRepository());

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await authUseCase.signIn(email, password);
      dispatch(
        setUser({
          id: user.id,
          name: user.nombre || "Admin User",
          email: user.email,
        })
      );
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Log In"
        )}
      </Button>
    </form>
  );
}
