"use client";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type carouseType = {
  id: number;
  imgUrl: string;
  name: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchCarousel = async () => {
  const res = await fetch(`${apiUrl}/open/carousel`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const Sweeper = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["carousel"],
    queryFn: fetchCarousel,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

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
      className="max-w-[1920px] bg-black"
    >
      <CarouselContent>
        {data.map((carouse: carouseType, key: number) => (
          <CarouselItem key={key} className="pl-0 ">
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
