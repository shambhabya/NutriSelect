import Image from "next/image";
import React from "react";
import foodImg from "../../public/fruits.png";
import eatLogo from "../../public/eatwell.png";
import { Button } from "./ui/button";

const Homepage = () => {
  return (
    <div className="h-screen relative">
      <div className="flex justify-between py-8 px-16">
        <div className=" font-serif text-5xl font-medium">NutriSelect</div>
        <div className="flex gap-6 justify-center items-center">
          <div className=" text-xl bg-white py-1 px-6 rounded-xl">FAQs</div>
          <div className="text-xl bg-white py-1 px-6 rounded-xl">About Us</div>
        </div>
      </div>
      <div className="absolute left-40 top-60 flex">
        <Image src={eatLogo} alt="eatLogo" height={400} width={300} />
      </div>
      <div className="absolute right-0 bottom-0 ">
        <Image
          src={foodImg}
          alt="foodImg"
          height={500}
          width={600}
          className=" object-cover"
        />
      </div>
    </div>
  );
};

export default Homepage;
