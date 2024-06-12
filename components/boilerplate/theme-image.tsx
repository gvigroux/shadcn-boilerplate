import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
  srcLight: string;
  srcDark: string;
};

export const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, className, alt, ...rest } = props;

  return (
    <>
      <Image
        {...rest}
        src={srcLight}
        alt={alt}
        className={cn("hidden dark:block", className)}
      />
      <Image
        {...rest}
        src={srcDark}
        alt={alt}
        className={cn("dark:hidden block", className)}
      />
    </>
  );
};
