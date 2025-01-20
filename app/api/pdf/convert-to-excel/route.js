// app/api/pdf/convert-to-excel/route.js
import { NextResponse } from 'next/server';
import { convertPdfToExcel, validatePdf } from '@/lib/pdf/converters';

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

    // Convert PDF to Excel
    const excelBuffer = await convertPdfToExcel(buffer);

    return new NextResponse(excelBuffer, {
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
