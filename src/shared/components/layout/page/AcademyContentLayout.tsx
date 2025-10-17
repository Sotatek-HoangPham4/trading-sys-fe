import { Button } from "@/core/presentation/components/ui/button";
import MainHeader from "../header/MainHeader";
import { CarouselCard } from "../../card/CarouselCard";
import Image from "next/image";
import { Book, ChevronRight, Home, Search, Video } from "lucide-react";
import { Input } from "../../ui/input";
import CourseCard from "../../card/CourseCard";
import { FaClock } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FaAlignLeft } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";

const AcademyContentLayout = () => {
  return (
    <div className="bg-black relative min-h-screen">
      <MainHeader />
      <div className="max-w-7xl mx-auto flex gap-8 px-8">
        <div className="min-w-48 sticky self-start top-24 h-fit">
          <Button className="w-full justify-start gap-2.5" variant={"ghost"}>
            <GoHomeFill />
            <p className="font-semibold">Academy</p>
          </Button>
          <Button className="w-full justify-start gap-2.5" variant={"ghost"}>
            <Search strokeWidth={2.5} />
            <p className="text-sm font-semibold">Search</p>
          </Button>

          <p className="pt-5 pb-1 pl-3 text-sm font-semibold opacity-50">
            Learn
          </p>
          <Button className="w-full justify-start gap-2.5" variant={"ghost"}>
            <Book strokeWidth={2.5} />
            <p className="text-sm font-semibold">Courses</p>
          </Button>
          <Button className="w-full justify-start gap-2.5" variant={"ghost"}>
            <Video strokeWidth={2.5} />
            <p className="text-sm font-semibold">Video</p>
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center py-24 gap-20">
          <div className="w-full aspect-[7/4] relative rounded-2xl overflow-hidden border">
            {/* Ảnh + hiệu ứng hover */}
            <img
              src="/images/background.jpg"
              alt="course"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Overlay tối khi hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
            <div className="absolute bottom-10 left-10 w-2/3 space-y-4">
              <p className="text-7xl font-semibold tracking-tighter mx-auto pr-4">
                Get Started with the Framer CMS
              </p>
              <p className="w-2/3 text-2xl opacity-50 pr-4">
                Explore the core CMS features in Framer to manage your site’s
                content.
              </p>
            </div>
          </div>

          <div className="w-full flex items-start gap-16">
            <div className="flex flex-col gap-8">
              <p className="w-2/3 opacity-70 pr-4">
                Framer’s CMS keeps your site's content all in one place, making
                it easy to create, organize, and update.
              </p>
              <div className="">
                <div className="text-2xl font-medium my-2">
                  1. Getting Started
                </div>
                <div className="grid grid-cols-1">
                  <div className="flex justify-between items-center gap-2 py-3.5 opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <FaFileLines size={16} />
                      <p className="text-sm font-medium">
                        What is the Framer CMS?
                      </p>
                    </div>
                    <p className="text-sm font-medium">8m</p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center gap-2 py-3.5 opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <FaFileLines size={16} />
                      <p className="text-sm font-medium">
                        What is the Framer CMS?
                      </p>
                    </div>
                    <p className="text-sm font-medium">8m</p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center gap-2 py-3.5 opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <FaFileLines size={16} />
                      <p className="text-sm font-medium">
                        What is the Framer CMS?
                      </p>
                    </div>
                    <p className="text-sm font-medium">8m</p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center gap-2 py-3.5 opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <FaFileLines size={16} />
                      <p className="text-sm font-medium">
                        What is the Framer CMS?
                      </p>
                    </div>
                    <p className="text-sm font-medium">8m</p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center gap-2 py-3.5 opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <FaFileLines size={16} />
                      <p className="text-sm font-medium">
                        What is the Framer CMS?
                      </p>
                    </div>
                    <p className="text-sm font-medium">8m</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg">
              <div className="w-80 aspect-[7/4] relative rounded-t-md overflow-hidden">
                {/* Ảnh + hiệu ứng hover */}
                <img
                  src="/images/background.jpg"
                  alt="course"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Overlay tối khi hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
              </div>
              <hr />
              <div className="p-4 bg-white/5 rounded-b-lg flex flex-col gap-2">
                <p className="font-medium">Course details</p>
                <div className="flex items-center gap-2.5">
                  <FaFileLines size={15} />
                  <p className="text-sm opacity-70">10 lessons</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaClock size={15} />
                  <p className="text-sm opacity-70">30m</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaChartSimple size={15} />
                  <p className="text-sm opacity-70">Beginner - Intermediate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyContentLayout;
