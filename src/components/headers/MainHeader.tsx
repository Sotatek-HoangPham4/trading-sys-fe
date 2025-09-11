import Image from "next/image";
import { LogIn } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { NavMenu } from "./NavMenu";

const MainHeader = () => {
  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-lg border-border">
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

        {/* Navigation */}
        <NavMenu />

        {/* Right section */}
        <div className="w-48 flex items-center justify-end gap-2">
          <Button variant="ghost">
            <p className="text-sm">Login</p>
            <LogIn size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
