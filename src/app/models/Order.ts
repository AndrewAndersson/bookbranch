export interface CheckoutItem {
  id: string;
  price: string;
  name: string;
  sum: number;
  count: number;
}

export interface Order {
  name: string;
  phone: string;
  email: string;
  status: string;
  items: CheckoutItem[];
}
