"use client";

import { shuffleArray } from '@/functions/shuffleArray';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const complexity = 15;
  const cipherKey = 731263789;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [imageName, setImageName] = useState<string>("");

  const [imagePieces, setImagePieces] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files && e.target.files[0];
    setImageName(file!.name);
    setSelectedFile(file || null);
  };

  const loadImageFromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setImagePieces([]);
    if (selectedFile) {
      loadImageFromFile(selectedFile)
        .then((dataUrl) => {
          const image = new Image();
          image.src = dataUrl;
          image.onload = () => {

            const thisImageWidth = image.width;
            setImageWidth(thisImageWidth);
            const thisImageHeight = image.height;
            setImageHeight(thisImageHeight);

            const pieceWidth = thisImageWidth / complexity;
            const pieceHeight = thisImageHeight / complexity;

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
    }
  }, [selectedFile]);

  useEffect(() => {
    const PostData = async (pieces: string[]) => {
      const data = {
        pieces: pieces,
        width: imageWidth,
        height: imageHeight,
        folder: 'uploads',
        filename: imageName,
      };

      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (imagePieces.length === complexity * complexity) {
      PostData(shuffleArray(imagePieces, cipherKey));
    }
  }, [imagePieces, selectedFile]);


  return (
    <div className='flex justify-start items-start w-full gap-10'>
      <div className='flex flex-col justify-start items-center w-full'>
        <h1>Image Slicer</h1>
        <form>
          <input type="file" onChange={handleFileChange} />
        </form>
      </div>
    </div>
  );
}
