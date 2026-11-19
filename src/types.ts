export type SausageType = 'mediana' | 'polaca';

export interface Sausage {
  id: SausageType;
  name: string;
  badge: string;
  description: string;
  price: number;
  highlight: string;
}

export interface Topping {
  id: string;
  name: string;
  description: string;
  price: number;
  isExclusive?: boolean;
  category: 'especial' | 'crunchy' | 'extra';
}

export interface Sauce {
  id: string;
  name: string;
  emoji: string;
  color: string;
  secondaryColor?: string;
  description: string;
  flavorProfile: string;
  heatLevel: 0 | 1 | 2 | 3;
}

export interface CustomHotDog {
  id: string;
  sausage: Sausage;
  toppings: Topping[];
  sauces: Sauce[];
  specialInstructions?: string;
  price: number;
  quantity: number;
}

export interface HouseSpecial {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  sausageId: SausageType;
  toppingIds: string[];
  sauceIds: string[];
  price: number;
  badge?: string;
}

export interface ExtraItem {
  id: string;
  name: string;
  category: 'bebida' | 'acompañamiento';
  description: string;
  price: number;
  iconName: string;
}

export interface CartItem {
  id: string;
  type: 'custom_dog' | 'special_dog' | 'extra';
  title: string;
  subtitle: string;
  details: {
    bread: string;
    sausage?: string;
    toppings?: string[];
    sauces?: string[];
    instructions?: string;
  };
  unitPrice: number;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
  deliveryType: 'delivery' | 'pickup';
  notes: string;
}
