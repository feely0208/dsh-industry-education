import { request } from '../utils/request';

/** 班级成绩榜单 */
export const RANK_URL = '/api/score/rank';
/** 年级成绩榜单 */
export const GRADE_RANK_URL = '/api/score/rank/grade';

/** 拉取本次考试的成绩排名，用于班级排行页展示 */
export async function fetchScoreRank(examId: string) {
  return request.get(`${RANK_URL}?examId=${examId}`);
}

/** 按分数从高到低排序，生成名次列表 */
export function buildRankList(rows: Array<{ name: string; score: number }>) {
  return [...rows].sort((a, b) => b.score - a.score);
}
