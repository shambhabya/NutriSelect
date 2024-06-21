import { useMyDietContext } from "@/context/myDietContext";
import React, { useRef } from "react";
import html2canvas from "html2canvas";

const MyDietPreview = () => {
  const { myDiet } = useMyDietContext();
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "download.jpg";
    link.click();
  };
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div
        className=" h-5/6 w-5/6 bg-red-300 rounded-md border flex flex-col "
        ref={componentRef}
      >
        <div className="bg-slate-200 flex justify-center items-center h-14 text-2xl font-semibold font-serif">
          Your Meal Plan
        </div>
        <div className="flex justify-between">
          <div className="w-full flex flex-col items-center">
            <div className="p-2 m-3 rounded bg-slate-200">Breakfast</div>
            <div className="text-lg font-medium">
              {Object.keys(myDiet.breakfastItems).map((item, index) => {
                if (myDiet.breakfastItems[item].count !== 0) {
                  return (
                    <div key={index}>
                      {item.charAt(0).toUpperCase() + item.slice(1)} x{" "}
                      {myDiet.breakfastItems[item].count}
                    </div>
                  );
                }
                return null; // If count is zero, return null to skip rendering
              })}
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="p-2 m-3 rounded bg-slate-200">Lunch</div>
            <div className="text-lg font-medium">
              {Object.keys(myDiet.lunchItems).map((item, index) => {
                if (myDiet.lunchItems[item].count !== 0) {
                  return (
                    <div key={index}>
                      {item.charAt(0).toUpperCase() + item.slice(1)} x{" "}
                      {myDiet.lunchItems[item].count}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="p-2 m-3 rounded bg-slate-200">Dinner</div>
            <div className="text-lg font-medium">
              {Object.keys(myDiet.dinnerItems).map((item, index) => {
                if (myDiet.dinnerItems[item].count !== 0) {
                  return (
                    <div key={index}>
                      {item.charAt(0).toUpperCase() + item.slice(1)} x{" "}
                      {myDiet.dinnerItems[item].count}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className=" p-2 bg-black text-white rounded-lg flex justify-center items-center mt-4"
        onClick={handleDownloadPdf}
      >
        Download Diet Plan
      </div>
    </div>
  );
};

export default MyDietPreview;
