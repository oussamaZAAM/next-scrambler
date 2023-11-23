// UnscramblePath.d.ts
import { ReactNode } from 'react';

interface UnscramblePathProps {
  path: string;
  cipherKey: number;
  complexity: number;
  width?: number;
  height?: number;
  onePiece: boolean;
}

declare module './UnscramblePath' {
  const UnscramblePath: (props: UnscramblePathProps) => ReactNode;
  export default UnscramblePath;
}
