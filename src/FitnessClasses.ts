
interface FitnessClass {
    id: number;
    name: string;
    description: string;
    duration: string;
    price: string;
    category: string;
    imageUrl: string; 
  }
  
  const FitnessClasses: FitnessClass[] = [
    {
      id: 1,
      name: 'Йога для начинающих',
      description: 'Расслабляющая йога для новичков',
      duration: '60 мин',
      price: '500 руб.',
      category: 'Групповые занятия',
      imageUrl: 'https://www.example.com/yoga-for-beginners.jpg', // Replace with actual image URLs
    },
    {
      id: 2,
      name: 'Силовая тренировка',
      description: 'Индивидуальная силовая тренировка',
      duration: '45 мин',
      price: '700 руб.',
      category: 'Персональные тренировки',
      imageUrl: 'https://www.example.com/strength-training.jpg', 
    },
    {
      id: 3,
      name: 'Зумба',
      description: 'Энергичная танцевальная фитнес-программа',
      duration: '60 мин',
      price: '600 руб.',
      category: 'Групповые занятия',
      imageUrl: 'https://www.example.com/zumba.jpg', 
    },
    {
      id: 4,
      name: 'Карате',
      description: 'Тренировки по карате для всех возрастов',
      duration: '1 час',
      price: '800 руб.',
      category: 'Боевые искусства',
      imageUrl: 'https://www.example.com/karate.jpg', 
    },
    {
      id: 5,
      name: 'Бокс',
      description: 'Тренировки по боксу для начинающих и опытных',
      duration: '1 час',
      price: '900 руб.',
      category: 'Боевые искусства',
      imageUrl: 'https://furman.top/uploads/posts/2023-08/1692135542_furman-top-p-boks-estetika-fon-oboi-40.jpg', 
    },
  ];
  
  export { FitnessClasses };