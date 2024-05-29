import { CardWrapper } from "@/components/boilerplate/card-wrapper";
import { EmailVerification } from "@/components/boilerplate/form-email-verification";

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
