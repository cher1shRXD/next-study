"use client";

import React, { useRef, useState, useEffect } from "react";
import { createHash } from "crypto";
import axios from "axios";
import Header from "../components/Header";

const Login = () => {
  const userId = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [authId, setAuthId] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setAuthId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (authId != undefined) {
      location.href = "/board";
    }
  }, [authId]);

  function hashSHA256(input: string): string {
    const hash = createHash("sha256");
    hash.update(input);
    return hash.digest("hex");
  }

  const submit = async () => {
    if (userId.current && password.current) {
      setLoading(true);
      await axios
        .post("/api/login", {
          stId: userId.current.value,
          password: hashSHA256(password.current.value),
        })
        .then((response) => {
          localStorage.setItem("userId", response.data.data.id);
          window.location.href = "/board";
        })
        .catch((err) => {
          if (err.response.status == 401) {
            alert("비밀번호가 올바르지 않습니다.");
          }
          if (err.response.status == 404) {
            alert("유저를 찾을 수 없습니다.");
          }
        });
      setLoading(false);
    }
  };

  return (
    <div className="w-withSidebar ml-72 h-screen flex flex-col justify-center">
      <Header pageTitle="로그인" />
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
        <button onClick={submit} className="my-3 text-2xl" disabled={loading}>
          {!loading ? "로그인" : "로그인중..."}
        </button>
      </div>
    </div>
  );
};

export default Login;
