import authOptions from "@/app/api/auth/[...nextauth]/options";
import { DefaultSession, DefaultUser, getServerSession } from "next-auth";

export const getAuthSession = () => {
  return getServerSession(authOptions);
};

export const getRequiredAuthSession = async () => {
  const session = await getAuthSession();
  if (!session?.user) throw new Error("Session not found");
  return session;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultUser & {
      id: string;
      initials: string;
    };
  }
}

// ...
/*
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
*/
