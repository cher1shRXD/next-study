import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  try {
    const url = new URL(req.url);
    const postId = url.pathname.split("/").pop();

    if (!postId || isNaN(+postId)) {
      return NextResponse.json(
        { error: "유효하지 않은 요청입니다." },
        { status: 400 }
      );
    }

    const requestedId = +postId;
    console.log(`Requested ID: ${requestedId}`);

    const post = await prisma.board.findUnique({
      where: { id: requestedId },
    });

    if (!post) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("게시물 조회 중 오류 발생:", error);
    return NextResponse.json({ error: "내부 서버 오류" }, { status: 500 });
  }
}
