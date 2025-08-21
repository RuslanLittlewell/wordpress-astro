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
            <span className="text-xl" dangerouslySetInnerHTML={{ __html: term.title }} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <span dangerouslySetInnerHTML={{ __html: term.description }} className="space-y-5"/>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
