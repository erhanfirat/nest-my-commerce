export type OrderType = {
  id: number;
  totalPrice: number;
  userId: number;
  items: OrderItem[];
};

export type OrderItem = {
  productId: number;
  orderId: number;
  quantity: number;
  price: number;
  totalPrice: number;
};

export const ORDER_PATTERNS = {
  FIND_ALL: "Orders.FindAll",
  FIND_ONE: "Orders.FindOne",
  FIND_BY_EMAIL: "Orders.FindByEmail",
  CREATE: "Orders.Create",
  UPDATE: "Orders.Update",
  REMOVE: "Orders.Remove",
};

export const ORDER_KAFKA_EVENTS = {
  ORDER_CREATED: "Order.Created",
};
