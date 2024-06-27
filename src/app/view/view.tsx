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


  return (
    post && (
      <div key={post.id} className="flex flex-col">
        <Link href="/board">나가기</Link>
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
