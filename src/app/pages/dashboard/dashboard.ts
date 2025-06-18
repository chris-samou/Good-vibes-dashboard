import {
  Component,
  OnInit,
  signal,
  inject,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';

import { LocationSelectorComponent } from '../../components/location-selector/location-selector';
import { InfoCardComponent } from '../../components/info-card/info-card';
import { WeatherService } from '../../services/weather.service';
import { NewsService } from '../../services/news.service';
import { MusicService } from '../../services/music.service';
import { WeatherData } from '../../models/weather.model';
import { NewsArticle } from '../../models/news.model';
import { Song } from '../../models/song.model';

register();

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LocationSelectorComponent,
    InfoCardComponent,
    SafeUrlPipe,
  ],
  templateUrl: './dashboard.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private weatherService = inject(WeatherService);
  private newsService = inject(NewsService);
  private musicService = inject(MusicService);

  weather = signal<WeatherData | null>(null);
  news = signal<NewsArticle[] | null>(null);
  song = signal<Song | null>(null);

  weatherLoading = signal(true);
  newsLoading = signal(true);
  songLoading = signal(true);
  weatherError = signal(false);
  newsError = signal(false);
  isNewsReady = signal(false);

  private dataLoadCounter = 0;

  ngOnInit(): void {
    this.handleDataLoad('London');
    this.loadSong(false);
  }

  ngAfterViewInit(): void {
    gsap.from('.main-headline', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });
    gsap.from('.sub-headline', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  onLocationSelected(city: string): void {
    console.log('Parent component received city:', city);
    const tl = gsap.timeline();
    // tl.to('.dashboard-grid .info-card-wrapper', {
    tl.to('.weather-news-card', {
      duration: 0.3,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'power2.in',
      onComplete: () => this.handleDataLoad(city),
    });
  }

  handleDataLoad(city: string): void {
    this.weatherLoading.set(true);
    this.isNewsReady.set(false);
    this.newsLoading.set(true);
    this.weatherError.set(false);
    this.newsError.set(false);

    // Reset our counter every time we load new data
    this.dataLoadCounter = 0;

    this.weatherService.getWeather(city).subscribe((data) => {
      this.weather.set(data);
      this.weatherLoading.set(false);
      if (!data) this.weatherError.set(true);
      this.checkAndAnimateCards(); // Check if we should animate in
    });

    this.newsService.getGoodNews(city).subscribe((data) => {
      this.news.set(data);
      this.newsLoading.set(false);
      if (!data) this.newsError.set(true);
      this.checkAndAnimateCards(); // Check if we should animate in
    });
  }

  /**
   * Loads a new song recommendation.
   * @param withAnimation - If true, performs a fade-out/fade-in animation.
   */

  loadSong(withAnimation: boolean): void {
    // This is the core logic to fetch data and update signals.
    const fetchAndSet = () => {
      this.musicService.getSongRecommendation().subscribe((data) => {
        this.song.set(data);
        this.songLoading.set(false); // This will now be called correctly.

        // If animating, perform the fade-in.
        if (withAnimation) {
          gsap.to('.music-card', {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            delay: 0.1,
          });
        }
      });
    };

    this.songLoading.set(true);

    if (withAnimation) {
      // If animating, fade out first, then call our core logic.
      gsap.to('.music-card', {
        duration: 0.3,
        opacity: 0,
        y: 20,
        ease: 'power2.in',
        onComplete: fetchAndSet,
      });
    } else {
      // If not animating (initial load), just call the core logic directly.
      fetchAndSet();
    }
  }

  // We only run this after both weather and news are loaded.
  private checkAndAnimateCards(): void {
    this.dataLoadCounter++;
    if (this.dataLoadCounter === 2) {
      this.isNewsReady.set(true);
      gsap.to('.weather-news-card', {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.1,
      });
    }
  }
}
