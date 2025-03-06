// 静态类型定义
export type PhotoSets = {
  standard: string[];
  heic: string[];
};

// 在客户端导入时使用的静态方法
export async function getPhotoPathsClient(): Promise<PhotoSets> {
  try {
    // 使用静态JSON文件而不是API路由
    const response = await fetch('/photos-data.json');
    if (!response.ok) {
      throw new Error('获取照片失败');
    }
    return await response.json();
  } catch (error) {
    console.error("获取照片错误:", error);
    return { standard: [], heic: [] };
  }
} 