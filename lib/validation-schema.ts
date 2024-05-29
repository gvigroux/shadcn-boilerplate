import * as z from "zod";

export const userRegistrationSchema = z.object({
  name: z.string().min(5, "Name is too short").max(70),
  email: z.string().email(),
  password: z.string().min(8, "Password is too short").max(100),
});

export type userRegistrationType = z.infer<typeof userRegistrationSchema>;

export async function validateUser(formData: FormData) {
  const validatedFields = await userRegistrationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  return validatedFields;
}

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password is too short").max(100),
});
export type userLoginType = z.infer<typeof userLoginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password is too short").max(100),
  token: z.string().min(8, "Password is too short").max(100),
});
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is too short"),
  email: z.string().email(),
  company: z.string(),
  message: z.string().min(1, "Message is required"),
});
export type contactType = z.infer<typeof contactSchema>;
