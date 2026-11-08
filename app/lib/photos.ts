import photoData from '@/public/photos-data.json';

// 页面只需要展示用的字段，原图路径等不下发到客户端
export type Photo = {
  id: string;
  previewSrc: string;
  fullSrc: string;
  width: number;
  height: number;
};

export const allPhotos: Photo[] = [...photoData.standard, ...photoData.heic].map(
  ({ id, previewSrc, fullSrc, width, height }) => ({ id, previewSrc, fullSrc, width, height })
);
