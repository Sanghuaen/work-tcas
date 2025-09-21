// src/components/StudentForm.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IPortfolio, IImage } from "../lib/types";
import { usePortfolioStore } from "../store/store";
import { useState } from "react";
import ImageUploader from "./ImageUploader";

type FormData = Omit<IPortfolio, "id" | "images">;

export default function StudentForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const addPortfolio = usePortfolioStore((state) => state.addPortfolio);

  const [studentImages, setStudentImages] = useState<IImage[]>([]);
  const [activityImages, setActivityImages] = useState<IImage[]>([]);
  const [workImages, setWorkImages] = useState<IImage[]>([]);
  const [awardImages, setAwardImages] = useState<IImage[]>([]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const allImages = [
      ...studentImages,
      ...activityImages,
      ...workImages,
      ...awardImages,
    ];
    addPortfolio(data, allImages);
    alert("บันทึกข้อมูล Portfolio เรียบร้อย!");
    reset();
    setStudentImages([]);
    setActivityImages([]);
    setWorkImages([]);
    setAwardImages([]);
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl w-full space-y-8 p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-sky-800 dark:text-sky-400">
          แบบฟอร์ม Portfolio สำหรับสมัคร TCAS69
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- Personal Information --- */}
          <div className="col-span-1 md:col-span-2 border-b-2 border-gray-200 dark:border-gray-700 pb-4">
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">ข้อมูลส่วนตัว</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">คำนำหน้าชื่อ:</label>
            <select 
              {...register('prefix')} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">ชื่อ:</label>
            <input 
              {...register('firstName', { required: 'กรุณากรอกชื่อ' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.firstName && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.firstName.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">นามสกุล:</label>
            <input 
              {...register('lastName', { required: 'กรุณากรอกนามสกุล' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.lastName && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.lastName.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">ที่อยู่:</label>
            <input 
              {...register('address', { required: 'กรุณากรอกที่อยู่' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.address && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.address.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">หมายเลขโทรศัพท์:</label>
            <input 
              {...register('phone', { required: 'กรุณากรอกหมายเลขโทรศัพท์' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.phone && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.phone.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">โรงเรียน:</label>
            <input 
              {...register('school', { required: 'กรุณากรอกโรงเรียน' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.school && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.school.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">GPA:</label>
            <input 
              type="number" 
              step="0.01" 
              {...register('gpa', { 
                required: 'กรุณากรอก GPA', 
                min: { value: 0, message: 'GPA ต้องไม่ต่ำกว่า 0' },
                max: { value: 4, message: 'GPA ต้องไม่เกิน 4' }
              })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {errors.gpa && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.gpa.message}</span>}
          </div>

          {/* --- Portfolio Information --- */}
          <div className="col-span-1 md:col-span-2 border-b-2 border-gray-200 dark:border-gray-700 pb-4 mt-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">ข้อมูล Portfolio</h2>
          </div>
          
          <div className="col-span-1 md:col-span-2 mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">ความสามารถพิเศษ:</label>
            <textarea 
              {...register('skills', { required: 'กรุณากรอกความสามารถพิเศษ' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.skills && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.skills.message}</span>}
          </div>
          
          <div className="col-span-1 md:col-span-2 mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">เหตุผลในการสมัครเข้าเรียน:</label>
            <textarea 
              {...register('reason', { required: 'กรุณากรอกเหตุผล' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.reason && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.reason.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">สาขาที่เลือก:</label>
            <input 
              {...register('major', { required: 'กรุณากรอกสาขาที่เลือก' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.major && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.major.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">มหาวิทยาลัย:</label>
            <input 
              {...register('university', { required: 'กรุณากรอกมหาวิทยาลัย' })} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            />
            {errors.university && <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">{errors.university.message}</span>}
          </div>

          {/* Section: Images */}
          <div className="col-span-2 border-b pb-3 mt-4 mb-3 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">รูปภาพ</h2>
          </div>

          <div className="col-span-2">
            <ImageUploader
              onImagesChange={setStudentImages}
              category="student"
              title="รูปภาพนักศึกษา"
            />
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <ImageUploader 
              onImagesChange={setActivityImages} 
              category="activity" 
              title="รูปภาพกิจกรรม" 
            />
            <ImageUploader 
              onImagesChange={setWorkImages} 
              category="work" 
              title="รูปภาพผลงาน" 
            />
            <ImageUploader 
              onImagesChange={setAwardImages} 
              category="award" 
              title="รูปภาพรางวัล" 
            />
          </div>

          {/* Submit */}
          <div className="col-span-2 text-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              บันทึก Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}