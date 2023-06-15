"use client";

import ScramblePath from '@/components/ScramblePath';
import UnscramblePath from '@/components/UnscramblePath';

export default function Url(): JSX.Element {  

  const cipherKey = Number(process.env.NEXT_PUBLIC_CIPHERKEY);
  const complexity = Number(process.env.NEXT_PUBLIC_COMPLEXITY);

  return (
    <div className='flex flex-col justify-start items-start w-full gap-10'>
      <ScramblePath path="../touka.png" cipherKey={97483} complexity={10} width={800} height={450} onePiece={true} />
      <UnscramblePath path="../test2.png" cipherKey={cipherKey} complexity={complexity} width={800} height={450} onePiece={false} />
    </div>
  );
}
