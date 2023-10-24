export interface Category {
  name: string;
  code: string;
}

export interface Price {
  size: string,
  price: string;
  currency: string;
}

export interface Coffee {
  id: string;
  name: Category['name'],
  description: string,
  roasted: string;
  imagelink_square: number;
  imagelink_portrait: number;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: 'Coffee' | 'Bean';
  index: number;
}
