export interface ProductI {
  id: number;
  img: string;
  name: string;
  category: CategoryE;
  price: number;
  sale?: number;
  oldPrice?: number;
}

export enum CategoryE {
  any = "any",
  Sneakers = "Sneakers",
  Socks = "Socks",
}

export enum SaleFilterE {
  any = "any",
  Bestsellers = "Bestsellers",
}

export interface ProductFilterI {
  search: string;
  category: string | null;
  sale: boolean;
}