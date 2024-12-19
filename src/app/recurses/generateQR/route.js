import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const qrCode = await QRCode.toDataURL(text);
    return NextResponse.json({ qrCode });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
