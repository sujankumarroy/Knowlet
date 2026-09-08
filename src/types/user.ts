export interface UserBase {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface UserProfile {
  age?: number;
  picture?: string;
  stream?: string;
  standard?: string;
  fav_subject?: string;
}

export interface UserMeta {
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User extends UserBase, UserProfile, UserMeta {}

export interface PublicUser extends Pick<
  User,
  "id" | "name" | "username" | "picture"
> {}

export type UserRole = "user" | "admin";
