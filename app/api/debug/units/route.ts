// app/api/debug/units/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: units, error } = await supabase
      .from('units')
      .select('*');
    
    return NextResponse.json({
      success: true,
      data: { units, error }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}