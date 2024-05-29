import { CardWrapper } from "@/components/boilerplate/card-wrapper";
import { FormPasswordReset } from "@/components/boilerplate/form-password-reset";

export default function ForgotPage() {
  return (
    <CardWrapper
      title="Account recuperation"
      description="Forgot your password?"
      backButtonText="Back to"
      backButtonLinkText="Sign in"
      backButtonHref="/auth/login"
    >
      <FormPasswordReset />
    </CardWrapper>
  );
}
