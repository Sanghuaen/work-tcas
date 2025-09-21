"use client";

import { usePortfolioStore } from "../../../store/store";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IImage } from "../../../lib/types";
import { useState } from "react";

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
      style={{
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "16px",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onClick={onClick}
    >
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: "600",
          marginBottom: "12px",
          textAlign: "center",
          color: "#374151",
        }}
      >
        {title}
      </h3>
      {images.length > 0 ? (
        <img
          src={images[0].url}
          alt={title}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#6b7280" }}>ไม่มี{title}</p>
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "16px",
            textAlign: "center",
            color: "#1f2937",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={title}
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "contain",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudentDetailPage() {
  const params = useParams();
  const portfolios = usePortfolioStore((state) => state.portfolios);
  const portfolio = portfolios.find((p) => p.id.toString() === params.id);

  const [activeAlbum, setActiveAlbum] = useState<{
    title: string;
    images: IImage[];
  } | null>(null);

  if (!portfolio) {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", color: "#ef4444", fontWeight: "600" }}>
          ไม่พบข้อมูลนักศึกษา!
        </h1>
        <Link href="/teacher" style={{ color: "#2563eb", textDecoration: "underline" }}>
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
    <div
      style={{
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1280px",
        margin: "auto",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "24px",
            textAlign: "center",
            color: "#111827",
          }}
        >
          รายละเอียด Portfolio
        </h1>

        {/* Layout: ซ้าย (รูป) + ขวา (ข้อมูล) */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginBottom: "40px",
            alignItems: "flex-start",
          }}
        >
          {/* รูปภาพนักศึกษา */}
          <div style={{ flex: "1", textAlign: "center" }}>
            {studentImages.length > 0 ? (
              <img
                src={studentImages[0].url}
                alt="Student"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              />
            ) : (
              <p style={{ color: "#6b7280" }}>ไม่มีรูปภาพนักศึกษา</p>
            )}
          </div>

          {/* ข้อมูลนักศึกษา */}
          <div style={{ flex: "2" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#374151",
              }}
            >
              {portfolio.prefix} {portfolio.firstName} {portfolio.lastName}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#4b5563" }}>
              <p><strong>ที่อยู่:</strong> {portfolio.address}</p>
              <p><strong>เบอร์โทรศัพท์:</strong> {portfolio.phone}</p>
              <p><strong>โรงเรียน:</strong> {portfolio.school}</p>
              <p><strong>GPA:</strong> {portfolio.gpa}</p>
              <p><strong>มหาวิทยาลัยที่เลือก:</strong> {portfolio.university}</p>
              <p><strong>สาขาที่เลือก:</strong> {portfolio.major}</p>
              <p><strong>ความสามารถพิเศษ:</strong> {portfolio.skills}</p>
              <p><strong>เหตุผลในการสมัคร:</strong> {portfolio.reason}</p>
            </div>
          </div>
        </div>

        {/* Albums */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <AlbumCard title="กิจกรรม" images={activityImages} onClick={() => setActiveAlbum({ title: "กิจกรรม", images: activityImages })} />
          <AlbumCard title="รางวัล" images={awardImages} onClick={() => setActiveAlbum({ title: "รางวัล", images: awardImages })} />
          <AlbumCard title="ผลงาน" images={workImages} onClick={() => setActiveAlbum({ title: "ผลงาน", images: workImages })} />
        </div>

        {/* ปุ่มกลับ */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link href="/teacher">
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#374151",
                color: "white",
                borderRadius: "6px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
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
