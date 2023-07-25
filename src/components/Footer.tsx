import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 bg-green-500 text-white flex justify-between items-center p-4 lg:px-20 xl:px-40'>
      <h1 className='uppercase text-sm text-center md:text-base lg:text-xl xl:text-2xl font-bold'>Kopernik Pizza</h1>
      <span className='text-sm uppercase'>©2023 Kopernik Pizza. All rights reserved.</span>
    </div>
  )
}

export default Footer