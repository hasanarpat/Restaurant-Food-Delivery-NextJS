import React from 'react'
import CountDown from './CountDown'
import Image from 'next/image'

const Offer = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white md:bg-[url('/offerBg.png')] md:h-[70vh]">
      <div className=" flex-1 w-full flex flex-col items-center justify-center gap-8 p-8 text-center">
        <h1 className="text-6xl font-bold xl:text-7xl">Delicious Burger & French Fries</h1>
        <p className="text-lg xl:text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <CountDown/>
        <button className="bg-yellow-400 py-3 px-6 rounded-md cursor-pointer ">Order Now</button>
      </div>
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  )
}

export default Offer