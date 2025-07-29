// smile-meter-api/app/api/units/[unitId]/daily-images/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { APIResponse } from '@/lib/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { unitId: string } }
): Promise<NextResponse<APIResponse<any>>> {
  try {
    const unitId = params.unitId;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Check if unit exists
    const { data: unit } = await supabase
      .from('units')
      .select('name')
      .eq('id', unitId)
      .single();
      
    if (!unit) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNIT_NOT_FOUND',
          message: `Unit with ID ${unitId} not found`
        }
      }, { status: 404 });
    }
    
    // Check for scheduled images first
    const { data: scheduled } = await supabase
      .from('scheduled_images')
      .select('category, image_url')
      .eq('unit_id', unitId)
      .eq('scheduled_date', today);
    
    // Get current unit images
    const { data: current } = await supabase
      .from('unit_images')
      .select('category, image_url, updated_at')
      .eq('unit_id', unitId);
    
    // Merge scheduled over current
    const imageMap: Record<string, string> = {};
    current?.forEach(img => {
      imageMap[img.category] = img.image_url;
    });
    scheduled?.forEach(img => {
      imageMap[img.category] = img.image_url;
    });
    
    return NextResponse.json({
      success: true,
      data: {
        images: imageMap,
        unitName: unit?.name || 'Unknown Unit',
        lastUpdated: Date.now(),
        hasScheduled: scheduled && scheduled.length > 0
      }
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'FETCH_IMAGES_FAILED',
        message: error.message
      }
    }, { status: 500 });
  }
}