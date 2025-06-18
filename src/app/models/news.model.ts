// src/app/models/news.model.ts
export interface NewsArticle {
  title: string;
  url: string;
  source: {
    name: string;
  };
  urlToImage: string | null;
}

export interface NewsApiResponse {
  status?: string;
  articles?: NewsArticle[];
  message?: string;
}
