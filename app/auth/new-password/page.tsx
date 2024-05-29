import { CardWrapper } from "@/components/boilerplate/card-wrapper";
import { FormNewPassword } from "@/components/boilerplate/form-new-password";

export default function NewPasswordPage() {
  return (
    <CardWrapper
      title="Account recuperation"
      description="Enter a new password"
      backButtonText="Back to"
      backButtonLinkText="Sign in"
      backButtonHref="/auth/login"
    >
      <FormNewPassword />
    </CardWrapper>
  );
}
