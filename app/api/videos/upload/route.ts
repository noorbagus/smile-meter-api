// smile-meter-api/app/api/videos/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { supabase } from '@/lib/supabase';
import { APIResponse, RewardCategory } from '@/lib/types';
import { z } from 'zod';

// Export config for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Validasi input
const uploadSchema = z.object({
  unitId: z.string().min(1),
  smileScore: z.number().min(0).max(1),
  rewardCategory: z.enum(['small_prize', 'medium_prize', 'top_prize'])
});

export async function POST(
  req: NextRequest
): Promise<NextResponse<APIResponse<any>>> {
  try {
    const formData = await req.formData();
    const video = formData.get('video') as File;
    const unitId = formData.get('unitId') as string;
    const smileScore = parseFloat(formData.get('smileScore') as string);
    const rewardCategory = formData.get('rewardCategory') as RewardCategory;
    
    // Validasi input
    try {
      uploadSchema.parse({ unitId, smileScore, rewardCategory });
    } catch (error: any) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: error.errors
        }
      }, { status: 400 });
    }
    
    // Verifikasi unit ID
    const { data: unit } = await supabase
      .from('units')
      .select('id')
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
    
    // Generate unique video ID
    const videoId = `video_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const fileName = `${videoId}.mp4`;
    
    // Upload to Vercel blob storage
    const { url } = await put(fileName, video, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
    });
    
    // Set expiration (24 hours)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    // Save to database
    const { error: dbError } = await supabase
      .from('video_uploads')
      .insert({
        video_id: videoId,
        unit_id: unitId,
        smile_score: smileScore,
        reward_category: rewardCategory,
        download_url: url,
        expires_at: expiresAt.toISOString()
      });
    
    if (dbError) throw dbError;
    
    return NextResponse.json({
      success: true,
      data: {
        videoId,
        downloadUrl: url,
        qrCodeData: url,
        expiresAt: expiresAt.getTime()
      }
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'VIDEO_UPLOAD_FAILED',
        message: error.message
      }
    }, { status: 500 });
  }
}