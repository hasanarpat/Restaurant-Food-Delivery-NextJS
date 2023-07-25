"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartIcon from "./CartIcon";

const links = [
  {
    id: 1,
    title: "Homepage",
    url: "/",
  },
  {
    id: 2,
    title: "Menu",
    url: "/menu",
  },
  {
    id: 3,
    title: "Working Hours",
    url: "/",
  },
  {
    id: 4,
    title: "Contact",
    url: "/",
  },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user = false;

  return (
    <div className="">
      {!open ? (
        <Image
          alt="open"
          src="/open.png"
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          alt="close"
          src="/close.png"
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div className="bg-green-500 text-white absolute left-0 top-12 h-[calc(100vh-3rem)] w-full flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              onClick={() => setOpen(false)}
              className="hover:bg-green-600 hover:rounded-md hover:p-4"
            >
              {link.title}
            </Link>
          ))}
          {!user ? (
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="hover:bg-green-600 hover:rounded-md hover:p-4"
            >
              Login
            </Link>
          ) : (
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="hover:bg-green-600 hover:rounded-md hover:p-4"
            >
              Orders
            </Link>
          )}
          <Link
            href="/cart"
            className="hover:bg-green-600 hover:rounded-md hover:p-4"
          >
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
