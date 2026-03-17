//src/components/dashboard/UserTable.jsx

import { useState, useMemo } from 'react';
import { Search, Eye, ArrowUpDown, TrendingUp, User as UserIcon } from 'lucide-react';
import ActivityModal from './ActivityModal';

export default function UserTable({ profiles, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'msgCount', direction: 'desc' });

  // 1. Logic: Transform, Filter, and Sort
  const sortedAndFilteredProfiles = useMemo(() => {
    let result = profiles.map(p => ({
      ...p,
      msgCount: p.received_messages?.length || 0,
    }));

    if (searchTerm) {
      result = result.filter(p => 
        p.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [profiles, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all">
      {/* Search & Header */}
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">User Directory</h2>
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
            <TrendingUp size={12} /> Live Stats
          </span>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, username, or email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/30 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
            <tr>
              <th className="px-8 py-5 cursor-pointer group select-none" onClick={() => requestSort('username')}>
                <div className="flex items-center gap-2 group-hover:text-gray-900 transition-colors">
                  User Profile <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-8 py-5 text-center cursor-pointer group select-none" onClick={() => requestSort('msgCount')}>
                <div className="flex items-center justify-center gap-2 group-hover:text-gray-900 transition-colors">
                  Messages <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              // --- LOADING SKELETONS ---
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100" />
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-gray-200 rounded-full" />
                        <div className="h-2 w-48 bg-gray-100 rounded-full" />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="mx-auto h-7 w-12 bg-gray-100 rounded-lg" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="ml-auto h-10 w-28 bg-gray-100 rounded-xl" />
                  </td>
                </tr>
              ))
            ) : (
              // --- ACTUAL DATA ---
              sortedAndFilteredProfiles.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {user.avatar_url ? (
                        <img 
                          src={user.avatar_url} 
                          alt={user.username} 
                          className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shadow-sm" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-bold text-gray-300 border border-gray-100 uppercase text-sm">
                          {user.full_name?.[0] || user.username?.[0] || <UserIcon size={18} />}
                        </div>
                      )}
                      <div>
                        <p className="font-black text-gray-900 text-sm tracking-tight">{user.full_name || 'No Name'}</p>
                        <p className="text-xs text-gray-400 font-bold">@{user.username} • {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${
                      user.msgCount > 0 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                      : 'bg-gray-50 text-gray-300 border border-gray-100'
                    }`}>
                      {user.msgCount}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
                    >
                      <Eye size={14} /> View Logs
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {!loading && sortedAndFilteredProfiles.length === 0 && (
        <div className="p-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-3xl text-gray-300 mb-4">
            <Search size={32} />
          </div>
          <p className="text-gray-400 font-bold italic">No users found matching your search.</p>
        </div>
      )}

      {selectedUser && (
        <ActivityModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}