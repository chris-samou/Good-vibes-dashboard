// src/app/models/photo.model.ts
export interface UnsplashApiResponse {
  results: Photo[];
}

export interface Photo {
  urls: {
    regular: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}
