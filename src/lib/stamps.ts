//src/lib/stamps.ts

export type StampConfig = {
  id: string;
  image: string;
  nameRect: { top: string; left: string; width: string; height: string };
  dateRect: { top: string; left: string; width: string; height: string };
  messageRect?: { top: string; left: string; width: string; height: string };
  color: string;
  fontFamily?: string;
};

export const STAMPS: StampConfig[] = [
  {
    id: '1',
    image: '/stamps/1.png',
    nameRect: { top: '61%', left: '59%', width: '38%', height: '10%' },
    dateRect: { top: '88%', left: '62%', width: '38%', height: '10%' },
    messageRect: { top: '25%', left: '8%', width: '42%', height: '65%' },
    color: '#3b2f2f',
  },
  {
    id: '2',
    image: '/stamps/2.png',
    nameRect: { top: '61%', left: '59%', width: '38%', height: '10%' },
    dateRect: { top: '88%', left: '62%', width: '38%', height: '10%' },
    messageRect: { top: '25%', left: '8%', width: '42%', height: '65%' },
    color: '#3b2f2f',
  },
  {
    id: '3',
    image: '/stamps/3.png',
    nameRect: { top: '61%', left: '59%', width: '38%', height: '10%' },
    dateRect: { top: '88%', left: '62%', width: '38%', height: '10%' },
    messageRect: { top: '25%', left: '8%', width: '42%', height: '65%' },
    color: '#3b2f2f',
  },
  {
    id: '4',
    image: '/stamps/4.png',
    nameRect: { top: '61%', left: '59%', width: '38%', height: '10%' },
    dateRect: { top: '88%', left: '62%', width: '38%', height: '10%' },
    messageRect: { top: '25%', left: '8%', width: '42%', height: '65%' },
    color: '#3b2f2f',
  },
  {
    id: '5',
    image: '/stamps/5.png',
    nameRect: { top: '61%', left: '59%', width: '38%', height: '10%' },
    dateRect: { top: '88%', left: '62%', width: '38%', height: '10%' },
    messageRect: { top: '25%', left: '8%', width: '42%', height: '65%' },
    color: '#3b2f2f',
  },
];