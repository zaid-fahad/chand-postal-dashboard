// src/components/dashboard/ActivityModal.jsx

import { X, Mail, Clock, User, Image as ImageIcon } from 'lucide-react';
import { EID_CARDS } from '../../lib/eid-cards';
import { STAMPS } from '../../lib/stamps';

export default function ActivityModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-white/60 backdrop-blur-md animate-in fade-in duration-200" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div className="flex items-center gap-4">
            {user.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.full_name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                <User size={24} />
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-tighter">
                  User Logs
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 leading-tight">{user.full_name || user.username}</h3>
              <p className="text-sm text-gray-400 font-medium">{user.email}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2.5 hover:bg-white rounded-full text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-200 transition-all cursor-pointer">
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-8 overflow-y-auto">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h4 className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Mail size={14} className="text-blue-500" /> Received Content
              </h4>
            </div>

            {user.received_messages?.length > 0 ? (
              <div className="space-y-6">
                {user.received_messages.map(m => (
                  <MessageCard key={m.id} item={m} />
                ))}
              </div>
            ) : (
              <EmptyState message="No activity logs found." />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function MessageCard({ item }) {
  let cardData = null;
  try {
    const parsed = JSON.parse(item.content);
    if (parsed.type === 'eid-card') {
      cardData = {
        ...parsed,
        cardConfig: EID_CARDS.find(c => c.id === parsed.cardId),
        stampConfig: STAMPS.find(s => s.id === parsed.stampId)
      };
    }
  } catch (e) {
    cardData = null;
  }

  return (
    <div className="p-6 rounded-[2.5rem] border border-gray-100 bg-white shadow-sm hover:border-blue-100 transition-all">
      {/* Sender Info */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          From: {item.sender_name || 'Anonymous'}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
          <Clock size={12} />
          {new Date(item.created_at).toLocaleDateString()}
        </div>
      </div>

      {cardData ? (
        <div className="space-y-6">
          {/* Visual Container */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            
            {/* Eid Card - 4:5 Ratio (Portrait) */}
            {cardData.cardConfig && (
              <div className="relative w-full sm:w-1/2 aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner">
                <img 
                  src={cardData.cardConfig.image} 
                  alt="Eid Card" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/80 backdrop-blur-md rounded-lg text-[9px] text-gray-900 font-black uppercase border border-gray-100">
                  Card {cardData.cardId}
                </div>
              </div>
            )}

            {/* Stamp - 4:2 Ratio (Wide) */}
            {cardData.stampConfig && (
              <div className="w-full sm:w-1/2 flex flex-col gap-4">
                <div className="relative aspect-[4/2] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
                  <img 
                    src={cardData.stampConfig.image} 
                    alt="Stamp" 
                    className="w-full h-full object-contain p-2" 
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-blue-600 rounded-lg text-[8px] text-white font-black uppercase">
                    Stamp {cardData.stampId}
                  </div>
                </div>
                
                {/* Visual Placeholder to balance the 4:5 height */}
                <div className="hidden sm:block flex-1 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100" />
              </div>
            )}
          </div>

          {/* Message Text Area */}
          <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-100">
            <p 
              className="text-gray-900 font-medium leading-relaxed italic text-center" 
              style={{ 
                fontSize: cardData.fontSize || '18px',
                fontFamily: cardData.cardConfig?.fontFamily || 'inherit' 
              }}
            >
              “{cardData.text}”
            </p>
          </div>
        </div>
      ) : (
        /* Default Text View */
        <p className="text-sm leading-relaxed text-gray-700 font-medium p-2">
          {item.content}
        </p>
      )}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="py-16 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-center bg-gray-50/20">
      <p className="text-gray-400 text-xs font-bold italic tracking-wide">{message}</p>
    </div>
  );
}