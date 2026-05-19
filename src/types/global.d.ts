interface User {
  id?: string;
  name: string;
  email: string;
  age?: string;
  picture?: string;
  stream?: string;
  standered?: string;
  fv_subject?: string;
  is_verified: boolean;
  created_at?: string;
  verified_at: string;
}

interface Resource {
  title: string;
  description?: string;
  content: string;
  target?: string;
  type?: string;
  slug?: string;
  path: string;
  file_url?: string;
  thumbnail_url?: string;
  is_published?: boolean;
  view_count?: number;
  created_at?: string;
  updated_at?: string;
}
