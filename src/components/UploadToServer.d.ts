// UploadToServer.d.ts
import { ReactNode, ChangeEvent } from 'react';

type UploadToServerProps = {
  complexity: number;
  cipherKey: number;
  uploadPath: string;
  fileName?: string;
  folderName?: string;
};

declare module './UploadToServer' {
  const UploadToServer: (props: UploadToServerProps) => ReactNode;
  export default UploadToServer;

  type ChangeEventWithFile = ChangeEvent<HTMLInputElement> & {
    target: { files: FileList | null };
  };
//   const handleFileChange: (e: ChangeEventWithFile) => void;

//   const loadImageFromFile: (file: File) => Promise<string>;
}