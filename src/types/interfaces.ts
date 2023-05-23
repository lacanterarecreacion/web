export interface Posts {
  Posts: Post[];
}

export interface Post {
  title: string;
  slug: {
    current: string;
  };
  body: string;
  mainImage: string;
  publishedAt: string; // "2023-03-10T03:03:00.000Z" - https://www.sanity.io/docs/datetime-type
  categories: Categories[];
}

export interface Categories {
  title: string;
  description?: string;
}

export interface Recursos {
  Recursos: Recurso[]
}

export interface Recurso {
  title: string;
  description?: string;
  slug: {
    current: string;
  };
  body: string;
  mainImage: string;
}

export interface QueHacemos {
  ItemHacemos: ItemHacemos[]
}

export interface ItemHacemos {
  title: string;
  description?: string;
  slug: {
    current: string;
  };
  body: string;
  mainImage: string;
}
