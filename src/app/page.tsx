'use client'
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {

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
    <div className="w-screen 2xl:w-withSidebar 2xl:ml-72 ml-0 min-h-screen flex items-center justify-center">
      <div className="w-300 h-100 border flex flex-col justify-evenly items-center py-4 pb-10">
        <h1 className="font-Cafe24Shiningstar text-7xl mb-20 box-border">
          대소나무숲
        </h1>
        <Link
          href="/write"
          className="w-4/5 bg-lime-600 box-border py-3 text-center text-white rounded-full hover:bg-lime-700 transition-all"
        >
          글 쓰기
        </Link>
        <br />
        <Link
          href="/board"
          className="w-4/5 bg-lime-600 box-border py-3 text-center text-white rounded-full hover:bg-lime-700"
        >
          글 보기
        </Link>
        <br />
        {!userId ? (
          <Link
            href="/login"
            className="w-4/5 bg-lime-600 box-border py-3 text-center text-white rounded-full hover:bg-lime-700"
          >
            로그인
          </Link>
        ) : (
          <span
            onClick={logOut}
            className="w-4/5 bg-lime-600 box-border py-3 text-center text-white rounded-full hover:bg-lime-700 cursor-pointer"
          >
            로그아웃
          </span>
        )}
      </div>
    </div>
  );
}

