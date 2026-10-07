import { NextResponse } from 'next/server';

export async function GET() {
  const target = process.env.PMQC_SUBSTACK_URL || 'https://pmqc.substack.com';
  return NextResponse.redirect(target, 307);
}
