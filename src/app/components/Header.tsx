'use client'
import React from 'react'
import { useRouter } from 'next/navigation';

const Header = (props:{pageTitle:string}) => {

  const router = useRouter();


  return (
    <div className="mb-10 text-center pt-10 bg-white fixed w-screen 2xl:w-withSidebar flex justify-between px-5 top-0">
      <span className="text-sm cursor-pointer" onClick={()=>{router.back()}}>
        {"<"} 뒤로가기
      </span>
      <h1 className="font-Cafe24Shiningstar text-4xl">{props.pageTitle}</h1>
    </div>
  );
}

export default Header