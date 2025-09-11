import React from "react";

const CourseCard = () => {
  return (
    <div className="w-full flex flex-col gap-4 group cursor-pointer">
      {/* Container ảnh */}
      <div className="w-full aspect-[7/4] relative border rounded-lg overflow-hidden">
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
      <div>
        <p className="font-semibold">Framer Fundamentals</p>
        <p className="text-sm pr-8 font-medium opacity-50">
          In this Framer course, you’ll learn how to design and publish fully
          responsive websites without code. From mastering layout and...
        </p>
        <div className="w-full flex items-center justify-between mt-2 text-sm opacity-70">
          <p className="font-semibold">Beginner</p>
          <p className="font-semibold">4h 6m</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
