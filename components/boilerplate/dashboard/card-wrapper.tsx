import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/lib/i18n";
import { Button } from "../../ui/button";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  backButtonText: string;
  backButtonLinkText: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  title,
  description,
  backButtonText,
  backButtonLinkText,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="m-auto max-w-sm w-[400px] shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        {children}

        {showSocial && (
          <>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <Social />
          </>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full text-sm text-center">
          {backButtonText}&nbsp;
          <Button size="sm" variant="link" asChild className="px-0 font-normal">
            <Link href={backButtonHref}>{backButtonLinkText}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
