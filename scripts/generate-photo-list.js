/**
 * 生成照片列表脚本
 * 
 * 这个脚本会扫描public/family-photos目录，
 * 生成所有照片的列表，并更新API路由文件以及静态JSON文件
 */

const fs = require('fs');
const path = require('path');

// 配置项
const CONFIG = {
  photoDir: path.join(process.cwd(), 'public', 'family-photos'),
  outputFile: path.join(process.cwd(), 'app', 'api', 'photos', 'route.ts'),
  jsonOutputFile: path.join(process.cwd(), 'public', 'photos-data.json'),
  templateFile: path.join(process.cwd(), 'scripts', 'photo-route-template.txt')
};

// 获取照片列表
function getPhotoPaths() {
  try {
    const files = fs.readdirSync(CONFIG.photoDir);
    
    // 将图片分为两类：标准格式和HEIC格式
    const standardImages = files
      .filter(fileName => 
        /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/i.test(fileName)
      )
      .map(fileName => `/family-photos/${fileName}`);
    
    const heicImages = files
      .filter(fileName => 
        /\.(heic|HEIC)$/i.test(fileName)
      )
      .map(fileName => `/family-photos/${fileName}`);
    
    return {
      standard: standardImages,
      heic: heicImages
    };
  } catch (error) {
    console.error("获取照片错误:", error);
    return { standard: [], heic: [] };
  }
}

// 更新API路由文件
function updateApiRouteFile(photoData) {
  // 生成照片数组字符串
  const standardArray = photoData.standard
    .map(path => `    '${path}'`)
    .join(',\n');
  
  const heicArray = photoData.heic
    .map(path => `    '${path}'`)
    .join(',\n');
  
  // 生成完整的路由文件内容
  const fileContent = `import { NextResponse } from 'next/server';

// 使用静态照片列表而不是fs模块，在Vercel环境中更可靠
// 由scripts/generate-photo-list.js脚本自动生成，请勿手动修改
const PHOTOS = {
  standard: [
${standardArray}
  ],
  heic: [
${heicArray}
  ]
};

export async function GET() {
  // 简单返回静态定义的照片列表，避免在Vercel环境中使用fs模块
  return NextResponse.json(PHOTOS);
}`;

  // 写入文件
  fs.writeFileSync(CONFIG.outputFile, fileContent);
  console.log(`成功更新API照片列表，包含 ${photoData.standard.length} 张标准格式照片和 ${photoData.heic.length} 张HEIC格式照片`);
}

// 更新静态JSON文件
function updateJsonFile(photoData) {
  // 创建JSON对象
  const jsonContent = JSON.stringify(photoData, null, 2);
  
  // 写入文件
  fs.writeFileSync(CONFIG.jsonOutputFile, jsonContent);
  console.log(`成功更新静态JSON照片列表`);
}

// 主函数
function main() {
  console.log('开始生成照片列表...');
  const photoData = getPhotoPaths();
  updateApiRouteFile(photoData);
  updateJsonFile(photoData);
  console.log('照片列表生成完成！');
}

// 执行主函数
main(); 