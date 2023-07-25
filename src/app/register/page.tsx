import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="p-4 md:h-[calc(100vh-6rem)] h-[calc(100vh-9rem)] flex items-center justify-center">
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-[50%]">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover"/>
        </div>

        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold xl:text-3xl">Welcome</h1>
          <p className="">
            Log in to your account or create a new one using social buttons
          </p>
          <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md">
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            Sign in with Google
          </button>
          <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md">
            <Image
              src="/facebook.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            Sign in with Facebook
          </button>
          <p className="text-sm flex gap-4 items-center">Do you have an account?<Link href="/login" className="text-base text-orange-500">Login Now</Link></p>
          <p className="text-sm ">Have a problem? <Link href="/" className="underline">Contact Us</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage