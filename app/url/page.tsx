"use client";

import ScramblePath from '../../src/components/ScramblePath';
import UnscramblePath from '../../src/components/UnscramblePath';
import React from "react";

export default function Url(): JSX.Element {  

  const cipherKey = Number(process.env.NEXT_PUBLIC_CIPHERKEY || 0);
  const complexity = Number(process.env.NEXT_PUBLIC_COMPLEXITY || 0);

  return (
    <div className='flex flex-col justify-center items-center w-full gap-10 my-4'>
      <ScramblePath path="../test.png" cipherKey={cipherKey} complexity={complexity} width={800} height={450} onePiece={true} />
      <UnscramblePath path="../test.png" cipherKey={cipherKey} complexity={complexity} width={800} height={450} onePiece={false} />
    </div>
  );
}
