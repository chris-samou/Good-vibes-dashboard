import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NewsApiResponse, NewsArticle } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private readonly apiKey = environment.newsApi.apiKey;
  private readonly apiUrl = 'https://newsapi.org/v2/everything';

  // We'll keep our positive keywords. These are what we WANT to find.
  private readonly goodNewsKeywords = [
    'breakthrough',
    'uplifting',
    'inspiring',
    'charity',
    'successful',
    'innovative',
    'community',
    'celebrates',
    'achieves',
    'volunteer',
    'discovery',
    'rescued',
    'donates',
    'launches',
    'art',
    'music festival',
  ].join(' OR ');

  // Exclusion list. If an article contains any of these words in its title or content, the API will not return it.
  private readonly badNewsKeywords = [
    'death',
    'died',
    'killed',
    'murder',
    'crime',
    'war',
    'attack',
    'disaster',
    'crash',
    'explosion',
    'protest',
    'riot',
    'scandal',
    'corruption',
    'disease',
    'pandemic',
    'outbreak',
    'crisis',
    'symptoms',
    'warning',
    'slump',
    'cuts',
    'charges',
    'arrested',
    'accused',
  ].join(' OR ');

  getGoodNews(city: string): Observable<NewsArticle[] | null> {
    const query = encodeURIComponent(
      `"${city}" AND (${this.goodNewsKeywords}) NOT (${this.badNewsKeywords})`
    );
    const url = `${this.apiUrl}?q=${query}&language=en&pageSize=10&sortBy=relevancy&apiKey=${this.apiKey}`;

    return this.http.get<NewsApiResponse>(url).pipe(
      map((response) => {
        return response.articles.filter(
          (article) =>
            article.urlToImage &&
            !/death|funeral|coffin|cemetery/i.test(article.title)
        );
      }),
      catchError((error) => {
        console.error('News service error:', error);
        return of(null);
      })
    );
  }
}
