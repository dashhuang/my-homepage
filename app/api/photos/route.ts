import { NextResponse } from 'next/server';

// 从服务器端读取文件系统会导致函数大小过大
// 改为静态定义照片列表
const PHOTOS = {
  standard: [
    '/family-photos/IMG_9200.jpeg',
    '/family-photos/IMG_9147.jpeg',
    '/family-photos/IMG_9139.jpeg',
    '/family-photos/IMG_9071.jpeg',
    '/family-photos/IMG_1435.jpeg',
    '/family-photos/IMG_7604.jpeg',
    '/family-photos/2U2A5498.jpg',
    '/family-photos/2U2A5506.jpg',
    '/family-photos/719BD143-ADD6-4F94-8CFC-BAF43235608A.jpg',
    '/family-photos/IMG_0875.jpeg',
    '/family-photos/L1030065.JPG',
    '/family-photos/jimmy.jpg',
    '/family-photos/IMG_3908.jpeg',
    '/family-photos/IMG_9664.jpeg',
    '/family-photos/09A5D818-AA9A-43D2-B177-CA1901A0CBDB.jpg',
    '/family-photos/0D72608E-AD55-4B4D-BC32-02AED1EFE052.jpg',
    '/family-photos/2U2A5457.jpg',
    '/family-photos/2U2A5495.jpg',
    '/family-photos/2U2A5569.jpg',
    '/family-photos/37545F19-BEE8-4006-97C1-CB8F3E0C5A5C.jpg',
    '/family-photos/388ED0BA-052B-4C4A-AB71-A413B6150BB2.jpg',
    '/family-photos/3C54DBB6-EC95-4239-A462-A70CB1676335.jpg',
    '/family-photos/4CD2D181-F5D5-4444-A7B0-C5DA358A0E5B.jpg',
    '/family-photos/76BDC83B-BE39-40AF-A727-2A80C6E3AD80.jpg',
    '/family-photos/7BEC102F-E2B6-4F11-BADA-3A0A82A713DF.jpg',
    '/family-photos/ADE7BEC9-AEAE-4840-BB9D-C7CEB5BC6380.jpg'
  ],
  heic: [
    '/family-photos/IMG_9664.HEIC',
    '/family-photos/IMG_7055.HEIC',
    '/family-photos/IMG_7078.HEIC'
  ]
};

export async function GET() {
  // 返回静态定义的照片列表
  return NextResponse.json(PHOTOS);
} 