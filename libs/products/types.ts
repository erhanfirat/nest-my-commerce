export const PRODUCT_PATTERNS = {
  FIND_ALL: "Products.FindAll",
  FIND_ONE: "Products.FindOne",
  FIND_BY_EMAIL: "Products.FindByEmail",
  CREATE: "Products.Create",
  UPDATE: "Products.Update",
  REMOVE: "Products.Remove",
};

export type ProductImageType = {
  id: number;
  url: string;
};

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImageType[];
  stock: number;
};
