"use client";

import { InputWithError } from "@/components/boilerplate/InputWithError";
import { CardWrapper } from "@/components/boilerplate/card-wrapper";
import { Button } from "@/components/ui/button";
import { userLoginSchema, userLoginType } from "@/lib/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Link } from "@/lib/i18n";
import { useRouter } from "@/lib/i18n";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<userLoginType> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      try {
        const json = JSON.parse(result.error);
        setError(json.field, { message: json.message });
      } catch (error) {
        setError("root", { message: result.error });
      }
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <CardWrapper
      title="Login"
      description="Enter your email below to login to your account"
      backButtonText="Don't have an account?"
      backButtonLinkText="Sign up"
      backButtonHref="/auth/register"
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <div className="grid gap-4">
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
          <Button
            type="submit"
            className="w-full mb-0 pb-0"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </div>
        <div className="text-sm py-0 my-0">
          <Button size="sm" variant="link" asChild className="px-0 font-normal">
            <Link href="/auth/forgot">Forgot password?</Link>
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
}
