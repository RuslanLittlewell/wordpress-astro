// src/components/HeroCarousel.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FC } from "react";
import { CarouselCard } from "./CarouselCard";

interface Props {
  data: any;
}
export const HeroCarousel: FC<Props> = ({ data }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-1">
        {data.map((item: any) => (
          <CarouselItem
            key={item.id}
            className="pl-1 md:basis-1/2 lg:basis-1/3"
          >
            <CarouselCard
              url={item.link}
              image={item.image}
              price={item.price}
              title={item.title}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex"/>
      <CarouselNext className="hidden lg:flex"/>
    </Carousel>
  );
};
