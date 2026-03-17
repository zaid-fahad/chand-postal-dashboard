import { Trophy } from 'lucide-react';

export default function Leaderboard({ profiles }) {
  const topUsers = [...profiles]
    .sort((a, b) => (b.received_messages?.length || 0) - (a.received_messages?.length || 0))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
        <Trophy size={14} className="text-yellow-500" /> User Leaderboard
      </h3>
      <div className="space-y-6">
        {topUsers.map((user, i) => (
          <div key={user.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-gray-200 w-4 italic">0{i + 1}</span>
              {user.avatar_url ? (
                <img src={user.avatar_url} className="w-11 h-11 rounded-2xl object-cover border border-gray-100" alt="" />
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 font-black text-xs uppercase border border-gray-100">
                  {user.username?.[0]}
                </div>
              )}
              <div className="truncate max-w-[120px]">
                <p className="text-sm font-black text-gray-900 leading-tight truncate">{user.full_name || user.username}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase truncate">@{user.username}</p>
              </div>
            </div>
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100/50">
              {user.received_messages?.length || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}