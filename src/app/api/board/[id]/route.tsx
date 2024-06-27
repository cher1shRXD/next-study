import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function GET(req:NextRequest ,{ params }: { params: { id: number } }) {
  const requestedId = params.id;

  const prisma = new PrismaClient();

  const post = await prisma.board.findUnique({
    where: { id: requestedId },
  });

  return post;
}
