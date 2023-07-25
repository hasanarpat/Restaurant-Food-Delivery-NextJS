"use client";
import React, { useEffect, useState } from "react";

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price)
    );
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="w-1/3 md:w-max p-2 ring-1 ring-green-400 rounded-md"
            style={{
              background: selected === index ? "#22C55E" : "white",
              color: selected === index ? "white" : "#22C55E",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full ring-1 ring-green-500 h-full px-4">
          <span>Quantity</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
            >
              {"<"}
            </button>
            <span className="font-bold text-lg select-none">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev === 9 ? 9 : prev + 1))}
            >
              {">"}
            </button>
          </div>
        </div>
        <button className="bg-green-500 text-white ring-1 ring-green-500 w-56 p-3 uppercase">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
