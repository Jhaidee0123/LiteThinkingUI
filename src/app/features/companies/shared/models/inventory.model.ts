export interface Inventory {
  id: string;
  name: string;
  description: string;
  articles: Article[];
}

export interface Article {
  name: string;
  quantity: number;
}
