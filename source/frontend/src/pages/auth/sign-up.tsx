import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { Card, CardHeader } from "@/components/ui/card";

const SignUp = () => {
  const { register, isSigningUp } = useAuth();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isSigningUp) return;
    register(values);
  };
  return <div className="flex min-h-svh items-center justify-center bg-muted p-6">Sign Up</div>;
  <div className = "w-full max-w-sm">
    <Card>
      <CardHeader className = "flex flex-col items-center justify-center gap-3">

      </CardHeader>
    </Card>
  </div>
};
export default SignUp;
