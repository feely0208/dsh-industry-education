import { request } from '../utils/request';

export const MY_SCORE_URL = '/api/score/mine';

export interface MyScore {
  termId: string;
  score: number;
  rankText: string;
}

/** 只拉当前登录学生本人的成绩，返回给本人查看 */
export async function fetchMyScore(termId: string): Promise<MyScore> {
  return request.get(`${MY_SCORE_URL}?termId=${termId}`);
}
