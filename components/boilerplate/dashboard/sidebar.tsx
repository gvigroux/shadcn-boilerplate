import { Link } from "@/lib/i18n";

import { Menu } from "@/components/boilerplate/dashboard/menu";
import { SidebarToggle } from "@/components/boilerplate/dashboard/sidebarToggle";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { ThemeImage } from "../theme-image";

interface SidebarProps {
  title: string;
}

export function Sidebar({ title }: SidebarProps) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-3 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 hover:bg-transparent",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="ghost"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-1 pt-3">
            <ThemeImage
              srcLight="/logo-colored-white.svg"
              srcDark="/logo-colored.svg"
              width={28}
              height={28}
              alt="logo"
              className="mr-2"
            />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              {title}
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
