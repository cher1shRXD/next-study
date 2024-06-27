"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const View = () => {
  const [post, setPost] = useState<Post | null>(null);
  const param = useSearchParams();
  const postId = param.get("id");
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    console.log(postId);
  }, [postId]);

  const getPostContent = async () => {
    try {
      const res = await axios.get(`/api/board/${postId}`);
      console.log(res);
      setPost(res.data);
    } catch (error) {
      console.error("게시글을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      getPostContent();
    }
  }, []);

  const logOut = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };


  return (
    post && (
      <div key={post.id} className="flex flex-col">
        <Link href="/board" className="mr-4">
          나가기
        </Link>
        {!userId ? (
          <Link href="/login" className="mr-4">
            로그인
          </Link>
        ) : (
          <span onClick={logOut}>로그아웃</span>
        )}
        <h1 className="text-4xl my-4 text-center">{post.title}</h1>
        <p className="text-center">{post.author}</p>
        <i className="text-center">
          {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
        </i>
        <hr />
        <p className="text-2xl my-4 px-4 text-center">{post.content}</p>
        <hr />
      </div>
    )
  );
};

export default View;
