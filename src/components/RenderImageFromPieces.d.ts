// RenderImageFromPieces.d.ts
import { ReactNode } from 'react';

interface RenderImageFromPiecesProps {
  pieces: string[];
  width: number;
  height: number;
}

declare module './RenderImageFromPieces' {
  const RenderImageFromPieces: (props: RenderImageFromPiecesProps) => ReactNode;
  export default RenderImageFromPieces;
}
