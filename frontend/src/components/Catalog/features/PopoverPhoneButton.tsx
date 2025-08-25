import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Phone } from "lucide-react";
import { WhatsAppLogo } from "./Icons/WhatsApp";
import { PhoneLogo } from "./Icons/Phone";
import { ViberLogo } from "./Icons/Viber";

interface Props {
  generaData: {
    phone: string;
  };
  footerClass?: string
}
export const PopoverPhoneButton = ({ generaData, footerClass }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Позвонить"
          className={footerClass || '"grid h-10 place-items-center rounded-2xl bg-indigo-600/90 text-white shadow-sm transition hover:bg-indigo-600"'}
        >
          <Phone className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-xs">
        <div className="grid gap-4 px-4">
          <div className="space-y-2 grid">
            <a
              href={`tel:${generaData.phone}`}
              className="flex gap-3 hover:text-indigo-700 font-semibold items-center"
            >
              <PhoneLogo width={30} height={30} /> {generaData.phone}
            </a>

            <a
              href={`viber://chat?number=%2B${generaData.phone.replace(
                /\D/g,
                ""
              )}`}
              className="flex gap-3 hover:text-indigo-700 font-semibold items-center"
            >
              <ViberLogo width={30} height={30} /> {generaData.phone}
            </a>

            <a
              href={`https://wa.me/${generaData.phone.replace(/\D/g, "")}`}
              className="flex gap-3 hover:text-indigo-700 font-semibold items-center"
            >
              <WhatsAppLogo width={30} height={30} /> {generaData.phone}
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
