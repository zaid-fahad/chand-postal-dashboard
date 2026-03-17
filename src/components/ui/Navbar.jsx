import { supabase, ADMIN_EMAIL } from '../../lib/supabase';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 text-white">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">CHAND ADMIN</h1>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Portal v2.0</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-xs font-bold text-slate-900">{ADMIN_EMAIL}</p>
          <p className="text-[10px] text-emerald-500 font-medium">System Administrator</p>
        </div>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
          title="Sign Out"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}