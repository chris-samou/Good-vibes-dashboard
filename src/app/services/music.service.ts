import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from '../models/song.model';
import songsData from '../../../public/data/songs.json';

@Injectable({ providedIn: 'root' })
export class MusicService {
  private readonly songs: Song[] = songsData;

  constructor() {
    console.log('MusicService loaded with', this.songs.length, 'songs.');
  }

  getSongRecommendation(): Observable<Song> {
    const randomSong =
      this.songs[Math.floor(Math.random() * this.songs.length)];
    return of(randomSong);
  }
}
