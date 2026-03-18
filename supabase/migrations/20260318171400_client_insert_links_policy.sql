-- Allow clients to initiate connections with professionals by inserting their own links
CREATE POLICY "Clients can insert links"
  ON public.professional_client_links FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());
