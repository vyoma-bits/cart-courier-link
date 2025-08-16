import { Product } from '@/contexts/CartContext';
import headphonesImg from '@/assets/headphones.jpg';
import smartphoneImg from '@/assets/smartphone.jpg';
import laptopImg from '@/assets/laptop.jpg';
import smartwatchImg from '@/assets/smartwatch.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    image: headphonesImg,
    stock: 15
  },
  {
    id: '2',
    name: 'Latest Smartphone',
    price: 899.99,
    description: 'Cutting-edge smartphone with advanced camera system, lightning-fast processor, and all-day battery life.',
    image: smartphoneImg,
    stock: 8
  },
  {
    id: '3',
    name: 'Professional Laptop',
    price: 1299.99,
    description: 'High-performance laptop designed for professionals and creators. Powerful specs in a sleek, portable design.',
    image: laptopImg,
    stock: 12
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    price: 399.99,
    description: 'Advanced fitness tracking, health monitoring, and smart features. Your perfect workout companion.',
    image: smartwatchImg,
    stock: 20
  }
];