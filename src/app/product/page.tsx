import AddReviewOrQuestion from "@/components/AddReviewOrQuestion";
import AddToCartPanel from "@/components/AddToCartPanel";
import CustomPagination from "@/components/CustomPagination";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SortByButton from "@/components/SortByButton";
import StarRatingRead from "@/components/StarRatingRead";
import { apiFetch } from "@/lib/apiClient.server";
import { MessageCircleCode, MessageCircleQuestionMark } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Product - EMarket",
  description: "Product page.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Product = async ({ searchParams }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const {
    id,
    qpagenumber = 0,
    qsortby = "date",
    qdir = "asc",
    rpagenumber = 0,
    rsortby = "date",
    rdir = "asc",
  } = await searchParams;

  const product = await apiFetch<productType>(`/open/product/${id}`);

  if (product == null) {
    notFound();
  }

  const reviewPass = token
    ? await apiFetch<boolean>(`/reveiwpass/check/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    : null;

  const questionsGetRequest = {
    pageNumber: qpagenumber,

    pageSize: 3,

    sortBy: qsortby,

    dir: qdir,

    productId: product.id,
  };

  const reviewsGetRequest = {
    pageNumber: rpagenumber,

    pageSize: 8,

    sortBy: rsortby,

    dir: rdir,

    productId: product.id,
  };

  const reviews = await apiFetch<reviewResponseType>(`/open/review`, {
    method: "POST",
    body: reviewsGetRequest,
    mode: "revalidate",
  });

  const questions = await apiFetch<questionResponseType>(`/open/question`, {
    method: "POST",
    body: questionsGetRequest,
    mode: "revalidate",
  });

  const reviewSortOptions: sortOptionType[] = [
    {
      name: "Rate: low to high",
      href: `/product?id=${id}&qpagenumber=${qpagenumber}&qsortby=${qsortby}&qdir=${qdir}&rpagenumber=${rpagenumber}&rsortby=rate&rdir=asc`,
    },
    {
      name: "Rate: high to low",
      href: `/product?id=${id}&qpagenumber=${qpagenumber}&qsortby=${qsortby}&qdir=${qdir}&rpagenumber=${rpagenumber}&rsortby=rate&rdir=desc`,
    },
    {
      name: "Date: old to new",
      href: `/product?id=${id}&qpagenumber=${qpagenumber}&qsortby=${qsortby}&qdir=${qdir}&rpagenumber=${rpagenumber}&rsortby=date&rdir=asc`,
    },
    {
      name: "Date: new to old",
      href: `/product?id=${id}&qpagenumber=${qpagenumber}&qsortby=${qsortby}&qdir=${qdir}&rpagenumber=${rpagenumber}&rsortby=date&rdir=desc`,
    },
  ];

  const questionSortOptions: sortOptionType[] = [
    {
      name: "Date: old to new",
      href: `/product?id=${id}&qpagenumber=${qpagenumber}&qsortby=date&qdir=asc&rpagenumber=${rpagenumber}&rsortby=${rsortby}&rdir=${rdir}`,
    },
    {
      name: "Date: new to old",
      href: `/product?id=${id}&qpagenumber=${qpagenumber}&qsortby=date&qdir=desc&rpagenumber=${rpagenumber}&rsortby=${rsortby}&rdir=${rdir}`,
    },
  ];

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1360px] w-full px-3">
          <div className="flex flex-col md:flex-row max-w-[1200px] w-full pt-20">
            <div className="max-w-[340px] max-h-[340px] w-full rounded-4xl bg-white mx-auto my-3">
              <Image
                width={340}
                height={340}
                src={product.imgUrl}
                alt={product.name}
                className=" rounded-4xl"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
            <div className="mx-auto max-w-[520px] w-full items-center md:items-start flex flex-col gap-6 p-10">
              <div className="font-bold text-3xl">{product.name}</div>
              <div className="text-gray-800">Brand: {product.brand}</div>
              <div>
                <StarRatingRead rate={product.avgRatings} />
                <div className="font-light">
                  ({reviews?.totalElement} Ratings)
                </div>
              </div>
              <div>
                {product.deal != null ? (
                  <>
                    <div className="font-bold line-clamp-1 text-2xl">
                      Rs.{product.deal}
                    </div>
                    <div className="line-through line-clamp-1 text-sm">
                      Rs.{product.price}
                    </div>
                  </>
                ) : (
                  <div className="font-bold line-clamp-1 text-2xl">
                    Rs.{product.price}
                  </div>
                )}
              </div>
              {product.quantity > 0 ? (
                <AddToCartPanel
                  productId={product.id}
                  stockQuantity={product.quantity}
                  token={token}
                />
              ) : (
                <div className="p-2 bg-red-500 text-white w-40">
                  No Stock Avalable
                </div>
              )}
            </div>
            <div className="max-w-[340px] mx-auto flex flex-col w-full md:border-l-2 p-10 gap-3 font-light">
              <div className="flex">
                <div>Free Delivery:</div>
                {product.freeDelivery ? (
                  <div className="text-green-600">&nbsp;Available</div>
                ) : (
                  <div className="text-red-600">&nbsp;Not Available</div>
                )}
              </div>
              <div className="flex">
                <div>Cash on Delivery:</div>
                {product.cod ? (
                  <div className="text-green-600">&nbsp;Available</div>
                ) : (
                  <div className="text-red-600">&nbsp;Not Available</div>
                )}
              </div>
              <div className="outline" />
              <div className="flex">
                <div>Warranty:</div>
                {product.warranty.name == "No Warranty" ? (
                  <div className="text-red-600">
                    &nbsp;{product.warranty.name}
                  </div>
                ) : (
                  <div className="text-green-600">
                    &nbsp;{product.warranty.name}
                  </div>
                )}
              </div>
              <div className="outline" />
              <div>
                Sold by:{" "}
                <Link
                  href={`/products?vendor=${product.vendorProfile.id}`}
                  aria-label="Vendor"
                  className="hover:text-blue-900"
                >
                  {product.vendorProfile.businessName}
                </Link>
              </div>
              <div>From: {product.province.name}</div>
            </div>
          </div>
          <div className="flex max-w-[1200px] w-full mx-auto my-2">
            {product.description}
          </div>
          <div className="flex max-w-[1200px] w-full flex-col border-t-2 mt-10 mx-auto">
            {reviewPass && token && (
              <div className="bg-blue-300 mb-15 w-210 p-5 rounded-2xl">
                <div className="font-medium pb-3">Write a Review</div>
                <AddReviewOrQuestion
                  review={true}
                  token={token}
                  productId={product.id}
                />
              </div>
            )}
            <div className="flex flex-col md:flex-row md:justify-between py-8">
              <div className="font-medium">Questions about this product</div>
              <div className="flex items-center gap-3">
                <div className="font-semibold">Sort by:</div>
                <SortByButton
                  id="questionsSort"
                  options={questionSortOptions}
                />
              </div>
            </div>
            {questions?.questionResponseDtoList.length == 0 ? (
              <div className="flex text-gray-600">
                <MessageCircleQuestionMark color="gray" />
                &nbsp;There are no questions yet.
              </div>
            ) : (
              questions?.questionResponseDtoList.map((q, i) => (
                <div className="bg-white w-full border-b-1 p-5" key={i}>
                  <div className="flex items-center gap-2 pb-2">
                    <MessageCircleQuestionMark />
                    <div>
                      <div>{q.question}</div>
                      <div className="text-gray-600 gap-4 text-sm items-center">
                        {q.user.fname}
                      </div>
                      <div className="text-gray-600 gap-4 text-sm items-center">
                        {new Date(q.date).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-700">
                      {product.vendorProfile.businessName}:&nbsp;
                    </span>
                    {q.answer}
                  </div>
                </div>
              ))
            )}
            <CustomPagination
              pageNumber={Number(qpagenumber)}
              isLast={Boolean(questions?.isLast)}
              pageCount={Number(questions?.pageCount)}
              prefix={`/product?id=${id}&qpagenumber=`}
              postfix={`&qsortby=${qsortby}&qdir=${qdir}&rpagenumber=${rpagenumber}&rsortby=${rsortby}&rdir=${rdir}`}
            />
            {token ? (
              <AddReviewOrQuestion
                review={false}
                token={token}
                productId={product.id}
              />
            ) : (
              <div className="text-sm">
                <Link href="/account/login" className="text-blue-600">
                  Login
                </Link>{" "}
                or{" "}
                <Link href="/account/register" className="text-blue-600">
                  Register
                </Link>{" "}
                to ask questions
              </div>
            )}
          </div>
          <div className="flex max-w-[1200px] w-full flex-col border-t-2 mt-10 mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between py-8">
              <div className="font-medium">Reviews</div>
              <div className="flex items-center gap-3">
                <div className="font-semibold">Sort by:</div>
                <SortByButton id="reviewsSort" options={reviewSortOptions} />
              </div>
            </div>
            {reviews?.reviewResponseDtoList.length == 0 ? (
              <div className="flex text-gray-600">
                <MessageCircleCode color="gray" />
                &nbsp;There are no reviews yet.
              </div>
            ) : (
              reviews?.reviewResponseDtoList.map((r, i) => (
                <div
                  className="bg-white flex flex-col w-full border-b-1 p-5 gap-1"
                  key={i}
                >
                  <StarRatingRead rate={r.rate} />
                  <div className="text-gray-700">
                    {r.user.fname}&nbsp;{r.user.lname}
                  </div>
                  <div className="font-medium">{r.body}</div>
                  {r.edited && <div className="text-sm">(edited)</div>}
                  <div className="text-sm">
                    {new Date(r.date).toLocaleString()}
                  </div>
                </div>
              ))
            )}
            <CustomPagination
              pageNumber={Number(rpagenumber)}
              isLast={Boolean(reviews?.isLast)}
              pageCount={Number(reviews?.pageCount)}
              prefix={`/product?id=${id}&qpagenumber=${qpagenumber}&qsortby=${qsortby}&qdir=${qdir}&rpagenumber=`}
              postfix={`&rsortby=${rsortby}&rdir=${rdir}`}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
