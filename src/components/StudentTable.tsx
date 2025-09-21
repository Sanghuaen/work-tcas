// src/components/StudentTable.tsx
"use client";

import Link from 'next/link';
import { usePortfolioStore } from '../store/store';

export default function StudentTable() {
  const portfolios = usePortfolioStore((state) => state.portfolios);

  // 🔽 เรียงตาม firstName (A → Z) ก่อน map
  const sortedPortfolios = [...portfolios].sort((a, b) =>
    a.firstName.localeCompare(b.firstName, 'th') // รองรับภาษาไทยด้วย
  );

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl w-full p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-sky-800 dark:text-sky-400">
          รายการ Portfolio นักเรียน
        </h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="p-4 border-b border-gray-300 dark:border-gray-600 text-center w-12 rounded-tl-xl">ลำดับ</th>
              <th className="p-4 border-b border-gray-300 dark:border-gray-600 text-left">ชื่อ-นามสกุล</th>
              <th className="p-4 border-b border-gray-300 dark:border-gray-600 text-left w-24">GPA</th>
              <th className="p-4 border-b border-gray-300 dark:border-gray-600 text-left rounded-tr-xl w-36">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {sortedPortfolios.length > 0 ? (
              sortedPortfolios.map((p, index) => (
                <tr key={p.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="p-4 text-center text-gray-800 dark:text-gray-200">{index + 1}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-200">{p.firstName} {p.lastName}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-200">{p.gpa}</td>
                  <td className="p-4">
                    <Link href={`/teacher/${p.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      ดูรายละเอียด
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 dark:text-gray-400">
                  ยังไม่มีข้อมูล Portfolio
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}