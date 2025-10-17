import React from "react";
import SlackSection from "./SlackSection";
import DiscordSection from "./DiscordSection";
import EmailSection from "./EmailSection";

const NotificationsPageLayout = () => {
  return (
    <>
      <EmailSection />
      <SlackSection />
      <DiscordSection />
    </>
  );
};

export default NotificationsPageLayout;
