import React from "react";
import MainHeader from "../headers/MainHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { RiLinkM } from "react-icons/ri";
import { TbMailFilled } from "react-icons/tb";
import NewsCard from "../NewsCard";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import ArticleCard from "../ArticleCard";

const NewsContentPageLayout = () => {
  return (
    <div className="bg-black relative min-h-screen">
      <MainHeader />
      <div className="max-w-5xl mx-auto pt-44 px-3 flex flex-col justify-center items-center gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">News</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Inspiration</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <p className="w-[640px] mx-auto text-center text-6xl font-semibold tracking-tighter px-4">
          5 interactive website examples & how to build them in Framer
        </p>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full ">
            <Image src="/icons/logo-only.svg" alt="" width={20} height={20} />
          </div>
          <p className="text-base font-semibold">James Pastan</p>
          <p className="text-sm font-medium opacity-50 ml-5">8 mins read</p>
        </div>
        <div className="flex items-center gap-6">
          <FaXTwitter
            size={20}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          />
          <FaLinkedin
            size={20}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          />
          <RiLinkM
            size={20}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          />
          <TbMailFilled
            size={20}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          />
        </div>
        <div className="w-full mt-10">
          <div className="w-full aspect-[7/4] relative border rounded-xl overflow-hidden">
            {/* Ảnh + hiệu ứng hover */}
            <img
              src="/images/background.jpg"
              alt="course"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Overlay tối khi hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
          </div>
          <div className="max-w-2xl px-6 py-12 mx-auto">
            <p className="text-xl my-6">
              In this article, we’ll explore five exceptional websites from the
              Framer gallery that go beyond surface-level tricks to deliver
              memorable experiences. Whether you’re explaining complex products,
              showcasing creative services, or transforming data into compelling
              visuals, these examples demonstrate how thoughtful interactivity
              elevates your digital presence.
            </p>
            <p className="text-lg opacity-70 my-6">
              Now that no-code tools have made interactive websites accessible
              to everyone, static designs aren’t just underwhelming, they’re a
              missed opportunity.
            </p>
            <p className="text-lg opacity-70 my-6">
              But the best interactive websites don’t just add a few fade-in
              animations and call it a day. From interactive product previews to
              scroll-triggered storytelling, today’s standout sites align
              interactivity with their brand and solve real business challenges.
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
              When you’re selling collaborative software, showing is better than
              telling. Multi, a real-time collaboration platform for developers,
              takes this principle to heart by creating an interactive product
              preview that turns potential customers into instant collaborators.
            </p>
            <p className="text-lg opacity-70 my-6">
              The magic happens as soon as you scroll past the hero section.
              You’re immediately drawn into a live demonstration of Multi’s
              collaborative features, complete with shared cursors and
              simultaneous screensharing.
            </p>
            <p className="text-lg opacity-70 my-6">
              Click the video icon, and you’ll see developers collaborating in
              real-time. You can drag windows around and watch your cursor
              transform, making you feel like you’re already part of the
              collaboration.
            </p>
            <p className="text-lg opacity-70 my-6">
              Tip: Learn how to create a similar experience by following along
              with the freeform canvas lesson in Framer Academy. Framer lets you
              create draggable layers (like images, videos, or text) and enhance
              them with hover effects, press animations, and custom cursors.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-10">
        <div className="pt-20 flex flex-col gap-20">
          <div className="">
            <div className="w-full flex items-center justify-between">
              <p className="text-2xl font-medium">Related articles</p>
              <Button className="rounded-full -ml-3" variant={"ghost"}>
                View all <ChevronRight />{" "}
              </Button>
            </div>
            <hr className="border-t mt-4 mb-8" />
            <div className="grid grid-cols-4 gap-6">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsContentPageLayout;
