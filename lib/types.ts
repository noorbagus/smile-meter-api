// smile-meter-api/lib/types.ts
export type RewardCategory = 'small_prize' | 'medium_prize' | 'top_prize';

export interface APISuccess<T> {
  success: true;
  data: T;
}

export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export type APIResponse<T> = APISuccess<T> | APIError;

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  UNIT_NOT_FOUND: 'UNIT_NOT_FOUND',
  VIDEO_NOT_FOUND: 'VIDEO_NOT_FOUND',
  VIDEO_EXPIRED: 'VIDEO_EXPIRED',
  VIDEO_UPLOAD_FAILED: 'VIDEO_UPLOAD_FAILED',
  IMAGE_UPLOAD_FAILED: 'IMAGE_UPLOAD_FAILED',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_SMILE_SCORE: 'INVALID_SMILE_SCORE',
  INVALID_REWARD_CATEGORY: 'INVALID_REWARD_CATEGORY',
  INVALID_UNIT_ID: 'INVALID_UNIT_ID'
} as const;