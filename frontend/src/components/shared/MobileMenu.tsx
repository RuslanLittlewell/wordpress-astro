// components/MobileMenu.tsx
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CallbackButton } from "../MainPage/features/Callback";

type NavLink = { href: string; label: string };

export default function MobileMenu({
  data,
  links,
}: {
  data: any;
  links: NavLink[];
}) {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="text-white w-full" size={28} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="rounded-2xl px-3 py-6"
        >
          <div>
            <div className="text-xs/0 flex flex-col text-black">
              <span>{data.address}</span>
              <span>
                Время работы: {data.work_time}
              </span>
            </div>
            <div className="text-lg my-2">
              <a href={`tel:${data.phone}`} className="text-indigo-700 font-bold">
                {data.phone}
              </a>
            </div>
          </div>
          <hr />
          {links.map((link) => {
            return (
              <DropdownMenuItem key={link.href} asChild className="px-3 py-2">
                <a
                  href={link.href}
                  className="relative inline-block w-full whitespace-nowrap pb-1 text-xl"
                >
                  <span className="pr-6">{link.label}</span>
                </a>
              </DropdownMenuItem>
            );
          })}
   <hr />
          <CallbackButton
            url="https://api.littlewell-app.work/wp-json/"
            className="bg-main-gradient text-white mt-4"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
