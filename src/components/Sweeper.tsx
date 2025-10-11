"use client";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type carouselType = {
  id: number;
  imgUrl: string;
  name: string;
};

const initialCarousel: carouselType[] = [
  {
    id: 1,
    imgUrl: "/carousel_placeholder.jpg",
    name: "placeholer_carousel",
  },
];

type Props = {
  carousels?: carouselType[];
};

const Sweeper = ({ carousels = initialCarousel }: Props) => {
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
        {carousels.map((carousel: carouselType, key: number) => (
          <CarouselItem
            key={key}
            className="max-w-[1920px] relative w-full px-0 "
          >
            <Image src={carousel.imgUrl} fill unoptimized alt={carousel.name} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sweeper;
