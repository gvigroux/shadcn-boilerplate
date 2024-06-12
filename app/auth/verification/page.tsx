import { CardWrapper } from "@/components/boilerplate/dashboard/card-wrapper";
import { EmailVerification } from "@/components/boilerplate/dashboard/form-email-verification";

export default async function verificationPage() {
  return (
    <CardWrapper
      title="Email verification"
      description="Confirming your email"
      backButtonText="Back to"
      backButtonLinkText="Sign in"
      backButtonHref="/auth/login"
    >
      <EmailVerification />
    </CardWrapper>
  );
}
