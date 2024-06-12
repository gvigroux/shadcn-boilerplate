"use client";
import { createUser } from "@/actions/auth";
import { InputWithError } from "@/components/boilerplate/dashboard/InputWithError";
import { CardWrapper } from "@/components/boilerplate/dashboard/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  userRegistrationSchema,
  userRegistrationType,
} from "@/lib/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<userRegistrationType>({
    resolver: zodResolver(userRegistrationSchema),
  });

  // Default values: https://www.youtube.com/watch?v=cc_xmawJ8Kg  22:50

  const onSubmit: SubmitHandler<userRegistrationType> = async (data) => {
    const response = await createUser(data);
    if ("fieldErrors" in response)
      for (const key in response.fieldErrors) {
        setError(key as keyof userRegistrationType, {
          message: response.fieldErrors[key as keyof userRegistrationType]?.[0],
        });
      }
    if ("error" in response) setError("root", { message: response.error });

    if ("user" in response) {
      signIn("credentials", {
        email: response.user?.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });
    } else setError("root", { message: "Unknown error" });
  };

  return (
    <CardWrapper
      title="Sign Up"
      description="Enter your information to create an account"
      backButtonText="Already have an account?"
      backButtonLinkText="Sign in"
      backButtonHref="/auth/login"
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <InputWithError
              id="name"
              label="Name"
              type="text"
              placeholder="Joe Robinson"
              register={register}
              errors={errors}
              autoComplete="on"
            />
          </div>
          <div className="grid gap-2">
            <InputWithError
              id="email"
              label="Email"
              type="email"
              placeholder="m@example.com"
              register={register}
              errors={errors}
              autoComplete="on"
            />
          </div>
          <div className="grid gap-2">
            <InputWithError
              id="password"
              label="Password"
              type="password"
              placeholder="********"
              register={register}
              errors={errors}
            />
          </div>
          {errors.root && (
            <span className="pt-0 mt-0 text-sm text-red-500">
              {errors.root.message}
            </span>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Create an account
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
}
