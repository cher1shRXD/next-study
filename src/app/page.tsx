import Link from "next/link";


export default function Home() {

  return (
    <>
      <h1>대소나무숲</h1>
      <Link href='/write'>글 쓰기</Link>
      <br />
      <Link href='/board'>글 보기</Link>
      <br />
      <Link href='/login'>로그인</Link>
    </>
  );
}

