import React from "react";
import { H1 } from "@/components/typograph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/constant/validate";
import { cn } from "@/lib/utils";
import { useAccount } from "@/hooks/useAccount";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Signup = () => {
  const navigate = useNavigate();
  const { createAccount } = useAccount();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (await createAccount(data)) {
      toast.success(
        "account created successfully. Please signin to use the site."
      );
      navigate("/signin");
    }
  };
  return (
    <>
      <div className="container grid h-screen place-items-center">
        <form
          className="m-auto max-w-[500px] w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <H1 className="text-center">Signup</H1>
          <div className="my-10">
            <Input
              placeholder="Enter your email"
              control={control}
              name="email"
            />
            <p
              className={cn(
                errors.email ? "visible " : "hidden",
                "text-red-500 mt-1"
              )}
            >
              {errors.email?.message || "nothing"}
            </p>
          </div>

          <div>
            <Input
              placeholder="Put strong password to keep you safe..."
              type="password"
              name="password"
              control={control}
            />
            <p
              className={cn(
                errors.password ? "visible" : "hidden",
                "text-red-500 mt-1"
              )}
            >
              {errors.password?.message || "nothing"}
            </p>
          </div>
          <div className="flex justify-center my-10">
            <Button>Let&apos;s goo!!!</Button>
          </div>
          <Button
            variant="link"
            className="float-right"
            type="button"
            onClick={() => navigate("/signin")}
          >
            Already have an account?..login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
