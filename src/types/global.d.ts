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

type AuthOtpType =
  | "signup"
  | "signin"
  | "set_password"
  | "reset_password"
  | "change_password"
  | "verify_email";
