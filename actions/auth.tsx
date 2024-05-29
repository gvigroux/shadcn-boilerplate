"use server";
import {
  getPasswordResetTokenByEmail,
  getPasswordResetTokenByToken,
} from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import prisma from "@/lib/db";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "@/lib/tokens";
import {
  forgotPasswordSchema,
  forgotPasswordType,
  resetPasswordSchema,
  resetPasswordType,
  userLoginSchema,
  userRegistrationSchema,
  userRegistrationType,
} from "@/lib/validation-schema";
import { compare, hash } from "bcrypt";
import { sendPasswordResetEmail, sendVerificationEmail } from "./email";

function formatError(error: any) {
  if (error instanceof Error) {
    console.log(error.message);
    return { error: error.message };
  }
  console.log(error);
  return { error: "Unknown error" };
}

export async function createUser(data: userRegistrationType) {
  const validatedFields = await userRegistrationSchema.safeParse(data);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Check if email is unique
  if (
    await prisma.user.findUnique({
      where: { email: validatedFields.data.email },
    })
  )
    return { fieldErrors: { email: ["Email already in used"] } };

  const hashedPassword = await hash(validatedFields.data.password, 10);

  let user = null;
  try {
    user = await prisma.user.create({
      data: {
        name: validatedFields.data.name.trim(),
        email: validatedFields.data.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return formatError(error);
  }

  const verificationToken = await generateVerificationToken(
    validatedFields.data.email
  );

  sendVerificationEmail(user, verificationToken);

  return { user: user };
}

export async function login(data: any) {
  const validatedFields = await userLoginSchema.safeParse(data);

  if (!validatedFields.success) throw new Error("Invalid credentials");

  const user = await getUserByEmail(validatedFields.data.email);
  if (!user) throw new Error("No User");

  const passwordsMatch = await compare(data.password, user.password || "");

  if (passwordsMatch) return user;
  throw new Error("Invalid credentials");
}

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: " Token does not exists!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.identifier);
  if (!existingUser) return { error: "Email does not exist!" };

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.identifier },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};

//******************************************************/
// Send an email when password has been forgotten

export const sendResetPasswordEmail = async (data: forgotPasswordType) => {
  const validatedFields = await forgotPasswordSchema.safeParse(data);

  if (!validatedFields.success)
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };

  const email = validatedFields.data.email;
  const user = await getUserByEmail(email);
  if (!user) return { error: "Email not found!" };

  const currentPasswordResetToken = await getPasswordResetTokenByEmail(email);
  if (currentPasswordResetToken) {
    var diffMs =
      (new Date().getTime() - currentPasswordResetToken.createdAt.getTime()) /
      1000;

    if (diffMs < 60)
      return {
        error:
          "An email was sent less than 1 minute ago. Please wait before retry!",
      };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(user, passwordResetToken);

  return { success: "Reset email sent!" };
};

//******************************************************/
// Update password (only when a valid token exists)

export const resetPassword = async (data: resetPasswordType) => {
  const validatedFields = await resetPasswordSchema.safeParse(data);

  if (!validatedFields.success)
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };

  const passwordResetToken = await getPasswordResetTokenByToken(data.token);
  if (!passwordResetToken) {
    return { error: "Invalid token!" };
  }

  const user = await getUserByEmail(passwordResetToken.identifier);
  const hashedPassword = await hash(validatedFields.data.password, 10);

  if (!user) return { error: "Invalid token!" };

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    return formatError(error);
  }
  return { success: "Password has been reseted!" };
};
