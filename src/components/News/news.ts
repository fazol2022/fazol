interface News {
  id?;
  title?: string;
  link?: string;
  date?: Date | string;
  print?: string;
  portalId?: string;
  icon?: string;
  type?;
}

export type { News };
