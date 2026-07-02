
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Enquiries
CREATE TYPE public.enquiry_status AS ENUM ('new','reviewing','quoted','booked','completed','declined');

CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  idea TEXT NOT NULL,
  style TEXT NOT NULL,
  placement TEXT,
  size TEXT,
  colour TEXT,
  is_cover_up BOOLEAN NOT NULL DEFAULT false,
  reference_image_url TEXT,
  preferred_dates TEXT,
  budget TEXT,
  medical_notes TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  status public.enquiry_status NOT NULL DEFAULT 'new',
  artist_notes TEXT,
  source TEXT NOT NULL DEFAULT 'enquiry_form',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiries"
  ON public.enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view enquiries"
  ON public.enquiries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update enquiries"
  ON public.enquiries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Flash designs
CREATE TYPE public.flash_status AS ENUM ('available','claimed','tattooed');

CREATE TABLE public.flash_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  style TEXT NOT NULL,
  size TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  description TEXT,
  status public.flash_status NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.flash_designs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.flash_designs TO authenticated;
GRANT ALL ON public.flash_designs TO service_role;

ALTER TABLE public.flash_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view flash designs"
  ON public.flash_designs FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage flash designs"
  ON public.flash_designs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Flash claims
CREATE TABLE public.flash_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flash_id UUID NOT NULL REFERENCES public.flash_designs(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  placement TEXT,
  preferred_dates TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.flash_claims TO anon, authenticated;
GRANT SELECT ON public.flash_claims TO authenticated;
GRANT ALL ON public.flash_claims TO service_role;

ALTER TABLE public.flash_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit flash claims"
  ON public.flash_claims FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view flash claims"
  ON public.flash_claims FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
