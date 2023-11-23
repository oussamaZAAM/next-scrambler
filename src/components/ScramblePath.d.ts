// ScramblePath.d.ts
import { ReactNode } from 'react';

interface ScramblePathProps {
  path: string;
  cipherKey: number;
  complexity: number;
  width?: number;
  height?: number;
  onePiece: boolean;
}

declare module './ScramblePath' {
  const ScramblePath: (props: ScramblePathProps) => ReactNode;
  export default ScramblePath;
}
