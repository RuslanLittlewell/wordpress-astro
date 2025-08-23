import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC } from "react";

interface Props {
  terms: {
    title: string;
    description: string;
  }[];
}
export const AccordionTerms: FC<Props> = ({ terms }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {terms.map((term, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
          <AccordionTrigger>
            <span className="text-sm font-semibold sm:text-md md:text-xl lg:text-2xl" dangerouslySetInnerHTML={{ __html: term.title }} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <span dangerouslySetInnerHTML={{ __html: term.description }} className="text-xs sm:text-sm md:text-md lg:text-lg space-y-5"/>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
