"use client";
import { env } from "@/env";
import {
  KnockFeedProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import React, { useRef, useState } from "react";

const NotifNav = () => {
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
    </KnockFeedProvider>
  );
};

export default NotifNav;
