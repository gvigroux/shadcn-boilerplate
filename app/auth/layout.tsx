import type { ReactNode } from "react";
import LandingLayout from "../landingLayout";

type Props = {
  children?: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <LandingLayout>
      <div className="flex h-[calc(100vh-60px)]">{children}</div>
      {/* Shadow effect */}
      <div className="shadow-effect"></div>
    </LandingLayout>
  );
}
