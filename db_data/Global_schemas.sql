-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.user_profiles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  email text NOT NULL UNIQUE,
  role text,
  is_active boolean,
  profile_picture text,
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.hotels (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  star_class smallint NOT NULL CHECK (star_class >= 1 AND star_class <= 5),
  description text,
  city text,
  address text,
  email USER-DEFINED NOT NULL UNIQUE,
  phone text,
  images ARRAY,
  status text,
  owner_id bigint,
  amenities ARRAY,
  starting_rent numeric NOT NULL CHECK (starting_rent >= 0::numeric),
  CONSTRAINT hotels_pkey PRIMARY KEY (id),
  CONSTRAINT hotels_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.rooms (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  hotel_id uuid,
  owner_id bigint,
  name text,
  description text,
  room_type text,
  rent_per_day numeric NOT NULL CHECK (rent_per_day >= 0::numeric),
  status text,
  amenities ARRAY,
  images ARRAY,
  CONSTRAINT rooms_pkey PRIMARY KEY (id),
  CONSTRAINT rooms_hotel_id_fkey FOREIGN KEY (hotel_id) REFERENCES public.hotels(id),
  CONSTRAINT rooms_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.user_profiles(id)
);