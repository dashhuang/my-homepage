import { NextResponse } from 'next/server';
import { getPhotoPaths } from '../../gallery/gallery-api';

export async function GET() {
  // 调用服务器端函数获取照片列表
  const photoSets = getPhotoPaths();
  
  // 返回JSON响应
  return NextResponse.json(photoSets);
} 