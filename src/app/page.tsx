import Link from "next/link";


export default function Home() {

  return (
    <>
      <h1>대소나무숲</h1>
      <Link href='/write'>글 쓰기</Link>
      <Link href='/board'>글 보기</Link>
    </>
  );
}

