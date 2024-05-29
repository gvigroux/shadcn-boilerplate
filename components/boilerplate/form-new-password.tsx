"use client";

import { resetPassword } from "@/actions/auth";
import {
  resetPasswordSchema,
  resetPasswordType,
} from "@/lib/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { InputWithError } from "./InputWithError";
import { FormSuccess } from "./form-success";

export function FormNewPassword() {
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<resetPasswordType> = async (data) => {
    setSuccess(undefined);
    setError("root", { message: undefined });
    const result = await resetPassword(data);

    //TODO FieldErrors not managed

    if (result.error) {
      reset();
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
  //
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <InputWithError
            id="password"
            label="New password"
            type="password"
            placeholder="********"
            register={register}
            errors={errors}
          />
        </div>
        <input
          {...register("token")}
          name="token"
          id="token"
          type="hidden"
          value={token || ""}
        />
        {errors.root?.message && (
          <span className="pt-0 mt-0 text-sm text-red-500">
            {errors.root.message}
          </span>
        )}
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isSubmitted}>
          Reset password
        </Button>
      </div>
    </form>
  );
}
