import { Hash } from 'lucide-react';
import { EID_CARDS } from '../../lib/eid-cards';
import { STAMPS } from '../../lib/stamps';

export default function RankList({ title, icon, items, type }) {
  const getAssetImage = (id) => {
    if (type === 'card') return EID_CARDS.find(c => c.id === id)?.image;
    if (type === 'stamp') return STAMPS.find(s => s.id === id)?.image;
    return null;
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col h-full">
      {/* Header */}
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-2">
        <span className="p-2 bg-gray-50 rounded-xl text-blue-600">{icon}</span> 
        {title}
      </h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {items.slice(0, 4).length > 0 ? (
          items.slice(0, 4).map((item, i) => (
            <div 
              key={i} 
              className="group flex flex-col p-4 bg-gray-50/50 rounded-[2rem] border border-gray-50 transition-all hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5"
            >
              {/* Image Preview Container */}
              <div className={`relative mb-4 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-inner flex items-center justify-center ${
                type === 'card' ? 'aspect-[4/5]' : 'aspect-[4/2]'
              }`}>
                <img 
                  src={getAssetImage(item.id)} 
                  alt="" 
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                    type === 'card' ? 'object-cover' : 'object-contain p-2'
                  }`}
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded-full text-[8px] text-white font-black uppercase">
                  #{item.id}
                </div>
              </div>

              {/* Label & Stats */}
              <div className="flex justify-between items-end px-1">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                    Total Uses
                  </p>
                  <p className="text-2xl font-black text-gray-900 tracking-tighter">
                    {item.count}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover:text-blue-500 transition-colors border border-gray-50">
                  <Hash size={14} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-12 text-gray-300">
             <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-2">
               <ImageIcon size={20} />
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest italic">Waiting for data</p>
          </div>
        )}
      </div>
    </div>
  );
}