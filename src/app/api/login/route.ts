import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const prisma = new PrismaClient();

    const { stId, password } = body;

    if (!stId || !password) {
      return NextResponse.json(
        { message: "모든 필드를 채워주세요" },
        { status: 400 }
      );
    }

    const hashSHA256 = (input: string): string => {
      const hash = createHash("sha256");
      hash.update(input);
      return hash.digest("hex");
    }

    const user = await prisma.user.findUnique({
      where: { stId },
    });

    if (!user) {
      console.log(hashSHA256(password));
      return NextResponse.json(
        { message: "유저 정보를 찾을 수 없습니다" },
        { status: 404 }
      );
    }


    if (hashSHA256(password)!=user.password) {
      console.log(hashSHA256(password));
      console.log(user.password);
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다" },
        { status: 401 }
      );
    }else{
      console.log(hashSHA256(password))
      console.log(user.password);
    }



    return NextResponse.json({
      message: "로그인 성공",
      status: 200,
      data:user,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다", status: 500 },
      { status: 500 }
    );
  }
};
