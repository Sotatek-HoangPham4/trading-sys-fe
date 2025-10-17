import { Button } from "@/core/presentation/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

const NewsCard = ({
  isHero,
  fontSize,
}: {
  isHero?: boolean;
  fontSize?: number;
}) => {
  return (
    <div
      className={
        isHero
          ? `w-full flex group cursor-pointer`
          : `w-full flex flex-col-reverse group cursor-pointer gap-8`
      }
    >
      <div
        className={
          isHero
            ? "w-1/3 pr-16 h-auto flex flex-col justify-between"
            : "w-full h-auto flex flex-col justify-between"
        }
      >
        <div>
          <div className="w-full flex items-center justify-between opacity-50">
            <p className="font-semibold">News</p>
          </div>

          <p
            className={
              isHero
                ? "pr-8 font-semibold text-3xl mt-2"
                : `w-3/4 font-medium text-xl mt-2 text-[${fontSize}px]`
            }
          >
            In this Framer course, you’ll learn how to design and publish fully
            responsive websites without code. From mastering layout and...
          </p>
        </div>
        <div className="w-full flex items-center justify-between mt-2 text-sm opacity-50">
          <Button className="rounded-full -ml-3" variant={"ghost"}>
            Read more <ChevronRight />{" "}
          </Button>
          <p className="font-semibold">4h 6m</p>
        </div>
      </div>
      {/* Container ảnh */}
      <div
        className={
          isHero
            ? "w-2/3 aspect-[5/3] relative border rounded-lg overflow-hidden"
            : "w-full aspect-[5/3] relative border rounded-lg overflow-hidden"
        }
      >
        {/* Ảnh + hiệu ứng hover */}
        <img
          src="/images/background.jpg"
          alt="course"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Overlay tối khi hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>

      {/* Nội dung */}
    </div>
  );
};

export default NewsCard;
