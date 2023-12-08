export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: number;
  created_at: string;
  updated_at: string;
  avatar: File | string;
  daysUntilUnlock: number;
  profile: {
    gender: number; // or whatever type 'gender' is
    // other profile properties...
  };
}
export interface Order {
  id: number;
  serial_number: string;
  username: string;
  note: string;
  order_at: string;
  total_price: number;
  status: string;
  order_id: number;
  created_at: string;
  updated_at: string;
}
