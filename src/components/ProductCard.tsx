import Image from "next/image";
import Link from "next/link";

type Props = {
  cardDetail: productType;
};

const ProductCard = ({ cardDetail }: Props) => {
  return (
    <Link
      href={`/product?id=${cardDetail.id}`}
      className="h-[350px] w-[175px] hover:shadow-2xl rounded-2xl flex flex-col justify-between bg-white"
    >
      <div className="relative h-[175px] w-[175px]  rounded-2xl ">
        <Image
          alt={cardDetail.name}
          src={cardDetail.imgUrl}
          fill
          unoptimized
          className=" rounded-2xl "
        />
      </div>
      <div className="pl-5 pr-5">
        <div className="font-semibold line-clamp-2 ">{cardDetail.name}</div>
        <div className="italic line-clamp-2 ">{cardDetail.category.name}</div>
      </div>
      <div className="p-5">
        {cardDetail.deal != null ? (
          <>
            <div className="font-bold line-clamp-1">Rs.{cardDetail.deal}</div>
            <div className="line-through line-clamp-1">
              Rs.{cardDetail.price}
            </div>
          </>
        ) : (
          <div className="font-bold  line-clamp-1">Rs.{cardDetail.price}</div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
