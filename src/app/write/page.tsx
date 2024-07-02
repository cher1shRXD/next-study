"use client";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Write() {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const author = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState<string>();

  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const submit = async () => {
    if (title.current && content.current && author.current) {
      if (!userId) {
        alert("로그인 후 이용해주세요");
        window.location.href = "/login";
      } else {
        if (
          title.current.value.trim() !== "" &&
          content.current.value.trim() !== "" &&
          author.current.value.trim() !== ""
        ) {
          try {
            setLoading(true);
            const formattedContent = content.current.value.replace(
              /\n/g,
              "<br>"
            );
            const response = await axios.post(
              "/api/board",
              {
                title: title.current.value,
                content: formattedContent,
                author: author.current.value,
              },
              {
                headers: {
                  userId: +userId,
                },
              }
            );
            alert(response.data.message);
            title.current.value = "";
            content.current.value = "";
            author.current.value = "";
            window.location.href = "/board";
          } catch (err: any) {
            if (err.response.status === 401) {
              alert("로그인 후 이용해 주세요");
              window.location.href = "/login";
            }
          }
          setLoading(false);
        } else {
          alert("모든 입력칸을 채워주세요");
        }
      }
    }
  };

  return (
    <div className="w-withSidebar ml-72 h-screen flex items-center">
      <Header pageTitle="글쓰기" />
      <div className="flex flex-col justify-start max-w-700 w-full h-128 px-10 mx-auto py-10">
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
          className="border-b outline-none resize-none h-52 my-3 text-2xl"
        ></textarea>
        <button onClick={submit} className="my-3 text-2xl" disabled={loading}>
          {!loading ? "게시" : "게시중..."}
        </button>
      </div>
    </div>
  );
}
