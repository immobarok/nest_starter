export class CategoryResponseDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}