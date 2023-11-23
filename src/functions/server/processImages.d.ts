// processImages.d.ts
import { NextResponse } from 'next/server';

interface ProcessImagesOptions {
    pieces: string[];
    width: number;
    height: number;
    folder: string;
    filename: string;
}

export declare function processImages(options: ProcessImagesOptions): Promise<NextResponse>;
