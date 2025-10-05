"use client";

import { Bell, MailOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { ScrollArea } from "./ui/scroll-area";

const fetcher = async (url: string | URL | Request, token?: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return await res.json();
  }
};

type notificationDataType = {
  notificationResponseDtoList?: notificationType[];
  newNotificationCount: number;
  isLast?: boolean;
};

type notificationType = {
  id?: number;
  message?: string;
  seen?: boolean;
  dateAndTime?: string;
  attachedId?: string;
  notificationType?: string;
};

const Notification = ({ userToken }: { userToken?: string }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [size, setSize] = useState(10);

  const { data, error, isLoading, mutate } = useSWR(
    userToken ? [`${apiUrl}/notification/${size}`, userToken] : null,
    ([url, userToken]) => fetcher(url, userToken)
  );

  const notificationData: notificationDataType = data;

  const loadMore = () => {
    setSize((s) => s + 10);
  };

  const markAsSeen = async (currentSeen?: boolean, notificationId?: number) => {
    if (!currentSeen) {
      const res = await fetch(`${apiUrl}/notification/mark/${notificationId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.ok) {
        mutate();
      }
    }
  };

  const markAllAsSeen = async () => {
    if (notificationData?.newNotificationCount > 0) {
      const res = await fetch(`${apiUrl}/notification/mark/all`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.ok) {
        mutate();
      }
    }
  };

  return (
    <div>
      <div className="dropdown dropdown-end font-semibold">
        <div tabIndex={0} className="hover:cursor-pointer">
          {notificationData?.newNotificationCount > 0 && (
            <div className="absolute left-3 bottom-3 rounded-4xl w-5 h-5 text-white flex justify-center items-center bg-red-600">
              {notificationData?.newNotificationCount}
            </div>
          )}
          <Bell color="white" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-150 grow-1 shadow-sm outline"
        >
          <div className="h-[428px]">
            <div className="flex justify-between my-1 font-bold ">
              Notifications
              <div
                className="font-normal hover:cursor-pointer"
                onClick={markAllAsSeen}
              >
                Mark all as read
              </div>
            </div>
            <ScrollArea className="h-[375px] w-145">
              {notificationData?.notificationResponseDtoList ? (
                notificationData?.notificationResponseDtoList?.map((n, i) => (
                  <Link
                    href="/account/login"
                    onMouseEnter={() => markAsSeen(n.seen, n.id)}
                    className={`p-2 rounded-xs hover:bg-gray-300 mb-1 flex justify-between ${
                      n.seen ? "bg-white" : "bg-gray-200"
                    } `}
                    key={i}
                  >
                    <div>
                      <div>{n.message}</div>
                      <div>{n.dateAndTime}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col h-[375px] justify-center items-center">
                  <MailOpen size={70} />
                  <div>No notifications</div>
                  <div className="font-normal">
                    Looks like you haven't received any notifications yet.
                  </div>
                </div>
              )}
            </ScrollArea>
            {!notificationData?.isLast && (
              <div
                onClick={loadMore}
                className="text-center p-1 text-gray-800 hover:cursor-pointer rounded-x font-normal hover:font-bold"
              >
                Load More...
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Notification;
