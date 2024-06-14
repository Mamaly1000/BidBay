"use client";
import UserAvatar from "@/components/ui/UserAvatar";
import { env } from "@/env";
import { useSidebar } from "@/hooks/use-sidebar-store";
import { formatToDollar } from "@/lib/utils";
import {
  KnockFeedProvider,
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

const NotifNav = ({
  user,
}: {
  user?: { name?: string | null; image?: string | null };
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const { onChange: onSidebarDisplay } = useSidebar();

  return (
    <KnockFeedProvider colorMode="dark" feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={(e) => setIsVisible(!isVisible)}
        badgeCountType="all"
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        renderItem={({ item, ...props }) => {
          const formattedItem: any = item;
          return (
            <NotificationCell
              avatar={
                <UserAvatar
                  fallback={formattedItem.data.actionUser || "Someone"}
                  src={formattedItem.data.actionUserImage}
                />
              }
              {...props}
              item={item}
            >
              <div className="rounded-xl">
                <Link
                  className="text-orange-300 hover:text=blue-500 flex flex-col items-center justify-start gap-1"
                  onClick={() => {
                    setIsVisible(false);
                  }}
                  href={`/items/${formattedItem.data.itemId}`}
                >
                  <div className="flex w-full items-center justify-start gap-2">
                    {formattedItem.data.actionUser || "Someone"} outbidded you
                    on
                  </div>
                  <div className="flex items-center justify-start w-full gap-2">
                    <span className="font-bold text-orange-500">
                      {formattedItem.data.itemName}
                    </span>{" "}
                    item by ${formatToDollar(formattedItem.data.bidAmount)}
                  </div>
                </Link>
              </div>
            </NotificationCell>
          );
        }}
      />
      <UserAvatar
        onClick={() => onSidebarDisplay(true)}
        tooltip
        src={user?.image}
        fallback={user?.name}
        className="lg:hidden"
      />
      <UserAvatar 
        tooltip
        src={user?.image}
        fallback={user?.name}
        className=" hidden lg:block"
      />
    </KnockFeedProvider>
  );
};

export default NotifNav;
