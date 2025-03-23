// src/types.ts
export interface Product {
  quantity: number;
  id: number;
  title: string;
  price: number;
  images: string[];
  name: string; // Add name property
  image: string; // Add image property
}