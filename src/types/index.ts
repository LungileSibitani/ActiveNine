export interface Business {
  id: string;
  name: string;
  owner: string;
  description: string;
  category: string;
  location: string;
  township: string;
  phone: string;
  email?: string;
  products: Product[];
  services: Service[];
  images: string[];
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  isOnline: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  images: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  duration: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  township: string;
  isBusiness: boolean;
  businessId?: string;
}

export interface FinancialService {
  id: string;
  name: string;
  type: 'loan' | 'insurance' | 'savings' | 'payment';
  provider: string;
  description: string;
  requirements: string[];
  maxAmount?: number;
  interestRate?: number;
  term?: string;
}