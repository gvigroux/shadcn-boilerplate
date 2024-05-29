import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
  srcLight: string;
  srcDark: string;
};

export const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, className, ...rest } = props;

  return (
    <>
      <Image
        {...rest}
        src={srcLight}
        className={cn("hidden dark:block", className)}
      />
      <Image
        {...rest}
        src={srcDark}
        className={cn("block dark:hidden", className)}
      />
    </>
  );
};
