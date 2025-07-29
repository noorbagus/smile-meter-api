// smile-meter-api/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { APIResponse } from '@/lib/types';

export async function GET(): Promise<NextResponse<APIResponse<any>>> {
  return NextResponse.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString()
    }
  });
}