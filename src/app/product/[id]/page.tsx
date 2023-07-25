import Price from '@/components/Price'
import { singleProduct } from '@/data'
import Image from 'next/image'
import React from 'react'

const SingleProductPage = () => {
  return (
    <div className='p-4 lg:px-20 xl:px-40 h-screen flex flex-col md:justify-center justify-around md:flex-row md:gap-8 md:items-center text-green-700'>
      <div className='relative h-1/2 md:h-[70%] w-full'>
        {
          singleProduct.img && <Image src={singleProduct.img} alt='' fill className='object-contain'/>
        }
      </div>
      <div className='h-1/2 md:h-[70%] flex flex-col gap-4 md:justify-center md:gap-6 lg:gap-8'>
        <h1 className='text-3xl font-bold uppercase xl:text-5xl mt-4 text-green-500'>{singleProduct.title}</h1>
        <p className='text-justify lg:text-left'>{singleProduct.desc}</p>
        <Price price={singleProduct.price} id={singleProduct.id} options={singleProduct.options}/>
      </div>
    </div>
  )
}

export default SingleProductPage