// src/components/ImageUploader.tsx
"use client";

import { useState } from "react";
import { IImage } from "../lib/types";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  onImagesChange: (images: IImage[]) => void;
  category: "student" | "activity" | "award" | "work";
  title: string;
}

export default function ImageUploader({
  onImagesChange,
  category,
  title,
}: ImageUploaderProps) {
  const [images, setImages] = useState<IImage[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    const newImages = files.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      url: URL.createObjectURL(file),
      category: category,
    }));
    setImages((prev) => [...prev, ...newImages]);
    onImagesChange([...images, ...newImages]);
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm">
      <h3 className="text-xl font-semibold text-center mb-4 text-sky-800 dark:text-sky-400">
        {title}
      </h3>

      {/* ✅ ปุ่มเพิ่มรูปภาพ */}
      <div className="text-center mb-4">
        <input
          type="file"
          multiple
          onChange={handleChange}
          id={`file-upload-${category}`}
          className="hidden"
        />
        <label
          htmlFor={`file-upload-${category}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-900 rounded-lg cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          <Upload size={18} />
          อัปโหลดรูปภาพ
        </label>
      </div>

      {/* ✅ แสดงรูปภาพเป็นกริด */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden group hover:border-blue-500 transition-colors"
          >
            <img
              src={img.url}
              alt={img.category}
              className="w-full h-full object-cover"
            />
            {/* ปุ่มลบ */}
            <button
              onClick={() => removeImage(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}