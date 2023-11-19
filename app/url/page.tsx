"use client";

import ScramblePath from '@/components/ScramblePath';
import UnscramblePath from '@/components/UnscramblePath';

export default function Url(): JSX.Element {  

  const cipherKey = Number(process.env.NEXT_PUBLIC_CIPHERKEY);
  const complexity = Number(process.env.NEXT_PUBLIC_COMPLEXITY);

  return (
    <div className='flex flex-col justify-center items-center w-full gap-10 my-4'>
      <ScramblePath path="../test.jpg" cipherKey={97483} complexity={15} width={800} height={450} onePiece={true} />
      <UnscramblePath path="../example.png" cipherKey={731263789} complexity={15} width={800} height={450} onePiece={false} />
    </div>
  );
}
