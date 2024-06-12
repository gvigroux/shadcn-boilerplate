import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface InputProps {
  id: string;
  type: string;
  label: string;
  register: any;
  errors: any;
  placeholder: string | undefined;
  autoComplete?: string;
}

export function InputWithError({
  id,
  type,
  label,
  register,
  placeholder,
  autoComplete,
  errors,
}: InputProps) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...register(id)}
        placeholder={placeholder}
        id={id}
        name={id}
        type={type}
        required
        className={cn("", errors.name ? "border-red-500" : "")}
        autoComplete={autoComplete}
      />
      {errors[id] && (
        <span className="pt-0 mt-0 text-sm text-red-500">
          {errors[id].message}
        </span>
      )}
    </>
  );
}
