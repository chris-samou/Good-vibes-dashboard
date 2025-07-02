import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewsApiResponse, NewsArticle } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/get-news';

  getGoodNews(city: string): Observable<NewsArticle[] | null> {
    const url = `${this.apiUrl}?city=${encodeURIComponent(city)}`;
    return this.http.get<NewsApiResponse>(url).pipe(
      map((response) => {
        if (response.status === 'error') {
          console.error('News API error:', response.message);
          return [];
        }

        return (response.articles || []).filter(
          (article) =>
            article.image &&
            !/death|funeral|coffin|cemetery|crime|war|attack|disaster|scandal/i.test(
              article.title
            )
        );
      }),
      catchError((error) => {
        console.error('Proxy function service error:', error);
        return of(null);
      })
    );
  }
}
