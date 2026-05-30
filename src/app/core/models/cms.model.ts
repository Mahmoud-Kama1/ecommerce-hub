export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HomepageContent {
  banners: Banner[];
  featuredCategoryIds: string[];
  featuredProductIds: string[];
}
