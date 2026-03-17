// src/lib/eid-cards.ts
export type EidCardConfig = {
  id: string;
  image: string;
  rect: { top: string; left: string; width: string; height: string };
  color: string;
  align: 'left' | 'center' | 'right';
  fontFamily?: string;
};

export const EID_CARDS: EidCardConfig[] = [
  {
    id: '1',
    image: '/cards/1.png',
    rect: { top: '33.5%', left: '13.5%', width: '70%', height: '25%' },
    color: '#4B1D3F',
    align: 'center',
  },
  {
    id: '2',
    image: '/cards/2.png',
    rect: { top: '37%', left: '15%', width: '70%', height: '23%' },
    color: '#4B2C20',
    align: 'center',
  },
  {
    id: '3',
    image: '/cards/3.png',
    rect: { top: '32.5%', left: '16.5%', width: '67%', height: '25%' },
    color: '#000080',
    align: 'center',
  },
  {
    id: '4',
    image: '/cards/4.png',
    rect: { top: '69.5%', left: '15%', width: '70%', height: '25%' },
    color: '#423835',
    align: 'center',
  },
  {
    id: '5',
    image: '/cards/5.png',
    rect: { top: '24%', left: '19%', width: '62%', height: '25%' },
    color: '#FFFFFF',
    align: 'center',
  },
  {
    id: '6',
    image: '/cards/6.png',
    rect: { top: '31%', left: '16%', width: '68%', height: '24%' },
    color: '#FFFFFF',
    align: 'center',
  },
  {
    id: '7',
    image: '/cards/7.png',
    rect: { top: '61%', left: '34%', width: '27%', height: '30%' },
    color: '#063D31',
    align: 'center',
  },
  {
    id: '8',
    image: '/cards/8.png',
    rect: { top: '42.5%', left: '25%', width: '65%', height: '14.5%' },
    color: '#FFFFFF',
    align: 'left',
    fontFamily: 'var(--font-press-start), monospace',
  },
];