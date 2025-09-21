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
    <div className="p-6 bg-blue-300 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
        {title}
      </h3>

      {/* ✅ ปุ่มเพิ่มรูปภาพ */}
      <div className="text-center mb-4">
        <input
          type="file"
          multiple
          onChange={handleChange}
          id={`file-upload-${category}`}
          style={{ display: "none" }}
        />
        <label
          htmlFor={`file-upload-${category}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
        >
          <Upload size={18} />
          Upload รูปภาพ
        </label>
      </div>

      {/* ✅ แสดงรูปภาพเป็นกริด */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square border rounded-lg overflow-hidden group"
          >
            <img
              src={img.url}
              alt={img.category}
              className="w-full h-full object-cover"
            />
            {/* ปุ่มลบ */}
            <button
              onClick={() => removeImage(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
