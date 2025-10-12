import CheckOut from "@/components/CheckOut";
import DeleteCartItem from "@/components/DeleteCartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { apiFetch } from "@/lib/apiClient.server";
import { Package, ShoppingCart } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const paymentMethods = await apiFetch<paymentMethodType[]>(
    "/open/paymentmethod"
  );

  if (token == null) {
    redirect("/account/login");
  }

  const cart = await apiFetch<cartType>(`/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1360px] w-full px-3">
          <div className="flex flex-col max-w-[1200px] w-full py-20">
            <div className="mx-auto text-3xl font-bold pb-2">Cart</div>
            <div className="my-10 flex flex-wrap">
              <div className="grow mx-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.cartItems.map((c, i) => (
                      <tr key={i}>
                        <td>
                          <div className="flex items-center gap-3 max-w-[450px]">
                            <div className="avatar">
                              <div className="h-12 w-12">
                                <Image
                                  unoptimized
                                  width={50}
                                  height={50}
                                  src={c.product.imgUrl}
                                  alt={c.product.name}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{c.product.name}</div>
                              {c.product.deal ? (
                                <>
                                  <div className="text-sm opacity-50">
                                    Rs.{c.product.deal}
                                  </div>
                                  <div className="text-sm opacity-50 line-through">
                                    Rs.{c.product.price}
                                  </div>
                                </>
                              ) : (
                                <div className="text-sm opacity-50">
                                  Rs.{c.product.price}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col justify-center">
                            {c.quantity > c.product.quantity ? (
                              <div className="text-center bg-red-500 text-white">
                                Out of stock
                              </div>
                            ) : (
                              <div className="text-center">{c.quantity}</div>
                            )}
                            <DeleteCartItem cartItemId={c.id} token={token} />
                          </div>
                        </td>
                        <td className="text-center">
                          Rs.{" "}
                          {c.product.deal
                            ? c.product.deal * c.quantity
                            : c.product.price * c.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {cart?.cartItems.length == 0 && (
                  <div className="flex text-gray-600 p-5">
                    <div className="m-auto flex">
                      <ShoppingCart color="gray" />
                      &nbsp;Your cart is empty.
                    </div>
                  </div>
                )}
              </div>
              <div className="max-w-[350px] mx-auto w-full rounded-2xl outline p-5 flex flex-col gap-4">
                <div className="flex text-gray-700 justify-between">
                  <div>Sub Total:</div>
                  <div>Rs. {cart?.subTotalCost}</div>
                </div>
                <div className="flex text-gray-700 justify-between">
                  <div>Delivery Cost:</div>
                  <div>Rs. {cart?.deliveryCost}</div>
                </div>
                <div className="flex font-semibold justify-between">
                  <div>Total:</div>
                  <div>Rs. {cart?.totalCost}</div>
                </div>
                <div className="rounded-2xl px-5 py-4 gap-2 flex flex-col bg-blue-100 font-bold text-blue-900">
                  <div className="flex">
                    <Package />
                    <div>Shipping</div>
                  </div>
                  <div>Delivered in 2-5 Business Days</div>
                </div>
                <CheckOut
                  paymentMethods={paymentMethods}
                  token={token}
                  cod={true}
                  disabled={
                    cart?.cartItems.length == 0 ||
                    Boolean(
                      cart?.cartItems.some(
                        (c) => c.quantity > c.product.quantity
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
