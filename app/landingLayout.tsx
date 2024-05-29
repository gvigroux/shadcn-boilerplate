import type { ReactNode } from "react";

import { Navbar } from "@/components/boilerplate/landing/navbar";

type Props = {
  children?: ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default LandingLayout;
