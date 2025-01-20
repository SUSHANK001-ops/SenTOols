import { NextResponse } from 'next/server';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import pdf from 'pdf-parse';

export async function POST(req) {
  console.log('Starting PDF conversion request');
  
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      console.log('No file provided');
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Log file details
    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse PDF
    console.log('Parsing PDF content');
    const pdfData = await pdf(buffer);
    const { text } = pdfData;

    if (!text || text.trim().length === 0) {
      throw new Error('The PDF contains no text.');
    }

    console.log(`PDF parsed successfully. Text length: ${text.length} characters`);

    // Create Word document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: text.split('\n').map((line) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 24, // Optional: Adjust font size as needed
                }),
              ],
            })
          ),
        },
      ],
    });

    // Generate Word document buffer
    console.log('Generating Word document');
    const docxBuffer = await Packer.toBuffer(doc);

    console.log('Conversion completed successfully');
    
    // Return the converted file
    return new NextResponse(docxBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=converted.docx',
      },
    });

  } catch (error) {
    console.error('Conversion error:', {
      message: error.message,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { error: 'PDF conversion failed: ' + error.message },
      { status: 500 }
    );
  }
}
