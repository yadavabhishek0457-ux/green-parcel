export interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: string;
  mrp: number;
  greenPrice: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Potato (Jyoti)',
    category: 'Vegetables',
    quantity: '1 kg',
    mrp: 28,
    greenPrice: 22,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '2',
    name: 'Onion (Nashik)',
    category: 'Vegetables',
    quantity: '1 kg',
    mrp: 35,
    greenPrice: 28,
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '3',
    name: 'Fresh Red Tomatoes',
    category: 'Vegetables',
    quantity: '500g',
    mrp: 40,
    greenPrice: 30,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '4',
    name: 'Spinach (Palak)',
    category: 'Leafy Greens',
    quantity: '250g',
    mrp: 20,
    greenPrice: 15,
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '5',
    name: 'Coriander',
    category: 'Leafy Greens',
    quantity: '100g',
    mrp: 15,
    greenPrice: 10,
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '6',
    name: 'Banana (Robusta)',
    category: 'Fruits',
    quantity: '1 Dozen',
    mrp: 80,
    greenPrice: 65,
    imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '7',
    name: 'Apple (Shimla)',
    category: 'Fruits',
    quantity: '1 kg',
    mrp: 220,
    greenPrice: 180,
    imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '8',
    name: 'Broccoli',
    category: 'Exotic',
    quantity: '500g',
    mrp: 120,
    greenPrice: 90,
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '9',
    name: 'Avocado',
    category: 'Exotic',
    quantity: '1 unit',
    mrp: 150,
    greenPrice: 120,
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '10',
    name: 'Carrot (Local)',
    category: 'Vegetables',
    quantity: '500g',
    mrp: 35,
    greenPrice: 25,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '11',
    name: 'Cauliflower',
    category: 'Vegetables',
    quantity: '1 unit',
    mrp: 50,
    greenPrice: 40,
    imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '21',
    name: 'Weekly Veggie Box',
    category: 'Combos',
    quantity: '5 kg Assorted',
    mrp: 500,
    greenPrice: 449,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '18',
    name: 'Pomegranate',
    category: 'Fruits',
    quantity: '1 kg',
    mrp: 200,
    greenPrice: 150,
    imageUrl: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '19',
    name: 'Watermelon',
    category: 'Fruits',
    quantity: '1 unit',
    mrp: 80,
    greenPrice: 60,
    imageUrl: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '20',
    name: 'Papaya',
    category: 'Fruits',
    quantity: '1 unit',
    mrp: 70,
    greenPrice: 50,
    imageUrl: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=500&q=80',
  }
];
