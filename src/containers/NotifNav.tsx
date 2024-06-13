"use client";
import UserAvatar from "@/components/ui/UserAvatar";
import { env } from "@/env";
import {
  KnockFeedProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import React, { useRef, useState } from "react";

const NotifNav = ({
  user,
}: {
  user?: { name?: string | null; image?: string | null };
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  return (
    <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={(e) => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
      <UserAvatar src={user?.image} fallback={user?.name} />
    </KnockFeedProvider>
  );
};

export default NotifNav;
