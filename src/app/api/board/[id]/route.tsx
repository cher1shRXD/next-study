import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET({ params }: { params: { id: number } }) {
  const requestedId = params.id;

  const prisma = new PrismaClient();

  const post = await prisma.board.findUnique({
    where: { id: requestedId },
  });

  return NextResponse.json(post);
}
