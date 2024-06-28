"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const Board = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const res = await axios.get("/api/board");
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (!Array.isArray(posts)) {
    return <div>Loading...</div>; 
  }

  if (posts.length == 0) {
    return (
      <>
        <div>글이 없습니다...</div>
        <Link href='/write'>글 쓰기</Link>
      </>
    );
  }

  const viewPost = (param:number) => {
    window.location.href = `/view?id=${param}`
  }


  return (
    <div className="w-withSidebar ml-72">
      <h1 className="mb-10 text-center pt-10 font-Cafe24Shiningstar text-3xl bg-white fixed w-withSidebar">
        자유게시판
      </h1>
      <div className="pt-20">
        {posts.map((item) => (
          <>
            <div
              key={item.id}
              onClick={() => {
                viewPost(item.id);
              }}
              className="py-3 px-7"
            >
              <h1 className="text-xl font-extrabold">{item.title}</h1>
              <p>작성자: {item.author}</p>
              <p className="text-end">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default Board;
