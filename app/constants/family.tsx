import type { ReactNode } from 'react';
import type { Localized } from '../lib/i18n';

export type FamilyMember = {
  id: string;
  nickname: string;
  birthday: `${string}-${string}`; // MM-DD，当天自动放气球
  photo: string;
  name: Localized;
  title: Localized;
  desc: Localized<ReactNode>;
};

export const heroPhoto = '/family-photos-optimized/full/719BD143-ADD6-4F94-8CFC-BAF43235608A.webp';

const xLink = <a href="https://x.com/DashHuang" target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2' }}>X</a>;
const instagramLink = <a href="https://www.instagram.com/dashhuang/" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C' }}>Instagram</a>;

export const parents: FamilyMember[] = [
  {
    id: 'dash',
    nickname: 'Dash',
    birthday: '03-18',
    photo: '/family-photos-optimized/full/IMG_0875.webp',
    name: { zh: 'Dash 黄一孟', en: 'Dash Huang' },
    title: { zh: '家庭顶梁柱', en: 'Family Pillar' },
    desc: {
      zh: <>作为家庭的中流砥柱，Dash不仅关心每个家庭成员的需求，也为家庭提供坚实的依靠。他喜欢编程和技术，闲暇时会带领全家一起户外活动。在 {xLink} 和 {instagramLink} 上分享技术和生活。</>,
      en: <>As the backbone of the family, Dash not only cares for the needs of each family member but also provides solid support. He enjoys programming and technology, and in his spare time, leads the family in outdoor activities. Follow him on {xLink} and {instagramLink} for tech and life.</>,
    },
  },
  {
    id: 'cherry',
    nickname: 'Cherry',
    birthday: '12-14',
    photo: '/family-photos-optimized/full/L1030065.webp',
    name: { zh: 'Cherry 吴智群', en: 'Cherry Wu' },
    title: { zh: '家庭的灵魂人物', en: 'Soul of the Family' },
    desc: {
      zh: 'Cherry是家庭的情感核心，善解人意且充满智慧。她热爱阅读和烹饪，总是能为家人带来美味佳肴和温暖的关怀，是孩子们心中的避风港。',
      en: 'Cherry is the emotional core of the family, understanding and full of wisdom. She loves reading and cooking, always bringing delicious food and warm care to the family, and is a safe harbor for the children.',
    },
  },
];

export const children: FamilyMember[] = [
  {
    id: 'jimmy',
    nickname: 'Jimmy',
    birthday: '03-23',
    photo: '/family-photos-optimized/full/jimmy.webp',
    name: { zh: 'Jimmy', en: 'Jimmy' },
    title: { zh: '大儿子', en: 'Eldest Son' },
    desc: {
      zh: 'Jimmy聪明好学，对科学和自然充满好奇心。他喜欢游戏和网球，总是能带给家人欢乐和惊喜。',
      en: 'Jimmy is intelligent and eager to learn, with curiosity about science and nature. He enjoys gaming and tennis, always bringing joy and surprises to the family.',
    },
  },
  {
    id: 'tinny',
    nickname: 'Tinny',
    birthday: '09-21',
    photo: '/family-photos-optimized/full/IMG_3908.webp',
    name: { zh: 'Tinny', en: 'Tinny' },
    title: { zh: '大女儿', en: 'Eldest Daughter' },
    desc: {
      zh: 'Tinny充满创造力，热爱艺术和音乐。她喜欢跳舞和钢琴，有着丰富的想象力和细腻的情感。',
      en: 'Tinny is full of creativity, loving art and music. She enjoys dancing and playing the piano, with rich imagination and delicate emotions.',
    },
  },
  {
    id: 'kelly',
    nickname: 'Kelly',
    birthday: '10-16',
    photo: '/family-photos-optimized/full/IMG_9664.webp',
    name: { zh: 'Kelly', en: 'Kelly' },
    title: { zh: '二女儿', en: 'Younger Daughter' },
    desc: {
      zh: 'Kelly活泼可爱，已经4岁了，充满好奇心。她最喜欢和姐姐妈妈玩，总是用她天真的笑容感染着全家人。',
      en: 'Kelly is lively and adorable, already 4 years old, full of curiosity. She loves playing with her sister and mother, always infecting the whole family with her innocent smile.',
    },
  },
];

export const familyMembers = [...parents, ...children];
