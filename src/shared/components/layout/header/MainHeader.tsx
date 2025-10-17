"use client";
import Image from "next/image";
import { Bell, Globe, Inbox, LogIn, Search } from "lucide-react";
import { Button } from "@/core/presentation/components/ui/button";
import { NavMenu } from "./NavMenu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { DropDownUserMenu } from "./DropDownUserMenu";
import { Input } from "../../ui/input";

const MainHeader = () => {
  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth.user?.avatar);
  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-sm border-border">
      <div className="w-full  h-16 flex px-12 justify-between items-center">
        <div className="flex items-center gap-4">
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
          <Input
            endIcon={
              <Button
                variant={"secondary"}
                size={"icon"}
                className="rounded-full -mr-1 h-8 w-8"
              >
                <Search size={16} />
              </Button>
            }
            placeholder="What do you want to learn"
            className="w-80 rounded-full "
          />
          {/* Navigation */}
          <NavMenu />
        </div>

        {/* Right section */}
        <div className="w-48 flex items-center justify-end gap-2">
          {auth ? (
            <DropDownUserMenu />
          ) : (
            <Link href={"/login"}>
              <Button variant="ghost">
                <p className="text-sm">Login</p>
                <LogIn size={16} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
