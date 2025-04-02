export interface Type {
  id:number;
  type:string;
}

export interface Categories {
  [key: number]: string
}

export interface Article {
  id: number;
  url:string;
  main_article?: number;
  article_title?:string;
  article_description?:string;
  article_preview?:string;
  reading_time?:number;
  author?:string;
  next_article?:string;
  previous_article?:string;
  meta_description?:string;
  page_title?:string;
  type_article:number;
  html_code?:string;
  markdown?:string;
  creation_date?: Date;
  update_date?: Date;
  is_active?:number
}
