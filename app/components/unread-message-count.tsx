"use client";

import { useGlobalContext } from "@/context/global-context";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

export default function UnreadMessageCount({ session }: { session: Session }) {
  const { unreadCount, setUnreadCount } = useGlobalContext();
  useEffect(() => {
    if (!session) return;

    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadCount();
  }, [session]);
  return (
    unreadCount > 0 && (
      <div>
        <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white">
          {unreadCount}
        </span>
      </div>
    )
  );
}
