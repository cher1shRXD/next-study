import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const prisma = new PrismaClient();

    const { title, content, author } = body;
    const userId = +req.headers.get("userId")!;
  
    const createdAt = new Date();

    if (!title || !content || !author) {
      return NextResponse.json(
        { message: "모든 필드를 채워주세요" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "인증되지 않은 사용자입니다" },
        { status: 401 }
      );
    }else{
      const data = await prisma.board.create({
        data: {
          title,
          content,
          author,
          createdAt,
        },
      });
      return NextResponse.json({
        message: "게시가 성공적으로 완료되었습니다",
        status: 200,
        data,
      });
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다", status: 500 },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try{
    const prisma = new PrismaClient();
    const data = await prisma.board.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json({status:200,data})
  }catch (err) {
    return NextResponse.json({status:500,message:'네트워크 에러'});
  }
}