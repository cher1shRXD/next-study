'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const SideBar = () => {


  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const logOut = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="w-72 h-screen border-r z-50 fixed bg-white flex flex-col items-center py-5">
      <Link href="/" className="font-Cafe24Shiningstar text-6xl cursor-pointer">
        대소나무숲
      </Link>
      <Link
        href="/write"
        className="my-2 w-4/5 hover:bg-slate-200 py-2 rounded-md px-1"
      >
        글쓰기
      </Link>
      <Link
        href="/"
        className="my-2 w-4/5 hover:bg-slate-200 py-2 rounded-md px-1"
      >
        메인
      </Link>
      <Link
        href="/board"
        className="my-2 w-4/5 hover:bg-slate-200 py-2 rounded-md px-1"
      >
        자유게시판
      </Link>
      {!userId ? (
        <Link
          href="/login"
          className="my-2 w-4/5 hover:bg-slate-200 py-2 rounded-md px-1"
        >
          로그인
        </Link>
      ) : (
        <span
          onClick={logOut}
          className="my-2 w-4/5 hover:bg-slate-200 cursor-pointer py-2 rounded-md px-1 text-red-500"
        >
          로그아웃
        </span>
      )}
    </div>
  );
};

export default SideBar