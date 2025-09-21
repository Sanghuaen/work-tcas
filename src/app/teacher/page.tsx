'use client';

import StudentTable from '../../components/StudentTable';

export default function TeacherPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">รายชื่อนักเรียน</h1>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      <StudentTable />
    </div>
  );
}