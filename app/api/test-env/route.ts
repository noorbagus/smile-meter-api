// app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    nodeEnv: process.env.NODE_ENV
  });
}