import React from 'react';

export default function StatCard({ label, value, icon, color, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between animate-pulse">
        <div className="space-y-3">
          <div className="h-3 w-24 bg-gray-100 rounded-full" />
          <div className="h-8 w-16 bg-gray-200 rounded-xl" />
        </div>
        <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  const iconColors = {
    "bg-blue-600": "text-blue-600 bg-blue-50 border-blue-100",
    "bg-indigo-600": "text-indigo-600 bg-indigo-50 border-indigo-100",
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md group">
      <div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <p className="text-4xl font-black text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110 ${iconColors[color] || 'text-gray-600 bg-gray-50'}`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
    </div>
  );
}