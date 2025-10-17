"use client";

import React from "react";
import PreferencesSection from "./PreferencesSection";
import LanguageAndTimeSection from "./LanguageAndTimeSection";

const PreferencesPageLayout = () => {
  return (
    <>
      <PreferencesSection /> <LanguageAndTimeSection />
    </>
  );
};

export default PreferencesPageLayout;
