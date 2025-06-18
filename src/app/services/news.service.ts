import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewsApiResponse, NewsArticle } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  // --- CHANGE: This is now the path to YOUR Netlify function ---
  private readonly apiUrl = '/netlify/functions/get-news';

  getGoodNews(city: string): Observable<NewsArticle[] | null> {
    // We now pass the city as a query parameter to our own function
    const url = `${this.apiUrl}?city=${encodeURIComponent(city)}`;

    // The rest of the logic stays almost the same!
    return this.http.get<NewsApiResponse>(url).pipe(
      map((response) => {
        if (response.status === 'error') {
          console.error('News API error:', response.message);
          return []; // Return empty array on API error
        }
        return (response.articles || []).filter(
          (article) =>
            article.urlToImage &&
            !/death|funeral|coffin|cemetery/i.test(article.title)
        );
      }),
      catchError((error) => {
        console.error('Proxy function service error:', error);
        return of(null);
      })
    );
  }
}
