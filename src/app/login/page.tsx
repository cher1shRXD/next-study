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
    <>
      <Link href="/board" className="mr-4">
        나가기
      </Link>
      <div className="flex flex-col justify-center w-1/2 h-96 mx-auto">
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
    </>
  );
}

export default Login