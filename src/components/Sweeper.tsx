"use client";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type carouseType = {
  id: number;
  imgUrl: string;
  name: string;
};

type Props = {
  carouses: carouseType[];
};

const Sweeper = ({ carouses }: Props) => {
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
        {carouses.map((carouse: carouseType, key: number) => (
          <CarouselItem key={key} className="max-w-[1920px] px-0 ">
            <Image
              src={carouse.imgUrl}
              height={660}
              width={1920}
              unoptimized
              alt={carouse.name}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sweeper;
