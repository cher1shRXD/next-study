"use client";
import axios from "axios";
import { useRef } from "react";
import Link from "next/link";

export default function Write() {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const author = useRef<HTMLInputElement>(null);


  const submit = async () => {
    if (title.current && content.current && author.current) {
      if (
        title.current.value.replace(" ", "") != "" &&
        content.current.value.replace(" ", "") != "" &&
        author.current.value.replace(" ", "") != ""
      ) {
        await axios
          .post("/api/board", {
            title: title.current.value,
            content: content.current.value,
            author: author.current.value,
          })
          .then((response) => {
            alert(response.data.message);
            if (title.current && content.current && author.current) {
              title.current.value = "";
              content.current.value = "";
              author.current.value = "";
              window.location.href = '/board';
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("모든 입력칸을 채워주세요");
      }
    }
  };

  return (
    <>
      <Link href="/board">나가기</Link>
      <div className="flex flex-col justify-center w-1/2 h-96 mx-auto">
        <input
          type="text"
          placeholder="제목"
          ref={title}
          className="border-b outline-none my-3"
        />
        <input
          type="text"
          placeholder="작성자"
          ref={author}
          className="border-b outline-none my-3"
        />
        <textarea
          placeholder="내용"
          ref={content}
          className="border-b outline-none resize-none h-20 my-3"
        ></textarea>
        <button onClick={submit} className="my-3">
          게시
        </button>
      </div>
    </>
  );
}
