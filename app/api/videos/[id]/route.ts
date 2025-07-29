// smile-meter-api/app/api/videos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { APIResponse } from '@/lib/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const videoId = params.id;
    
    const { data: video, error } = await supabase
      .from('video_uploads')
      .select('download_url, expires_at, unit_id')
      .eq('video_id', videoId)
      .single();
    
    if (error || !video) {
      return NextResponse.json({
        success: false,
        error: { 
          code: 'VIDEO_NOT_FOUND', 
          message: 'Video not found' 
        }
      }, { status: 404 });
    }
    
    // Check expiration
    if (new Date() > new Date(video.expires_at)) {
      return NextResponse.json({
        success: false,
        error: { 
          code: 'VIDEO_EXPIRED', 
          message: 'Video has expired' 
        }
      }, { status: 410 });
    }
    
    // Log download
    await supabase
      .from('video_downloads')
      .insert({
        video_id: videoId,
        downloaded_at: new Date().toISOString(),
        ip_address: req.headers.get('x-forwarded-for') || null,
        user_agent: req.headers.get('user-agent') || null
      });
    
    // Redirect to actual video URL
    return NextResponse.redirect(video.download_url);
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: { 
        code: 'DOWNLOAD_ERROR', 
        message: error.message 
      }
    }, { status: 500 });
  }
}