"use client";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type carouselType = {
  id: number;
  imgUrl: string;
  name: string;
};

type Props = {
  carousels: carouselType[];
};

const Sweeper = ({ carousels }: Props) => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {carousels?.map((c, i) => (
          <CarouselItem key={i} className="bg-black px-0">
            <img alt={c.name} src={c.imgUrl} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sweeper;
