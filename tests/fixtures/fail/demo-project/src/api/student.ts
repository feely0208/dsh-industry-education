import { request } from '../utils/request';

export interface StudentProfile {
  name: string;
  /** 学籍号：由学校统一导入 */
  studentNo: string;
  grade: string;
  className: string;
}

export async function fetchStudentProfile(studentId: string): Promise<StudentProfile> {
  return request.get(`/api/student/profile/${studentId}`);
}
