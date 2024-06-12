import { Link } from "@/lib/i18n";
import { MenuIcon } from "lucide-react";

import { Menu } from "@/components/boilerplate/dashboard/menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeImage } from "../theme-image";

interface SheetMenuProps {
  title: string;
}
export function SheetMenu({ title }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:w-72 px-3 h-full flex flex-col gap-1"
        side="left"
      >
        <SheetHeader className="py-0 my-0">
          <Button
            className="flex justify-center items-center hover:bg-transparent"
            variant="ghost"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-1">
              <ThemeImage
                srcLight="/logo-colored-white.svg"
                srcDark="/logo-colored.svg"
                width={28}
                height={28}
                alt="logo"
                className="mr-2"
              />
              <h1 className="font-bold text-lg">{title}</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
