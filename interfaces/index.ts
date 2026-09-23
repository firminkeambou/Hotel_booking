import { Database } from '@/types/database.types';
export interface IUser {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  is_active: boolean;
  profile_picture: string;
  created_at: string;
}

/* export interface IHotel {
  id: string; // UUID
  created_at: string; // ISO 8601 timestamp string (TIMESTAMPTZ)
  name: string | null;
  star_class: number; // SMALLINT (1 to 5)
  description: string | null;
  city: string | null;
  address: string | null;
  email: string; // CITEXT
  phone: string | null;
  images: string[] | null;
  status: string | null;
  owner_id: number | null; // bigint
  amenities: string[] | null;
  starting_rent: number; // NUMERIC
} */
export type IHotel = Database['public']['Tables']['hotels']['Row'];
export type IRoom = Database['public']['Tables']['rooms']['Row'];
/* export interface IRoom {
  id: string; // UUID
  created_at: string; // ISO 8601 timestamp string (TIMESTAMPTZ)
  hotel_id: string | null; // UUID
  owner_id: number | null; // bigint
  name: string | null;
  description: string | null;
  room_type: string | null;
  rent_per_day: number; // NUMERIC
  status: string | null;
  amenities: string[] | null;
  images: string[] | null;
} */
