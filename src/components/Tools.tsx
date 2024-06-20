import React from "react";
import bmiPhoto from "../../public/bmi-adult-fb-600x315.jpg.jpg";
import foodPhoto from "../../public/food.jpeg";
import Image from "next/image";

const Tools = () => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <div className=" text-4xl font-bold pt-16">The tools for your Goals</div>
      <div className="flex gap-5 w-4/6">
        <div className="w-full pt-14 pb-0 px-24">
          <div>
            <Image src={bmiPhoto} alt="bmiPhoto" height={500} width={300} />
          </div>
          <div className=" text-xl font-bold p-4 pt-8">
            BMI and BMR Calculator
          </div>
          <div className="p-4">
            BMI, or Body Mass Index, is a simple calculation used to assess
            whether a person has a healthy body weight for a given height.{" "}
            <br /> It is used to categorize individuals into different weight
            status categories, such as underweight, normal weight, overweight,
            and obesity, which can help identify potential health risks related
            to body weight.
          </div>
        </div>
        <div className="w-full pt-14 pb-0 px-24">
          <div>
            <Image
              src={foodPhoto}
              alt="bmiPhoto"
              height={200}
              width={300}
              className=" "
            />
          </div>
          <div className="">
            <div className=" text-xl font-bold p-4 pt-8">Plan your Diet</div>
            <div className="pr-4">
              Creates personalised meal plans based on your food preferances,
              budget and schedule.
              <br /> Reach your diet and nutritional goals with our BMI and
              calorie calculator, food item list and many more.
            </div>
          </div>
        </div>
      </div>

      {/* <div className="p-3 bg-black text-white rounded-md">Create Diet</div> */}
    </div>
  );
};

export default Tools;
