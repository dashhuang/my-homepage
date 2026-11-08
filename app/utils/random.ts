// 不重复地随机挑选 count 个元素（部分 Fisher-Yates 洗牌）
export function pickRandom<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  const size = Math.min(count, pool.length);

  for (let i = 0; i < size; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, size);
}
