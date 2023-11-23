import Image from 'next/image';
import React from 'react';

interface ImageSlicesPageProps {
    pieces: string[],
    height: number,
    width: number
}

const ImageSlices = ({ pieces, height, width }: ImageSlicesPageProps) => {
  const gridSize = Math.ceil(Math.sqrt(pieces.length));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: width, height: height, position: 'relative' }}>
      {pieces.map((src, index) => (
        <Image width={width} height={height} key={index} src={src} alt="Image Slice" />
      ))}
    </div>
  );
};

export default ImageSlices;
