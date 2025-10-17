"use client";

import MainHeader from "@/shared/components/layout/header/MainHeader";
import AccountSideBar from "@/shared/components/layout/page/settings/account/AccountSideBar";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <MainHeader />
      <div className="max-w-7xl mx-auto flex px-8 py-32">
        <AccountSideBar />
        <div className="w-full px-16 space-y-12">{children}</div>
      </div>
    </div>
  );
}
