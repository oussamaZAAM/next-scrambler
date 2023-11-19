export function reassembleImage<T>(imagePieces: string[]): string {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      const pieceImage = new Image();
      pieceImage.src = imagePieces[0] ? imagePieces[0] : "";
      const pieceWidth = pieceImage.width;
      const pieceHeight = pieceImage.height;
      const gridSize = Math.sqrt(imagePieces.length);
      canvas.width = pieceWidth * gridSize;
      canvas.height = pieceHeight * gridSize;

      for (let i = 0; i < imagePieces.length; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const pieceImage = new Image();
        pieceImage.src = imagePieces[0] ? imagePieces[0] : "";
        context.drawImage(
          pieceImage,
          col * pieceWidth,
          row * pieceHeight,
          pieceWidth,
          pieceHeight
        );
      }

      return canvas.toDataURL();
    }

    return '';
  }