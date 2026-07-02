
-- Restrict SECURITY DEFINER function execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- Add admin DELETE policy on enquiries
CREATE POLICY "Admins can delete enquiries"
  ON public.enquiries
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Add admin UPDATE and DELETE policies on flash_claims
CREATE POLICY "Admins can update flash claims"
  ON public.flash_claims
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete flash claims"
  ON public.flash_claims
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tighten permissive INSERT policies: require consent + basic field constraints
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON public.enquiries;
CREATE POLICY "Anyone can submit enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent = true
    AND length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(idea) BETWEEN 1 AND 5000
    AND length(style) BETWEEN 1 AND 100
    AND status = 'new'
    AND source = 'enquiry_form'
    AND artist_notes IS NULL
  );

DROP POLICY IF EXISTS "Anyone can submit flash claims" ON public.flash_claims;
CREATE POLICY "Anyone can submit flash claims"
  ON public.flash_claims
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent = true
    AND length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND flash_id IS NOT NULL
  );
