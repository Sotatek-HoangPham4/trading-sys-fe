import { Button } from "@/core/presentation/components/ui/button";
import MainHeader from "../header/MainHeader";
import { CarouselCard } from "../../card/CarouselCard";
import Image from "next/image";

const LandingPageLayout = () => {
  return (
    <div className="bg-black relative">
      <section className="max-w-7xl py-28 min-h-screen mx-auto bg-cover bg-center">
        <div className="text-center space-y-4 flex flex-col items-center">
          <p className="text-8xl font-medium tracking-tight">
            Just trading it <br /> with Tesseract
          </p>
          <p className="text-2xl opacity-50">
            The website builder loved by designers.
          </p>
          <div className="flex items-center gap-2">
            <Button className="rounded-full font-semibold">
              Start for free
            </Button>
            <Button variant={"outline"} className="rounded-full font-medium">
              Learn the basics
            </Button>
          </div>
          <div className="pt-12">
            <img
              src="/images/background.jpg"
              alt=""
              className="rounded-xl border"
            />
          </div>
        </div>
      </section>
      <section className="max-w-7xl py-24 min-h-screen mx-auto bg-cover bg-center space-y-12">
        <div className="w-full flex items-end justify-between">
          <div className="w-1/2">
            <p className="text-6xl font-semibold tracking-tighter">
              Not everything powerful has to look complicated
            </p>
          </div>
          <Button className="rounded-full font-semibold">Start for free</Button>
        </div>
        <CarouselCard />
      </section>

      <section className="max-w-7xl py-24 min-h-screen mx-auto bg-cover bg-center space-y-12">
        <div className="w-full flex justify-center">
          <p className="text-6xl font-semibold tracking-tighter">
            Simple to learn, <br /> easy to master.
          </p>
        </div>
        <video
          className="w-3/4 mx-auto"
          src="https://framerusercontent.com/assets/hsXwzJVLejIoZfKLtZrTkf0qNc4.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="flex flex-col justify-center items-center gap-3 -mt-64">
          <div className="flex items-center gap-1">
            <Image src={"/icons/logo-only.svg"} alt="" width={20} height={20} />
            <span className="text-sm font-semibold ml-1">Tesseract</span>
            <span className="text-sm font-light">Academy</span>
          </div>
          <p className="text-5xl font-semibold tracking-tighter text-center">
            Master the <br /> Fundamentals
          </p>
          <div className="flex items-center gap-2">
            <Button className="rounded-full font-semibold">
              See more lessons
            </Button>
            <Button variant={"outline"} className="rounded-full font-medium">
              Start Fundamentals
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageLayout;
