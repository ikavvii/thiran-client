export interface Event {
  id: number;
  name: string;
  category: 'Technical' | 'Non-Technical';
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  prizePool: string;
  image: string;
}

export const events: Event[] = [
  {
    id: 1,
    name: 'HackTheBox',
    category: 'Technical',
    description: 'An intense cybersecurity and ethical hacking challenge. Break into virtual machines, solve CTF puzzles, and test your penetration testing skills in a timed competition.',
    date: 'February 23, 2026',
    time: '10:00 AM',
    venue: 'MCA Block, Lab 1',
    teamSize: '1-3',
    prizePool: '₹10,000',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'CodeBlack',
    category: 'Technical',
    description: 'Blind Coding — write code without seeing your screen! Test your muscle memory, logic, and coding intuition in this uniquely challenging programming event.',
    date: 'February 23, 2026',
    time: '11:30 AM',
    venue: 'MCA Block, Lab 2',
    teamSize: '1',
    prizePool: '₹7,500',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'WittyMinds',
    category: 'Non-Technical',
    description: 'A fun-filled quiz and brain teaser competition that tests your general knowledge, logical reasoning, and quick-thinking abilities across multiple rounds.',
    date: 'February 23, 2026',
    time: '2:00 PM',
    venue: 'MCA Block, Seminar Hall',
    teamSize: '2-3',
    prizePool: '₹5,000',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    name: 'BrandSprint',
    category: 'Non-Technical',
    description: 'A fast-paced branding and marketing challenge where teams create a complete brand identity — logo, tagline, pitch deck — for a fictional startup within a time limit.',
    date: 'February 23, 2026',
    time: '3:30 PM',
    venue: 'MCA Block, Seminar Hall',
    teamSize: '2-4',
    prizePool: '₹5,000',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
  },
];

export const categoryColors = {
  Technical: 'from-cosmic-purple to-cosmic-pink',
  'Non-Technical': 'from-cosmic-pink to-cosmic-cyan',
};
