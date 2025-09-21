// src/components/StudentDetailPage.tsx
"use client";

import { usePortfolioStore } from "../../../store/store";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IImage } from "../../../lib/types";
import { useState } from "react";
import { X } from "lucide-react";

// Album Card
function AlbumCard({
  title,
  images,
  onClick,
}: {
  title: string;
  images: IImage[];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 cursor-pointer transform transition-transform duration-200 hover:scale-[1.03] border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-xl font-semibold text-center mb-3 text-sky-800 dark:text-sky-400">
        {title}
      </h3>
      {images.length > 0 ? (
        <img
          src={images[0].url}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">ไม่มีรูปภาพในอัลบั้มนี้</p>
      )}
    </div>
  );
}

// Popup Modal Album Viewer
function AlbumModal({
  title,
  images,
  onClose,
}: {
  title: string;
  images: IImage[];
  onClose: () => void;
}) {
  if (!images.length) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={28} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-800 dark:text-sky-400">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
              <img
                src={img.url}
                alt={title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StudentDetailPage() {
  const params = useParams();
  const portfolios = usePortfolioStore((state) => state.portfolios);
  const portfolio = portfolios.find((p) => p.id?.toString() === params.id);

  const [activeAlbum, setActiveAlbum] = useState<{
    title: string;
    images: IImage[];
  } | null>(null);

  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-red-500 dark:text-red-400 mb-4">
          ไม่พบข้อมูลนักศึกษา!
        </h1>
        <Link href="/teacher" className="text-blue-600 dark:text-blue-400 hover:underline">
          กลับไปหน้าอาจารย์
        </Link>
      </div>
    );
  }

  const studentImages = portfolio.images.filter((img) => img.category === "student");
  const activityImages = portfolio.images.filter((img) => img.category === "activity");
  const awardImages = portfolio.images.filter((img) => img.category === "award");
  const workImages = portfolio.images.filter((img) => img.category === "work");

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-sky-800 dark:text-sky-400">
          รายละเอียด Portfolio
        </h1>

        {/* Layout: ซ้าย (รูป) + ขวา (ข้อมูล) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-10">
          {/* รูปภาพนักศึกษา */}
          <div className="flex-shrink-0 w-64 h-64 overflow-hidden rounded-full shadow-lg border-4 border-gray-300 dark:border-gray-600">
            {studentImages.length > 0 ? (
              <img
                src={studentImages[0].url}
                alt="Student"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-center text-gray-500 dark:text-gray-400">ไม่มีรูปภาพนักศึกษา</p>
              </div>
            )}
          </div>

          {/* ข้อมูลนักศึกษา */}
          <div className="flex-1 w-full lg:w-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {portfolio.prefix} {portfolio.firstName} {portfolio.lastName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600 dark:text-gray-300">
              <p><strong>ที่อยู่:</strong> {portfolio.address}</p>
              <p><strong>เบอร์โทรศัพท์:</strong> {portfolio.phone}</p>
              <p><strong>โรงเรียน:</strong> {portfolio.school}</p>
              <p><strong>GPA:</strong> {portfolio.gpa}</p>
              <p><strong>มหาวิทยาลัย:</strong> {portfolio.university}</p>
              <p><strong>สาขา:</strong> {portfolio.major}</p>
              <p className="md:col-span-2"><strong>ความสามารถพิเศษ:</strong> {portfolio.skills}</p>
              <p className="md:col-span-2"><strong>เหตุผลในการสมัคร:</strong> {portfolio.reason}</p>
            </div>
          </div>
        </div>

        {/* Albums */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AlbumCard title="กิจกรรม" images={activityImages} onClick={() => setActiveAlbum({ title: "กิจกรรม", images: activityImages })} />
          <AlbumCard title="รางวัล" images={awardImages} onClick={() => setActiveAlbum({ title: "รางวัล", images: awardImages })} />
          <AlbumCard title="ผลงาน" images={workImages} onClick={() => setActiveAlbum({ title: "ผลงาน", images: workImages })} />
        </div>

        {/* ปุ่มกลับ */}
        <div className="text-center mt-10">
          <Link href="/teacher">
            <button className="px-8 py-3 bg-gray-700 dark:bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition">
              กลับไปหน้าอาจารย์
            </button>
          </Link>
        </div>
      </div>

      {/* Modal Viewer */}
      {activeAlbum && (
        <AlbumModal
          title={activeAlbum.title}
          images={activeAlbum.images}
          onClose={() => setActiveAlbum(null)}
        />
      )}
    </div>
  );
}