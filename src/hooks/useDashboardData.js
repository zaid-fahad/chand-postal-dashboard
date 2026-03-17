// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';

// export function useDashboardData(isAuthenticated) {
//   const [data, setData] = useState({ profiles: [], totalMessages: 0, totalWishes: 0 });
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//   if (!isAuthenticated) return;
//   setLoading(true);
  
//   try {
//     // We add .error to catch hidden issues
//     const { data: profiles, error: pError } = await supabase
//       .from('profiles')
//       .select(`
//         *,
//         received_messages:messages!recipient_id(*),
//         sent_wishes:wishes!sender_id(*)
//       `);

//     const { count: mCount, error: mError } = await supabase
//       .from('messages')
//       .select('*', { count: 'exact', head: true });

//     if (pError || mError) {
//       console.error("Supabase Error:", pError || mError);
//     }

//     setData({
//       profiles: profiles || [],
//       totalMessages: mCount || 0,
//       totalWishes: 0 // Fetch wishes count similarly if needed
//     });
//   } catch (err) {
//     console.error("System Error:", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => { fetchData(); }, [isAuthenticated]);

//   return { data, loading, refresh: fetchData };
// }

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useDashboardData(isAuthenticated) {
  const [data, setData] = useState({ 
    profiles: [], 
    totalMessages: 0, 
    cardRankings: [], 
    stampRankings: [],
    chartData: [] 
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    
    const { data: messages } = await supabase.from('messages').select('*');
    const { data: profiles } = await supabase.from('profiles').select('*, received_messages:messages!recipient_id(*)');

    // 1. Process Card/Stamp Rankings
    const cardMap = {};
    const stampMap = {};
    const dateMap = {};

    messages?.forEach(m => {
      // Asset Stats
      try {
        const content = JSON.parse(m.content);
        if (content.type === 'eid-card') {
          cardMap[content.cardId] = (cardMap[content.cardId] || 0) + 1;
          stampMap[content.stampId] = (stampMap[content.stampId] || 0) + 1;
        }
      } catch (e) { /* Regular text message */ }

      // Chart Stats (by date)
      const date = new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    setData({
      profiles: profiles || [],
      totalMessages: messages?.length || 0,
      cardRankings: Object.entries(cardMap).map(([id, count]) => ({ id, count })).sort((a,b) => b.count - a.count),
      stampRankings: Object.entries(stampMap).map(([id, count]) => ({ id, count })).sort((a,b) => b.count - a.count),
      chartData: Object.entries(dateMap).map(([name, messages]) => ({ name, messages })).slice(-7)
    });
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [isAuthenticated]);
  return { data, loading, refresh: fetchData };
}