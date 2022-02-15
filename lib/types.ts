export interface Image {
  alt: string;
  url: string;
  width: number;
  height: number;
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
    timings: {
      location: string;
      reached_at: string;
    }[]
  };
}