export interface Image {
  alt: string;
  url: string;
  width: number;
  height: number;
  tag: string | null;
}

export interface Tag {
  title: string;
  slug: string;
  id: number;
}

export interface PostFrontMatterResponse {
  title: string;
  slug: string;
  created_at: string | Date;
  summary: string;
  tags: Tag[];
  type: string;
}

export interface PostResponse extends PostFrontMatterResponse {
  featured_image: Image[];
  body: string;
}

export interface PostFrontMatter extends PostFrontMatterResponse {
  created_at: Date;
}

export interface Post extends PostResponse {
  created_at: Date;
}

export interface Timing {
  location: string;
  reached_at: string;
}

export interface Walk {
  title: string;
  created_at: string;
  body: string;
  summary: string;
  mountains: Tag[]
  bags: {
    mountain: Tag;
    designations: Tag;
    number: number;
  }[];
  meta: {
    timings: Timing[];
    total_walking_time: string;
    strava: string;
  }[];
}

export interface BookFrontMatter {
  title: string;
  slug: string;
  created_at: Date;
  summary: never;
  writer: string;
  publication_year: number;
  length: number | null;
  rating: number;
  tags: never;
  type: string;
}

export interface Book extends BookFrontMatter {
  date_read: string | Date;
  body: string;
  medium: string;
  featured_image: Image[];
}