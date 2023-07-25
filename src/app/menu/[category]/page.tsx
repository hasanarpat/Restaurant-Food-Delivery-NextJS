"use client"
import { pizzas } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SingleCategory = () => {

    const pathname = usePathname()
    console.log(pathname.split('/')[2])


  return (
    <div className='flex flex-wrap text-green-500'>
        {
            pizzas.map((item)=>(
                <Link href={`/product/${item.id}`} key={item.id} className='group w-full h-[60vh] border-b-2 border-r-2 flex flex-col justify-between sm:w-1/2 lg:w-1/3 p-4 border-green-500 even:bg-fuchsia-50'>
                    {
                        item.img && <div className='relative h-[70%] hover:rotate-[60deg] transition-all duration-500'>
                            <Image alt='' src={item.img} fill className='object-contain'/>
                        </div>
                    }
                    <div className='flex items-center justify-between'>
                        <h1 className='font-bold text-2xl uppercase p-2'>{item.title}</h1>
                        <h2 className='group-hover:hidden'>${item.price}</h2>
                        <button className='hidden group-hover:block uppercase text-white bg-green-500 rounded-md p-2'>Add to Cart</button>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default SingleCategory