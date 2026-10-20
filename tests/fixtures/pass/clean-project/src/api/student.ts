import { request } from '../utils/request';

export interface StudentProfile {
  name: string;
  /** 学籍号：占位符，非真实学籍号 */
  studentNo: string;
  grade: string;
}

export async function fetchMyProfile(): Promise<StudentProfile> {
  return request.get('/api/student/me');
}
