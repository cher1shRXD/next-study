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
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

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

  const logOut = () => {
    alert('로그아웃 되었습니다.');
    localStorage.removeItem('userId');
    window.location.href = '/'
  }

  return (
    <div>
      <Link href="/write" className="mr-4">
        글 쓰기
      </Link>
      {!userId ? (
        <Link href="/login" className="mr-4">
          로그인
        </Link>
      ) : (
        <span onClick={logOut}>
          로그아웃
        </span>
      )}
      {posts.map((item) => (
        <>
          <div
            key={item.id}
            onClick={() => {
              viewPost(item.id);
            }}
            className="py-3"
          >
            <h1 className="text-xl font-extrabold text-center">{item.title}</h1>
            <p className="text-center">{item.author}</p>
            <p className="text-center">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default Board;
