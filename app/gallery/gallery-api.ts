import fs from "fs";
import path from "path";

export type PhotoSets = {
  standard: string[];
  heic: string[];
};

export function getPhotoPaths(): PhotoSets {
  try {
    const publicDir = path.join(process.cwd(), "public", "family-photos");
    const fileNames = fs.readdirSync(publicDir);
    
    // 将图片分为两类：标准格式和HEIC格式
    const standardImages = fileNames.filter((fileName) => 
      /\.(jpg|jpeg|png|gif)$/i.test(fileName)
    ).map((fileName) => `/family-photos/${fileName}`);
    
    const heicImages = fileNames.filter((fileName) => 
      /\.(heic|HEIC)$/i.test(fileName)
    ).map((fileName) => `/family-photos/${fileName}`);
    
    // 返回分类后的图片列表
    return {
      standard: standardImages,
      heic: heicImages
    };
  } catch (error) {
    console.error("获取照片错误:", error);
    return { standard: [], heic: [] };
  }
} 