// app/api/pdf/convert-to-powerpoint/route.js
import { NextResponse } from 'next/server';
import { convertPdfToPowerpoint, validatePdf } from '@/lib/pdf/converters';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert the file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate PDF
    const validation = await validatePdf(buffer);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid PDF file' },
        { status: 400 }
      );
    }

        // Convert PDF to PPTX
    const pptxBuffer = await convertPdfToPowerpoint(buffer);

    return new NextResponse(pptxBuffer, {
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
