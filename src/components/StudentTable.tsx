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
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', width: '5%' }}>ลำดับ</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ชื่อ-นามสกุล</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>GPA</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>รายละเอียด</th>
        </tr>
      </thead>
      <tbody>
        {sortedPortfolios.length > 0 ? (
          sortedPortfolios.map((p, index) => (
            <tr key={p.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p.firstName} {p.lastName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p.gpa}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <Link href={`/teacher/${p.id}`} style={{ color: '#0070f3', textDecoration: 'underline' }}>
                  ดูรายละเอียด
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
              ยังไม่มีข้อมูล Portfolio
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
