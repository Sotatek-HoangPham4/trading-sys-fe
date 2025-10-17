import { Button } from "@/core/presentation/components/ui/button";
import MainHeader from "../header/MainHeader";
import { CarouselCard } from "../../card/CarouselCard";
import Image from "next/image";
import { Book, ChevronRight, Home, Search, Video } from "lucide-react";
import { Input } from "../../ui/input";
import CourseCard from "../../card/CourseCard";

const LandingPageLayout = () => {
  return (
    <div className="bg-black relative min-h-screen">
      <MainHeader />
      <div className="max-w-7xl mx-auto flex gap-8 px-8">
        <div className="min-w-48 sticky self-start top-24 h-fit">
          <Button className="w-full justify-start" variant={"ghost"}>
            <Home strokeWidth={2.5} />
            <p className="text-sm font-semibold">Academy</p>
          </Button>
          <Button className="w-full justify-start" variant={"ghost"}>
            <Search strokeWidth={2.5} />
            <p className="text-sm font-semibold">Search</p>
          </Button>

          <p className="pt-5 pb-1 pl-3 text-sm font-semibold opacity-50">
            Learn
          </p>
          <Button className="w-full justify-start" variant={"ghost"}>
            <Book strokeWidth={2.5} />
            <p className="text-sm font-semibold">Courses</p>
          </Button>
          <Button className="w-full justify-start" variant={"ghost"}>
            <Video strokeWidth={2.5} />
            <p className="text-sm font-semibold">Video</p>
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center py-32">
          <div className="text-7xl font-semibold tracking-tighter mx-auto">
            <p className="text-center">
              The best place <br /> to learn Trading
            </p>
          </div>

          <div className="pt-20 w-full flex items-center justify-between">
            <p className="font-semibold text-3xl">Featured courses</p>
            <Button className="rounded-full" variant={"ghost"}>
              All courses <ChevronRight />{" "}
            </Button>
          </div>
          <div className="w-full grid grid-cols-2 gap-6 gap-y-12 mt-8">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
          <div className="pt-20 w-full flex items-center justify-between">
            <p className="font-semibold text-3xl">Latest lessons</p>
            <Button className="rounded-full" variant={"ghost"}>
              All articles <ChevronRight />
            </Button>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 gap-y-12 mt-8">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageLayout;
