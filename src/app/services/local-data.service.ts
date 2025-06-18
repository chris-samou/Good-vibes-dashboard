import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from '../models/song.model';
import { Quote } from '../models/quote.model';
import songsData from '../../../public/data/songs.json';
import quotesData from '../../../public/data/quotes.json';

@Injectable({ providedIn: 'root' })
export class LocalDataService {
  private readonly songs: Song[] = songsData;
  private readonly quotes: Quote[] = quotesData;

  constructor() {
    console.log(
      `LocalDataService loaded with ${this.songs.length} songs and ${this.quotes.length} quotes.`
    );
  }

  getRandomSong(): Observable<Song> {
    const randomSong =
      this.songs[Math.floor(Math.random() * this.songs.length)];
    return of(randomSong);
  }

  getRandomQuote(): Observable<Quote> {
    const randomQuote =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
    return of(randomQuote);
  }
}
