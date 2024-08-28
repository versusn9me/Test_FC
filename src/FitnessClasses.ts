interface FitnessClass {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string; 
}

const FitnessClasses: FitnessClass[] = [
  {
    id: 1,
    name: 'Йога для начинающих',
    description: 'Расслабляющая йога для новичков',
    duration: '60 мин',
    price: '500 руб.',
    category: 'Групповые занятия',
    
  },
  {
    id: 2,
    name: 'Силовая тренировка',
    description: 'Индивидуальная силовая тренировка',
    duration: '45 мин',
    price: '700 руб.',
    category: 'Персональные тренировки',
  },
  {
    id: 3,
    name: 'Зумба',
    description: 'Энергичная танцевальная фитнес-программа',
    duration: '60 мин',
    price: '600 руб.',
    category: 'Групповые занятия',
  },
  {
    id: 4,
    name: 'Карате',
    description: 'Тренировки по карате для всех возрастов',
    duration: '1 час',
    price: '800 руб.',
    category: 'Боевые искусства',
  },
  {
    id: 5,
    name: 'Бокс',
    description: 'Тренировки по боксу для начинающих и опытных',
    duration: '1 час',
    price: '900 руб.',
    category: 'Боевые искусства',
  },
];

export { FitnessClasses };