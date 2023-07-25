import { featuredProducts } from "@/data";
import Image from "next/image";
import React from "react";

const Featured = () => {
  return (
    <div className="w-screen overflow-x-scroll text-green-500 no-scrollbar">
      <div className="w-max flex">
        {featuredProducts.map((product) => (
          <div
            className="w-screen h-[60vh] xl:h-[90vh] md:w-[50vw] xl:w-[33vw] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300"
            key={product.id}
          >
            <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-300">
              {product.img && (
                <Image
                  alt="product"
                  src={product.img}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="flex-1 flex flex-col p-4 gap-4 items-center justify-center">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {product.title}
              </h1>
              <p className="p-4 text-center 2xl:p-8">{product.desc}</p>
              <span>${product.price}</span>
              <button className="cursor-pointer bg-green-500 rounded-md text-white py-3 px-6 hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
