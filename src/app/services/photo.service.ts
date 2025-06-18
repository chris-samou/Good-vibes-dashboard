import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Photo, UnsplashApiResponse } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private http = inject(HttpClient);
  private readonly apiKey = environment.unsplash.apiKey;
  private readonly apiUrl = 'https://api.unsplash.com/search/photos';

  getPhotoForCity(city: string): Observable<Photo | null> {
    // Construct the URL to get one landscape photo related to the city
    const url = `${this.apiUrl}?query=${city}&per_page=1&orientation=landscape&client_id=${this.apiKey}`;

    return this.http.get<UnsplashApiResponse>(url).pipe(
      map((response) => response.results[0] || null), // Return the first photo or null
      catchError((error) => {
        console.error('Photo service error:', error);
        return of(null);
      })
    );
  }
}
