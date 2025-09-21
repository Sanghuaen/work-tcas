// src/lib/types.ts
export interface IImage {
  id: string;
  url: string;
  category: 'student' | 'activity' | 'award' | 'work';
}

export interface IPortfolio {
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  skills: string;
  reason: string;
  major: string;
  university: string;
  images: IImage[]; // เพิ่มส่วนนี้สำหรับเก็บรูปภาพ
}