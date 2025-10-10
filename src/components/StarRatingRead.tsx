import React from "react";

type Props = {
  rate: number;
};

const StarRatingRead = ({ rate }: Props) => {
  return (
    <div className="rating rating-lg rating-half">
      <div className="rating-hidden" />
      <div
        className="mask mask-star-2 mask-half-1 bg-orange-500"
        aria-label="0.5 star"
        aria-current={rate > 0 && rate <= 0.75 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-2 bg-orange-500"
        aria-label="1 star"
        aria-current={rate > 0.75 && rate <= 1.25 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-1 bg-orange-500"
        aria-label="1.5 star"
        aria-current={rate > 1.25 && rate <= 1.75 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-2 bg-orange-500"
        aria-current={rate > 1.75 && rate <= 2.25 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-1 bg-orange-500"
        aria-current={rate > 2.25 && rate <= 2.75 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-2 bg-orange-500"
        aria-current={rate > 2.75 && rate <= 3.25 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-1 bg-orange-500"
        aria-current={rate > 3.25 && rate <= 3.75 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-2 bg-orange-500"
        aria-current={rate > 3.75 && rate <= 4.25 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-1 bg-orange-500"
        aria-current={rate > 4.25 && rate <= 4.75 ? true : false}
      />
      <div
        className="mask mask-star-2 mask-half-2 bg-orange-500"
        aria-current={rate > 4.75 ? true : false}
      />
    </div>
  );
};

export default StarRatingRead;
