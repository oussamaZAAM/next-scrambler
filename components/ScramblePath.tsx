import { shuffleArray } from '@/functions/shuffleArray';
import { useEffect, useState } from 'react';
import RenderImageFromPieces from './RenderImageFromPieces';
import ImageSlices from './ImageSlices';

interface Props {
    path: string;
    cipherKey: number;
    complexity: number;
    width: number;
    height: number;
    onePiece: boolean;
}

export default function ScramblePath({ path, cipherKey, complexity, width = 800, height = 450, onePiece }: Props): JSX.Element {
    const [imagePieces, setImagePieces] = useState<string[]>([]);
    const [scrambledPieces, setScrambledPieces] = useState<string[]>(imagePieces);

    const loadImageFromPath = (imagePath: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const context = canvas.getContext('2d');

                if (context) {
                    context.drawImage(image, 0, 0);
                    resolve(canvas.toDataURL());
                } else {
                    reject(new Error('Failed to get canvas context.'));
                }
            };
            image.onerror = (error) => {
                reject(error);
            };
            image.src = imagePath;
        });
    };

    useEffect(() => {
        setImagePieces([]);

        loadImageFromPath(path)
            .then((dataUrl) => {
                const image = new Image();
                image.src = dataUrl;
                image.onload = () => {
                    const pieceWidth = image.width / complexity;
                    const pieceHeight = image.height / complexity;

                    for (let row = 0; row < complexity; row++) {
                        for (let col = 0; col < complexity; col++) {
                            const canvas = document.createElement('canvas');
                            canvas.width = pieceWidth;
                            canvas.height = pieceHeight;
                            const context = canvas.getContext('2d');

                            if (context) {
                                context.drawImage(
                                    image,
                                    col * pieceWidth,
                                    row * pieceHeight,
                                    pieceWidth,
                                    pieceHeight,
                                    0,
                                    0,
                                    pieceWidth,
                                    pieceHeight
                                );
                                setImagePieces((prevPieces) => [...prevPieces, canvas.toDataURL()]);
                            }
                        }
                    }
                };
            })
            .catch((error) => {
                console.error('Failed to load image:', error);
            });
    }, []);

    useEffect(() => {
        if (imagePieces.length === complexity * complexity) {
            setScrambledPieces(shuffleArray(imagePieces, cipherKey));
        }
    }, [imagePieces]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {onePiece
                ? <RenderImageFromPieces pieces={scrambledPieces} width={width} height={height} />
                : <ImageSlices pieces={scrambledPieces} width={width} height={height} />
            }
        </div>
    );
}
