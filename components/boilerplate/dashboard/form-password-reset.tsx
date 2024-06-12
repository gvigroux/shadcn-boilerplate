"use client";

import { sendResetPasswordEmail } from "@/actions/auth";
import {
  forgotPasswordSchema,
  forgotPasswordType,
} from "@/lib/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { InputWithError } from "./InputWithError";
import { FormSuccess } from "./form-success";

export function FormPasswordReset() {
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<forgotPasswordType> = async (data) => {
    setSuccess(undefined);
    setError("root", { message: undefined });
    const result = await sendResetPasswordEmail(data);

    if (result?.error) {
      try {
        const json = JSON.parse(result.error);
        setError(json.field, { message: json.message });
      } catch (error) {
        setError("root", { message: result.error });
      }
    }
    if (result?.success) {
      setSuccess(result?.success);
    }
  };

  return (
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
        {errors.root?.message && (
          <span className="pt-0 mt-0 text-sm text-red-500">
            {errors.root.message}
          </span>
        )}
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Send reset email
        </Button>
      </div>
    </form>
  );
}
