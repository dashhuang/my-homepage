import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public", "family-photos");
    const files = fs.readdirSync(publicDir);
    
    // 将图片分为两类：标准格式和HEIC格式
    const standardImages = files.filter((fileName) => 
      /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/i.test(fileName)
    ).map((fileName) => `/family-photos/${fileName}`);
    
    const heicImages = files.filter((fileName) => 
      /\.(heic|HEIC)$/i.test(fileName)
    ).map((fileName) => `/family-photos/${fileName}`);
    
    // 返回分类后的图片列表
    return NextResponse.json({
      standard: standardImages,
      heic: heicImages
    });
  } catch (error) {
    console.error("获取照片错误:", error);
    
    // 发生错误时返回空列表
    return NextResponse.json({
      standard: [],
      heic: []
    }, { status: 500 });
  }
} 