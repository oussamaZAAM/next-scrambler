import { processImages } from "../../src/functions/server/processImages";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!Array.isArray(body.pieces)) {
    return NextResponse.json(new Error('Invalid pieces data'), { status: 400 });
  }

  if (body.pieces.length === 0) {
    return NextResponse.json(new Error('Empty pieces array'), { status: 400 });
  }

  try {
    const response = await processImages(body);
    return response;
  } catch (error) {
    console.error('Error processing images:', error);
    return NextResponse.json(new Error('Error processing images'), { status: 500 });
  }
}