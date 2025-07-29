// smile-meter-api/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'smile-meter-api',
      environment: process.env.NODE_ENV || 'development'
    }
  });
}