import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;

  productCount?: number;

  products?: any[];
}