import type { DateInput } from "@fullcalendar/core";

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
  body: object;
  mainImage: string;
}

export interface Events {
  calendarEvents: Event[];
}

export interface Image {
  secure_url: string;
}

export interface Event {
  id?: string;
  title?: string;
  color?: string;
  end: DateInput;
  start: DateInput;
  extendedProps: ExtendedProps;
}

export interface ExtendedProps {
  link?: string;
  description?: string;
  image?: Image;
}