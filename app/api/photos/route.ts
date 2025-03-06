import { NextResponse } from 'next/server';

// 使用静态照片列表而不是fs模块，在Vercel环境中更可靠
const PHOTOS = {
  standard: [
    // 已有照片列表
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
    '/family-photos/ADE7BEC9-AEAE-4840-BB9D-C7CEB5BC6380.jpg',
    // 添加更多照片
    '/family-photos/BDBE8C4A-2729-42A6-8B44-CAAF8A8C0FC6.jpg',
    '/family-photos/C2AC0575-C298-4FC7-A17B-69D69448A6E3.jpg',
    '/family-photos/CW__4659.jpg',
    '/family-photos/CW__4778.jpg',
    '/family-photos/CW__4837.jpg'
  ],
  heic: [
    '/family-photos/IMG_9664.HEIC',
    '/family-photos/IMG_7055.HEIC',
    '/family-photos/IMG_7078.HEIC'
  ]
};

export async function GET() {
  // 简单返回静态定义的照片列表，避免在Vercel环境中使用fs模块
  return NextResponse.json(PHOTOS);
} 