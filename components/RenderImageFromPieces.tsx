import { useEffect, useRef } from 'react';

interface Props {
  pieces: string[];
  width: number;
  height: number;
}

const RenderImageFromPieces: React.FC<Props> = ({ pieces, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const imagePromises = pieces.map((src) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error('Failed to load image.'));
          image.src = src;
        });
      });

      Promise.all(imagePromises)
        .then((images) => {
          const totalImages = images.length;

          let columns = Math.ceil(Math.sqrt(totalImages));
          let rows = Math.ceil(totalImages / columns);

          const cellWidth = Math.ceil(width / columns);
          const cellHeight = Math.ceil(height / rows);

          canvas.width = width;
          canvas.height = height;

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
        })
        .catch((error) => {
          console.error('Failed to load images:', error);
        });
    }
  }, [pieces, width, height]);

  return <canvas ref={canvasRef} />;
};

export default RenderImageFromPieces;
