'use client'
import Link from 'next/link';
import React, { useRef } from 'react'
import { createHash, hash } from 'crypto';
import axios from 'axios';

const Login = () => {

  const userId = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  function hashSHA256(input: string): string {
    const hash = createHash("sha256");
    hash.update(input);
    return hash.digest("hex");
  }

  const submit = async () => {
    if (userId.current && password.current) {
      await axios.post("/api/login", {
        stId: userId.current.value,
        password: hashSHA256(password.current.value)
      }).then(
        response => {
          localStorage.setItem('userId',response.data.data.id);
          window.location.href = '/board';
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    }
  }


  return (
    <div className="w-withSidebar ml-72 h-screen flex flex-col justify-center">
      <h1 className="mb-10 text-center pt-10 font-Cafe24Shiningstar text-3xl bg-white fixed w-withSidebar top-0">
        로그인
      </h1>
      <div className="flex flex-col justify-center max-w-700 w-full h-96 mx-auto px-10">
        <input
          type="text"
          placeholder="학번"
          ref={userId}
          className="border-b outline-none my-3 text-2xl"
        />
        <input
          type="password"
          placeholder="비밀번호"
          ref={password}
          className="border-b outline-none my-3 text-2xl"
        />
        <button onClick={submit} className="my-3 text-2xl">
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login