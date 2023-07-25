import Image from "next/image";
import React from "react";

const Notifications = () => {
  return (
    <div className="h-12 gap-4 bg-green-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer">
      Free Delivery for all orders over +50. Order your food now.
      <div className="hidden md:flex lg:hidden items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
        <Image alt="" src="/phone.png" width={20} height={20} />
        <span>555 55 55</span>
      </div>
    </div>
  );
};

export default Notifications;
