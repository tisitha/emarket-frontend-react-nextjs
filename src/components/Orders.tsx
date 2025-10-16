import { apiFetch } from "@/lib/apiClient.server";
import { Package } from "lucide-react";
import Link from "next/link";
import React from "react";
import CustomPagination from "./CustomPagination";
import OrderStatusChangebtn from "./OrderStatusChangebtn";

type Props = {
  token: string;
  pageNumber?: number;
  isVendor?: boolean;
  version: "USER" | "ADMIN" | "VENDOR";
  prefix: string;
  postfix: string;
};

const Orders = async ({
  token,
  pageNumber = 0,
  version,
  prefix,
  postfix,
}: Props) => {
  const req = {
    pageNumber: pageNumber,
    pageSize: 10,
    sortBy: "date",
    dir: "desc",
  };

  const url =
    version == "ADMIN"
      ? "/admin/order/deliver/"
      : version == "VENDOR"
      ? "/order/vendor"
      : "/order/user";

  const res = await apiFetch<orderResponseType>(`${url}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: req,
  });

  return (
    <div>
      {res?.orderResponseDtoList.length == 0 ? (
        <div className="flex text-gray-600 p-10">
          <Package color="gray" />
          &nbsp;Empty.
        </div>
      ) : (
        res?.orderResponseDtoList.map((o, i) => (
          <div key={i} className="p-10 w-full max-w-[600px] mx-auto border-b-2">
            <div className="flex justify-between font-semibold">
              <Link href={`/products?vendor=${o.vendorId}`}>
                {o.vendorName}
              </Link>
              <div className="flex items-end flex-col gap-2">
                <div className="text-blue-700 font-light">{o.orderStatus}</div>
                {version == "ADMIN"
                  ? o.orderStatus == "SHIPPED" && (
                      <>
                        <OrderStatusChangebtn
                          orderId={o.id}
                          token={token}
                          version={"DELIVER"}
                        />
                      </>
                    )
                  : (o.orderStatus == "PENDING" ||
                      o.orderStatus == "PROCESSING") && (
                      <>
                        <OrderStatusChangebtn
                          orderId={o.id}
                          token={token}
                          version={version == "VENDOR" ? "UPDATE" : "CANCEL"}
                        />
                      </>
                    )}
              </div>
            </div>
            <div className="p-5">
              <div>{o.productName}</div>
              <div className="text-sm p-1 font-light">
                {new Date(o.date).toLocaleString()}
              </div>
              <div className="flex justify-between font-semibold">
                <div>Rs.&nbsp;{o.cost}</div>
                <div>Quantity:&nbsp;{o.quantity}</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex">
                <div>Delivery cost:</div>
                <div className="font-semibold">
                  &nbsp;&nbsp;&nbsp;Rs.&nbsp;{o.deliveryCost}
                </div>
              </div>
              <div className="flex">
                <div>Total cost:</div>
                <div className="font-semibold">
                  &nbsp;&nbsp;&nbsp;Rs.&nbsp;{o.totalCost}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <CustomPagination
        pageNumber={pageNumber}
        isLast={Boolean(res?.isLast)}
        pageCount={Number(res?.pageCount)}
        prefix={prefix}
        postfix={postfix}
      />
    </div>
  );
};

export default Orders;
