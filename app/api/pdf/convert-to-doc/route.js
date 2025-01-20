// api/pdf/convert-to-doc/route.js
import { NextResponse } from 'next/server';
import { convertPdfToDoc } from '@/lib/pdf/converters';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const convertedFile = await convertPdfToDoc(buffer);

    return NextResponse.json({
      url: convertedFile.url,
      filename: convertedFile.filename
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}