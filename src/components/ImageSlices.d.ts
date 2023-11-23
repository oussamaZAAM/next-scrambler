// ImageSlices.d.ts
import React from 'react';

interface ImageSlicesProps {
    pieces: string[],
    height: number,
    width: number
}

declare module 'nextscrambler/src/components/ImageSlices' {
    const ImageSlices: React.FC<ImageSlicesProps>;
    export default ImageSlices;
}
