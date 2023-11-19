import { NextRequest, NextResponse } from 'next/server';
import { encryptImageAndSave } from '../../../src/functions/server/encryptImageAndSave';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get('image') as Blob;
    const folderName = formData.get('folder') as string;
    const imageName = formData.get('name') as string;

    const cipherKey = Number(process.env.cipherKey || 0);
    const complexity = Number(process.env.complexity || 0);

    encryptImageAndSave(file, complexity, cipherKey, folderName, imageName)
        .then(() => {})
        .catch(() => {
            return NextResponse.json({ message: "Error while treating image!" })
        });

    return NextResponse.json({ message: "Image scrambled successfully!" })
}