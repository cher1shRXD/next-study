import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const requestedId = Number(params.id);
  const prisma = new PrismaClient();

  try {
    const post = await prisma.board.findUnique({
      where: { id: requestedId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
