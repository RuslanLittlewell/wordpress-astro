import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  description: string;
  features: string;
  className?: string;
  video?: string;
}
export const ItemTabs: FC<Props> = ({
  description,
  features,
  className,
  video,
}) => {
  return (
    <Tabs defaultValue="1" className={cn(className)}>
      <TabsList className="flex flex-col lg:flex-row">
        <TabsTrigger
          className="py-4 px-6 font-bold text-lg rounded-xl"
          value="1"
        >
          Описание
        </TabsTrigger>
        <TabsTrigger
          className="py-4 px-6 font-bold text-lg rounded-xl"
          value="2"
        >
          Харакретистики
        </TabsTrigger>
        <TabsTrigger
          className="py-4 px-6 font-bold text-lg rounded-xl"
          value="3"
        >
          Видео обзор
        </TabsTrigger>
      </TabsList>

      {/* forceMount = SEO-друзья */}
      <TabsContent value="1" className="text-xs sm:text-sm md:text-md lg:text-lg">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </TabsContent>

      <TabsContent value="2" className="text-xs sm:text-sm md:text-md lg:text-lg">
        <div dangerouslySetInnerHTML={{ __html: features }} />
      </TabsContent>

      <TabsContent value="3" className="w-full">
        <div className="w-full" dangerouslySetInnerHTML={{ __html: video || '' }}/>
      </TabsContent>
    </Tabs>
  );
};
