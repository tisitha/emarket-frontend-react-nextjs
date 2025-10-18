"use client";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

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
            <Image
              src={c.imgUrl}
              width={1920}
              height={660}
              alt={c.name}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sweeper;
