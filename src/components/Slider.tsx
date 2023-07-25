"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const slides = [
  {
    id:1,
    slide:"/slide1.png",
    title:"The best pizzas in all the galaxies..."
  },{
    id:2,
    slide:"/slide2.png",
    title:"Try our new Mexican Burger: Red Hot Chilli Peppers 🌶️🔥"
  },{
    id:3,
    slide:"/slide3.jpg",
    title:"Hot and Cheesy food with freezing cokes, those are like came from polars"
  },
]

const Slider = () => {

  const [slide,setSlide] = useState(0)

  useEffect(()=>{
    const interval = setInterval(()=>setSlide((slide)=>(slide === slides.length - 1 ? 0 : slide + 1)),2000)

    return ()=>(clearInterval(interval))
  },[])

  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50'>    
        <div className='flex-1 flex flex-col items-center justify-center gap-4 text-green-500 font-bold '>
          <p className='text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl'>{slides[slide].title}</p>
          <button className='cursor-pointer uppercase rounded-md bg-green-500 text-white p-2'>Check out 🍕</button>
        </div>
        <div className='relative flex-1 h-1/2 lg:w-1/2 lg:h-full'>
          <Image src={slides[slide].slide} alt='slide' fill className='object-cover'/>
        </div>
    </div>
  )
}

export default Slider