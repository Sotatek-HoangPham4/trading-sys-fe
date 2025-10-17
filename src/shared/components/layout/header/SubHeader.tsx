import { Button } from "@/core/presentation/components/ui/button";
import { LogIn } from "lucide-react";
import Image from "next/image";
import React from "react";
import { NavMenu } from "./NavMenu";

const SubMenu = () => {
  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-xs border-border border-b bg-background/80">
      {/* Header trên */}
      <div className="max-w-7xl mx-auto h-16 flex px-12 justify-between items-center">
        {/* Logo */}
        <div className="w-48 flex items-center gap-3">
          <Image
            src="/icons/logo-only.svg"
            alt="logo-only"
            width={24}
            height={24}
            priority
          />
          <span className="text-lg uppercase tracking-[0.25em] font-extralight">
            Tesseract
          </span>
        </div>

        <NavMenu />

        {/* Right section */}
        <div className="w-48 flex items-center justify-end gap-2">
          <Button variant="ghost">
            <p className="text-sm">Login</p>
            <LogIn size={16} />
          </Button>
        </div>
      </div>

      {/* Submenu */}
      <div className="border-t mx-auto h-12 flex px-12 justify-center items-center text-sm font-medium">
        {[
          "All",
          "Inspiration",
          "Tutorials",
          "Engineering",
          "Resources",
          "News",
        ].map((item) => (
          <Button
            variant={"ghost"}
            key={item}
            className="hover:text-primary transition-colors duration-200 h-8 rounded-full opacity-70 hover:opacity-100 text-[15px] font-normal"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
