import Cors from "cors";
import { NextRequest, NextResponse } from "next/server";

const cors = Cors({
  methods: ["GET", "HEAD", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  origin: "*", 
});

function runMiddleware(req: NextRequest, res: NextResponse, fn:any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result:any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function corsMiddleware(req:NextRequest, res:NextResponse) {
  await runMiddleware(req, res, cors);
}
