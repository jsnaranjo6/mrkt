import { Trophy, Briefcase, TrendingUp, Zap, Star } from 'lucide-react';

export const categories = [
  { id: 'deportes', name: 'Deportes', icon: Trophy, count: 45, color: '#DC2626' },
  { id: 'politica', name: 'Política', icon: Briefcase, count: 32, color: '#DC2626' },
  { id: 'economia', name: 'Economía', icon: TrendingUp, count: 28, color: '#DC2626' },
  { id: 'tecnologia', name: 'Tecnología', icon: Zap, count: 19, color: '#DC2626' },
  { id: 'tendencias', name: 'Tendencias', icon: Star, count: 41, color: '#DC2626' }
];

export const initialMarkets = {
  deportes: [
    {
      id: 1,
      title: 'Ecuador clasificará al Mundial 2026',
      yesPrice: 0.42,
      volume: 125400,
      endDate: '2026-03-15',
      featured: true
    },
    {
      id: 2,
      title: 'Barcelona SC ganará la LigaPro 2026',
      yesPrice: 0.47,
      volume: 156300,
      endDate: '2026-11-30',
      featured: true
    },
    {
      id: 3,
      title: 'Liga de Quito quedará en top 3',
      yesPrice: 0.65,
      volume: 89200,
      endDate: '2026-11-30',
      featured: false
    }
  ],
  politica: [
    {
      id: 4,
      title: 'Cambio de gabinete antes de junio',
      yesPrice: 0.55,
      volume: 89200,
      endDate: '2026-06-01',
      featured: true
    },
    {
      id: 5,
      title: 'Nuevas elecciones en 2026',
      yesPrice: 0.31,
      volume: 234500,
      endDate: '2026-12-31',
      featured: false
    }
  ],
  economia: [
    {
      id: 6,
      title: 'Inflación superará 5% este año',
      yesPrice: 0.31,
      volume: 67800,
      endDate: '2026-12-31',
      featured: true
    },
    {
      id: 7,
      title: 'Precio del petróleo sobre $100',
      yesPrice: 0.58,
      volume: 342100,
      endDate: '2026-06-30',
      featured: true
    }
  ],
  tecnologia: [
    {
      id: 8,
      title: 'Bitcoin superará $150,000 en 2026',
      yesPrice: 0.68,
      volume: 542100,
      endDate: '2026-12-31',
      featured: true
    },
    {
      id: 9,
      title: 'Tesla lanzará modelo bajo $25k',
      yesPrice: 0.39,
      volume: 234500,
      endDate: '2026-12-31',
      featured: false
    }
  ],
  tendencias: [
    {
      id: 10,
      title: 'Nuevo récord de turistas en Galápagos',
      yesPrice: 0.52,
      volume: 45600,
      endDate: '2026-12-31',
      featured: true
    }
  ]
};
