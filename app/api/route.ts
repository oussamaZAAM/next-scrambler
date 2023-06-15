import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { pieces, width, height, folder, filename } = body;

  if (!Array.isArray(pieces)) {
    return NextResponse.json(new Error('Invalid pieces data'), {status: 400});
  }

  if (pieces.length === 0) {
    return NextResponse.json(new Error('Empty pieces array'), {status: 400});
  }

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return NextResponse.json(new Error('Failed to create canvas context'), {status: 500});
  }

  try {
    const imagePromises = pieces.map((src) => loadImage(src));
    const images = await Promise.all(imagePromises);

    // Calculate the layout of images on the canvas
    const totalImages = images.length;
    const columns = Math.ceil(Math.sqrt(totalImages));
    const rows = Math.ceil(totalImages / columns);

    const cellWidth = Math.ceil(width / columns);
    const cellHeight = Math.ceil(height / rows);

    ctx.clearRect(0, 0, width, height);

    images.forEach((image, index) => {
      const columnIndex = index % columns;
      const rowIndex = Math.floor(index / columns);

      const cellX = columnIndex * cellWidth;
      const cellY = rowIndex * cellHeight;

      const aspectWidth = Math.min(image.width, cellWidth);
      const aspectHeight = Math.min(image.height, cellHeight);

      const x = cellX + (cellWidth - aspectWidth) / 2;
      const y = cellY + (cellHeight - aspectHeight) / 2;

      ctx.drawImage(image, x, y, aspectWidth, aspectHeight);
    });

    const outputFolderPath = path.join(process.cwd(), folder);
    const outputFilePath = path.join(outputFolderPath, filename);

    fs.mkdirSync(outputFolderPath, { recursive: true });

    const outputStream = fs.createWriteStream(outputFilePath);
    const stream = canvas.createPNGStream();

    stream.pipe(outputStream);

    outputStream.on('finish', () => {
      console.log('Rendered image saved successfully');
      return NextResponse.json({ success: true }, {status: 200});
    });

    outputStream.on('error', (error) => {
      console.error('Failed to save rendered image:', error);
      return NextResponse.json(new Error('Failed to save rendered image'), {status: 500});
    });
  } catch (error) {
    console.error('Failed to load images:', error);
    return NextResponse.json(new Error('Failed to load images'), {status: 500});
  }
}
