'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const Board = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const param = useSearchParams();
  const postId = param.get("id");

  useEffect(()=>{
    console.log(postId);
  },[])

  const getPostContent = async () => {
    try {
      const res = await axios.get(`/api/board`, {
        params: {
          id: postId,
        },
      });
      console.log(res)
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      getPostContent();
    }
  }, []);

  return (
    <div>
      {posts.map((item) => (
        <div key={item.id} className="flex flex-col pd">
          <h1 className="text-5xl my-4 text-center">{item.title}</h1>
          <p className="text-center">{item.author}</p>
          <i className="text-center">
            {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
          </i>
          <hr />
          <p className="text-2xl my-4 px-4">{item.content}</p>
        </div>
      ))}
      <hr />
    </div>
  );
};

export default Board;
