"use client";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/dashboard",
          icon: <User />,
          text: "Domains",
        },
        {
          link: "/",
          icon: <User />,
          text: "Site",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/settings",
          icon: <User />,
          text: "General Settings",
        },
        {
          link: "/privacy_policy",
          icon: <User />,
          text: "Privacy",
        },
      ],
    },
  ];

  const pathname = usePathname();
  console.log(pathname);

  /*
bg-accent - gris
bg-accent-foreground => Noir
text-*
  */

  return (
    <>
      <div className="hidden lg:flex min-w-[300px] border-r min-h-screen">
        <div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] p-4 min-h-screen">
          <div>User</div>
          <div className="grow">
            <Command style={{ overflow: "visible" }}>
              <CommandList style={{ overflow: "visible" }}>
                {menuList.map((menu: any, key: number) => (
                  <CommandGroup key={key} heading={menu.group}>
                    {menu.items.map((option: any, optionKey: number) => (
                      <CommandItem
                        key={optionKey}
                        className={clsx("flex gap-2 cursor-pointer", {
                          "bg-accent": pathname === option.link,
                        })}
                      >
                        {option.icon}
                        {option.text}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </div>
          <div>Settings</div>
        </div>
      </div>
      <div className="absolute lg:hidden">
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="grow">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Command style={{ overflow: "visible" }}>
              <CommandList style={{ overflow: "visible" }}>
                {menuList.map((menu: any, key: number) => (
                  <CommandGroup key={key} heading={menu.group}>
                    {menu.items.map((option: any, optionKey: number) => (
                      <CommandItem
                        key={optionKey}
                        className="flex gap-2 cursor-pointer"
                      >
                        {option.icon}
                        {option.text}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
