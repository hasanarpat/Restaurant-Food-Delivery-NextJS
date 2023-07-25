import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import CartIcon from './CartIcon'

const Navbar = () => {
  const user = false;

  return (
    <div className=''>
      {/* Container element */}
      <div className='bg-green-500 uppercase h-12 md:h-24 flex items-center justify-between p-4 lg:px-20 xl:px-40'>
        {/* Left items*/}
        <div className='hidden md:flex gap-4 flex-1 text-white '>
          <Link href="/">HomePage</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/">Contact</Link>
        </div>
        {/* Banner*/}
        <div className='flex-1 text-white md:text-center cursor-pointer'>
          <Link href="/"><h1 className='md:font-bold lg:text-2xl'>Kopernik Pizza</h1></Link>
        </div>
        
        <div className='md:hidden text-white'>
          <Menu/>
        </div>
        {/* Right items*/}
        <div className='flex-1 hidden md:flex items-center justify-end md:text-center'>
          <div className='flex gap-4 text-white'>
            <div className='hidden top-3 r-2 lg:static lg:flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md'>
            <Image alt='' src="/phone.png" width={20} height={20}/>
            <span>555 55 55</span>
            </div>
            {
              !user ? (
                <Link href="/">Login</Link>
              ) :
              (
                <Link href="/">Orders</Link>
              )
            }
            <Link href="/cart"><CartIcon/></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar