import React from 'react';

interface ImageSlicesPageProps {
    pieces: string[];
    height: number;
    width: number;
}

declare const ImageSlices: React.FC<ImageSlicesPageProps>;

export default ImageSlices;
