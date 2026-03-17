//src/App.jsx

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Mail, ShieldX, RotateCw, Star, Image as ImageIcon, Hash } from 'lucide-react';
import { supabase, ADMIN_EMAIL } from './lib/supabase';
import { useDashboardData } from './hooks/useDashboardData';

import LoginForm from './components/auth/LoginForm';
import Navbar from './components/ui/Navbar';
import StatCard from './components/dashboard/StatCard';
import UserTable from './components/dashboard/UserTable';
import Leaderboard from './components/dashboard/Leaderboard';
import RankList from './components/dashboard/RankList';

export default function App() {
  const [session, setSession] = useState(null);
  const { data, loading, refresh } = useDashboardData(!!session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  if (!session) return <LoginForm />;
  
  // Replace your old line with this:
if (!ADMIN_EMAIL.includes(session.user.email)) {
  return <UnauthorizedView />;
}
  

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
    
<main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
  {/* Stat Cards - Tighter sizing */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <StatCard label="Active Users" value={data.profiles.length} icon={<Users />} color="bg-blue-600" loading={loading} />
    <StatCard label="Messages Logged" value={data.totalMessages} icon={<Mail />} color="bg-indigo-600" loading={loading} />
  </div>

  {/* Analytics Grid - 2/3 and 1/3 balance */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    <div className="lg:col-span-2 bg-gray-50/50 rounded-[3rem] p-10 border border-gray-100 h-full">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
        <Star size={14} className="text-blue-500" /> Usage Volume
      </h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.chartData}>
            <defs>
              <linearGradient id="colorMsg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
            <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
            <Area type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={4} fill="url(#colorMsg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <Leaderboard profiles={data.profiles} />
  </div>

  {/* Asset Rankings */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <RankList title="Popular Eid Cards" icon={<ImageIcon />} items={data.cardRankings} type="card" />
    <RankList title="Trending Stamps" icon={<Hash />} items={data.stampRankings} type="stamp" />
  </div>

  <UserTable profiles={data.profiles} loading={loading} />
</main>
    </div>
  );
}

function UnauthorizedView() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-sans">
      <div className="w-20 h-20 bg-white shadow-xl rounded-[2.5rem] flex items-center justify-center text-red-500 mb-8 border border-gray-100">
        <ShieldX size={40} />
      </div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Restricted Area</h1>
      <p className="text-gray-400 mt-3 max-w-xs font-bold text-xs uppercase tracking-widest">Unauthorized Access Denied</p>
      <button onClick={() => supabase.auth.signOut()} className="mt-10 px-10 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] cursor-pointer">
        Return to Safety
      </button>
    </div>
  );
}
