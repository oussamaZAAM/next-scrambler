import { shuffleArray } from '../shuffleArray';
import { Canvas, createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

export async function scrambleCanvas(canvas: Canvas, complexity: number) {
    const ctx = canvas.getContext('2d');
    const imageWidth = canvas.width;
    const imageHeight = canvas.height;

    const pieceWidth = imageWidth / complexity;
    const pieceHeight = imageHeight / complexity;

    const imagePieces = [];

    // Loop through the rows and columns of the canvas to create image pieces
    for (let row = 0; row < complexity; row++) {
        for (let col = 0; col < complexity; col++) {
            const pieceCanvas = createCanvas(pieceWidth, pieceHeight);
            const pieceCtx = pieceCanvas.getContext('2d');

            if (pieceCtx && ctx) {
                // Draw the corresponding piece of the original canvas onto each piece canvas
                pieceCtx.drawImage(
                    canvas,
                    col * pieceWidth,
                    row * pieceHeight,
                    pieceWidth,
                    pieceHeight,
                    0,
                    0,
                    pieceWidth,
                    pieceHeight
                );
                // Convert the piece canvas to a data URL and add it to the imagePieces array
                imagePieces.push(pieceCanvas.toDataURL());
            }
        }
    }

    return imagePieces;
}

export async function encryptImageAndSave(file: Blob, complexity: number, cipherKey: number, folder: string, filename: string) {
    const reader = file.stream().getReader();

    const chunks: Uint8Array[] = [];
    while (true) {
        // Read chunks of the image file using the reader and store them in an array
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    const buffer = Buffer.concat(chunks);
    const image = await loadImage(buffer);

    // Get original image resolution
    const width = image.width;
    const height = image.height;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0, width, height);

    try {
        const imagePieces = await scrambleCanvas(canvas, complexity);
        const imagePromises = shuffleArray(imagePieces, cipherKey).map((src) => loadImage(src));
        const images = await Promise.all(imagePromises);

        // Calculate the layout of images on the canvas
        const totalImages = images.length;
        const columns = Math.ceil(Math.sqrt(totalImages));
        const rows = Math.ceil(totalImages / columns);

        const cellWidth = Math.ceil(width / columns);
        const cellHeight = Math.ceil(height / rows);

        const scrambledCanvas = createCanvas(width, height);
        const scrambledContext = scrambledCanvas.getContext('2d');

        // Clear the canvas
        scrambledContext.clearRect(0, 0, width, height);

        // Draw each image onto the new canvas at the appropriate position
        images.forEach((image, index) => {
            const columnIndex = index % columns;
            const rowIndex = Math.floor(index / columns);

            const cellX = columnIndex * cellWidth;
            const cellY = rowIndex * cellHeight;

            const aspectWidth = Math.min(image.width, cellWidth);
            const aspectHeight = Math.min(image.height, cellHeight);

            const x = cellX + (cellWidth - aspectWidth) / 2;
            const y = cellY + (cellHeight - aspectHeight) / 2;

            scrambledContext.drawImage(image, x, y, aspectWidth, aspectHeight);
        });

        const outputFolderPath = path.join(process.cwd(), "/" + folder);
        const outputFilePath = path.join(outputFolderPath, filename);

        // Create the output folder (if it doesn't exist)
        fs.mkdirSync(outputFolderPath, { recursive: true });

        const outputStream = fs.createWriteStream(outputFilePath);
        const stream = scrambledCanvas.createPNGStream();

        // Pipe the canvas stream to the output stream
        stream.pipe(outputStream);

        return new Promise((resolve, reject) => {
            outputStream.on('finish', () => resolve);

            outputStream.on('error', reject);
        });
    } catch (error) {
        console.error('Failed to load images:', error);
    }
}