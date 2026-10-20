/** 按分数排序：仅用于本地展示，不产生任何对外可见的顺序信息 */
export function sortByScore<T extends { score: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => b.score - a.score);
}
