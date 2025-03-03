export type typeNotification = {
  notification_id: number;
  user_id: number;
  order_id?: number | null;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  status: 'unread' | 'read';
  created_at: Date;
  updated_at: Date;
  read_at?: Date | null;
  order?: {
    order_id: number;
    total_amount: string;
    status: string;
  } | null;
  source: 'personal' | 'global';
};
