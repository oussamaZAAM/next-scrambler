"use client";

import UploadToServer from "../src/components/UploadToServer";
import React from "react";

export default function Home(): JSX.Element {
  const complexity = Number(process.env.NEXT_PUBLIC_COMPLEXITY || 0);
  const cipherKey = Number(process.env.NEXT_PUBLIC_CIPHERKEY || 0);

  return (
    <div className="flex justify-center items-center my-8">
      <UploadToServer complexity={complexity} cipherKey={cipherKey} uploadPath={"/api"} fileName={"test.png"} folderName={"uploads"} />
    </div>
  );
}
