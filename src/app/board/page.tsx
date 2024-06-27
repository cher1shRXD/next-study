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
    console.log(param);
    window.location.href = `/view?id=${param}`
  }

  return (
    <div>
      {posts.map((item) => (
        <>
          <div key={item.id} onClick={()=>{viewPost(item.id)}}>
            <h1>{item.title}</h1>
            <p>{item.author}</p>
            <i>{new Date(item.createdAt).toLocaleDateString()}</i>
          </div>
          <hr />
        </>
      ))}
      <Link href="/write">글 쓰기</Link>
    </div>
  );
};

export default Board;
