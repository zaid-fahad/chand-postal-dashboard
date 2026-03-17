// src/components/auth/LoginForm.jsx

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldCheck } from 'lucide-react';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });

    if (error) {
      console.error('Login error:', error.message);
      alert('Failed to initialize Google login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 text-center">
        {/* Clean Icon Header */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-6 border border-blue-100">
          <ShieldCheck className="text-blue-600" size={40} />
        </div>

        <h1 className="text-3xl font-black text-gray-900 tracking-tighter italic">
          CHAND <span className="text-blue-600">ADMIN</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 mb-10 font-medium">
          Management Portal for Chand Projects
        </p>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="group relative w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 text-gray-700 font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!loading && (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z" />
              <path fill="#34A853" d="M16.04 18.013c-1.09.693-2.43 1.077-4.04 1.077-2.618 0-4.88-1.764-5.668-4.136L2.306 18.07C4.264 21.302 7.844 24 12 24c3.273 0 6.055-1.09 8.051-2.943l-4.01-3.044z" />
              <path fill="#4285F4" d="M23.49 12.275c0-.866-.077-1.701-.22-2.51H12v4.747h6.44c-.28 1.516-1.137 2.807-2.422 3.664l4.01 3.044c2.345-2.162 3.697-5.343 3.697-8.945z" />
              <path fill="#FBBC05" d="M5.266 14.235a7.077 7.077 0 0 1-.357-2.235c0-.78.128-1.53.357-2.235L1.24 6.65A11.962 11.962 0 0 0 0 12c0 1.92.445 3.73 1.24 5.35l4.026-3.115z" />
            </svg>
          )}
          <span className="text-sm uppercase tracking-widest font-black">
            {loading ? 'Connecting...' : 'Continue with Google'}
          </span>
        </button>

        <div className="mt-8 pt-8 border-t border-gray-50">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}