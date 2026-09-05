export type ResourceType = "note" | "pyq" | "important_question" | "pdf";

export type Mode =
  | "normal"
  | "quiz"
  | "study"
  | "short"
  | "explain"
  | "create_resource";

export type Action = "create" | "update";

export interface Details {
  title: string;
  description: string;
  level?: string;
  subject?: string;
  paper?: string;
  target?: string;
  type?: string;
  slug?: string;
  path?: string;
}

export interface Resource {
  id?: string;
  title: string;
  description?: string;
  content: string;
  level?: string;
  subject?: string;
  paper?: string;
  target?: string;
  type?: string;
  path?: string;
  slug?: string;
  file_url?: string;
  thumbnail_url?: string;
  is_published?: boolean;
  view_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ResourceInfo {
  id: string;
  title: string;
  description: string;
  path: string;
  created_at: string;
}

export interface BriefResourceInfo {
  id: string;
  target: string;
  path: string;
}

export interface Bookmark {
  id: string;
  created_at: string;
  resource: ResourceInfo;
}

export interface History {
  id: string;
  created_at: string;
  resource: ResourceInfo;
}

export interface Likes {
  id: string;
  created_at: string;
  resource: ResourceInfo;
}
