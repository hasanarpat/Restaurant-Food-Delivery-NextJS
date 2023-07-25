import { menu } from "@/data";
import Link from "next/link";
import React from "react";

const MenuPage = () => {
  return (
    <div className="flex flex-col items-center p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] md:flex-row">
      {menu.map((item) => (
        <Link
          href={`/menu/${item.slug}`}
          key={item.id}
          style={{ backgroundImage: `url('${item.img}')` }}
          className="w-full h-1/3 bg-cover md:h-1/2"
        >
          <div className={`text-${item.color} w-1/2 p-4`}>
            <h1 className="uppercase font-bold text-3xl">{item.title}</h1>
            <p className="text-sm my-8 ">{item.desc}</p>
            <button className={`hidden 2xl:block bg-${item.color} text-${item.color === "black" ? "white" : "green-100"} py-3 px-6 rounded-md`}>See Now</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
