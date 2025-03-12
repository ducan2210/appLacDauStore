export type typeUser = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin' | 'staff';
  status: 'active' | 'inactive' | 'banned';
  created_at: Date;
  updated_at: Date;
  avatar: string;
};
