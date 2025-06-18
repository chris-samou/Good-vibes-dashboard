import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private readonly apiKey = environment.openWeather.apiKey;
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  getWeather(city: string): Observable<WeatherData | null> {
    // Construct the full API URL with parameters.
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;

    return this.http.get<WeatherData>(url).pipe(
      catchError((error) => {
        console.error('Weather service error:', error);
        // Return an observable of 'null' so the app doesn't crash.
        return of(null);
      })
    );
  }
}
