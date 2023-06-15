import { NextRequest, NextResponse } from 'next/server';
import { encryptImageAndSave } from '@/functions/server/encryptImageAndSave';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get('image') as Blob;

    const cipherKey = Number(process.env.cipherKey);
    const complexity = Number(process.env.complexity);

    encryptImageAndSave(file, complexity, cipherKey, "uploads", "test2.png")
        .then(() => {})
        .catch(() => {
            return NextResponse.json({ message: "Error while treating image!" })
        });

    return NextResponse.json({ message: "Image scrambled successfully!" })
}