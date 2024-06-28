"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Write() {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const author = useRef<HTMLInputElement>(null);

  const [userId,setUserId] = useState<string>();

  useEffect(()=>{
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  },[]);


  const submit = async () => {
    if (title.current && content.current && author.current) {
      if(!userId) {
        alert('로그인 후 이용해주세요');
        window.location.href = '/login';
      }else{
        if (
          title.current.value.replace(" ", "") != "" &&
          content.current.value.replace(" ", "") != "" &&
          author.current.value.replace(" ", "") != ""
        ) {
          await axios
            .post(
              "/api/board",
              {
                title: title.current.value,
                content: content.current.value,
                author: author.current.value,
              },
              {
                headers: {
                  userId: Number(userId),
                },
              }
            )
            .then((response) => {
              alert(response.data.message);
              if (title.current && content.current && author.current) {
                title.current.value = "";
                content.current.value = "";
                author.current.value = "";
                window.location.href = "/board";
              }
            })
            .catch((err) => {
              if (err.response.status == 401) {
                alert("로그인 후 이용해 주세요");
                window.location.href = "/login";
              }
            });
        } else {
          alert("모든 입력칸을 채워주세요");
        }
      }
    }
  };

  const logOut = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="w-withSidebar ml-72 h-screen flex items-center">
      <h1 className="mb-10 text-center pt-10 font-Cafe24Shiningstar text-3xl bg-white fixed w-withSidebar top-0">
        글쓰기
      </h1>
      <div className="flex flex-col justify-start max-w-700 w-full h-96 px-10 mx-auto py-10">
        <input
          type="text"
          placeholder="제목"
          ref={title}
          className="border-b outline-none my-3 text-2xl"
        />
        <input
          type="text"
          placeholder="작성자"
          ref={author}
          className="border-b outline-none my-3 text-2xl"
        />
        <textarea
          placeholder="내용"
          ref={content}
          className="border-b outline-none resize-none h-20 my-3 text-2xl"
        ></textarea>
        <button onClick={submit} className="my-3 text-2xl">
          게시
        </button>
      </div>
    </div>
  );
}
