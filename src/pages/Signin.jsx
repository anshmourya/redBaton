"use client";
import React, { useContext } from "react";
import { H1 } from "@/components/typograph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/constant/validate";
import { cn } from "@/lib/utils";
import { useAccount } from "@/hooks/useAccount";
import { useNavigate } from "react-router-dom";
import { User } from "../context/User";
const Signin = () => {
  const navigate = useNavigate();
  const { createSession } = useAccount();
  const { refetch } = useContext(User);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // User is not logged in, proceed with creating a session
    if (await createSession(data.email, data.password)) {
      refetch();
      navigate("/");
    }
  };
  return (
    <>
      <div className="container flex items-center h-screen">
        <form
          className="m-auto max-w-[500px] w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <H1 className="text-center">SignIn</H1>
          <div className="my-10">
            <Input
              placeholder="Please enter your email"
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
              placeholder="Enter your password..."
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
            onClick={() => navigate("/signup")}
          >
            create your account..
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signin;
