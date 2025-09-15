import { Button } from "@/presentation/components/ui/button";
import MainHeader from "../headers/MainHeader";
import { CarouselCard } from "../CarouselCard";
import Image from "next/image";
import { Book, ChevronRight, Home, Search, Video } from "lucide-react";
import { Input } from "../ui/input";
import CourseCard from "../CourseCard";
import { FaClock } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FaAlignLeft } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";

const AcademyContentDetailLayout = () => {
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
              <div className="">
                <div className="w-full">
                  <div className="max-w-3xl mx-auto">
                    <p className="w-2/3 text-left text-6xl font-semibold tracking-tighter pr-4">
                      What is the Framer CMS?
                    </p>
                    <p className="text-xl my-6">
                      In this article, we’ll explore five exceptional websites
                      from the Framer gallery that go beyond surface-level
                      tricks to deliver memorable experiences. Whether you’re
                      explaining complex products, showcasing creative services,
                      or transforming data into compelling visuals, these
                      examples demonstrate how thoughtful interactivity elevates
                      your digital presence.
                    </p>
                    <p className="text-lg opacity-70 my-6">
                      Now that no-code tools have made interactive websites
                      accessible to everyone, static designs aren’t just
                      underwhelming, they’re a missed opportunity.
                    </p>
                    <p className="text-lg opacity-70 my-6">
                      But the best interactive websites don’t just add a few
                      fade-in animations and call it a day. From interactive
                      product previews to scroll-triggered storytelling, today’s
                      standout sites align interactivity with their brand and
                      solve real business challenges.
                    </p>
                    <p className="pt-8 text-[32px] font-semibold">
                      1. Interactive Product Experience — Multi
                    </p>
                    <div className="w-full aspect-[7/4] relative border rounded-lg overflow-hidden my-6">
                      {/* Ảnh + hiệu ứng hover */}
                      <img
                        src="/images/background.jpg"
                        alt="course"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {/* Overlay tối khi hover */}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                    </div>
                    <p className="text-lg opacity-70 my-6">
                      When you’re selling collaborative software, showing is
                      better than telling. Multi, a real-time collaboration
                      platform for developers, takes this principle to heart by
                      creating an interactive product preview that turns
                      potential customers into instant collaborators.
                    </p>
                    <p className="text-lg opacity-70 my-6">
                      The magic happens as soon as you scroll past the hero
                      section. You’re immediately drawn into a live
                      demonstration of Multi’s collaborative features, complete
                      with shared cursors and simultaneous screensharing.
                    </p>
                    <p className="text-lg opacity-70 my-6">
                      Click the video icon, and you’ll see developers
                      collaborating in real-time. You can drag windows around
                      and watch your cursor transform, making you feel like
                      you’re already part of the collaboration.
                    </p>
                    <p className="text-lg opacity-70 my-6">
                      Tip: Learn how to create a similar experience by following
                      along with the freeform canvas lesson in Framer Academy.
                      Framer lets you create draggable layers (like images,
                      videos, or text) and enhance them with hover effects,
                      press animations, and custom cursors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyContentDetailLayout;
