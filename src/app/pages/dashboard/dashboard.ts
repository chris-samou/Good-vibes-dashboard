import {
  Component,
  OnInit,
  signal,
  inject,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { register } from 'swiper/element/bundle';

import { LocationSelectorComponent } from '../../components/location-selector/location-selector';
import { InfoCardComponent } from '../../components/info-card/info-card';
import { WeatherService } from '../../services/weather.service';
import { NewsService } from '../../services/news.service';
import { LocalDataService } from '../../services/local-data.service';
import { PhotoService } from '../../services/photo.service';
import { WeatherData } from '../../models/weather.model';
import { NewsArticle } from '../../models/news.model';
import { Song } from '../../models/song.model';
import { Photo } from '../../models/photo.model';
import { Quote } from '../../models/quote.model';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';
import { FooterComponent } from '../../components/footer/footer';

register();

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LocationSelectorComponent,
    InfoCardComponent,
    SafeUrlPipe,
    FooterComponent,
  ],
  templateUrl: './dashboard.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // Inject all our services
  private weatherService = inject(WeatherService);
  private newsService = inject(NewsService);
  private localDataService = inject(LocalDataService);
  private photoService = inject(PhotoService);

  weather = signal<WeatherData | null>(null);
  news = signal<NewsArticle[] | null>(null);
  song = signal<Song | null>(null);
  photo = signal<Photo | null>(null);
  quote = signal<Quote | null>(null);

  weatherLoading = signal(true);
  newsLoading = signal(true);
  songLoading = signal(true);
  photoLoading = signal(true);
  quoteLoading = signal(true);
  weatherError = signal(false);
  newsError = signal(false);
  isNewsReady = signal(false);

  videoLoaded = false;
  currentCity: string = '';

  private dataLoadCounter = 0;

  ngOnInit(): void {
    this.currentCity = localStorage.getItem('lastCity') || 'London';
    this.handleDataLoad(this.currentCity);
    this.loadSong(false);
    this.loadQuote(false);
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
    const tl = gsap.timeline();
    tl.to('.dashboard-card', {
      duration: 0.3,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'power2.in',
      onComplete: () => this.handleDataLoad(city),
    });
  }

  handleDataLoad(city: string): void {
    this.isNewsReady.set(false);
    this.weatherLoading.set(true);
    this.newsLoading.set(true);
    this.photoLoading.set(true);
    this.weatherError.set(false);
    this.newsError.set(false);
    this.dataLoadCounter = 0;

    this.weatherService.getWeather(city).subscribe((data) => {
      this.weather.set(data);
      this.weatherLoading.set(false);
      if (!data) this.weatherError.set(true);
      this.checkAndAnimateCards(city);
    });

    this.newsService.getGoodNews(city).subscribe((data) => {
      this.news.set(data);
      this.newsLoading.set(false);
      if (!data) this.newsError.set(true);
      this.checkAndAnimateCards(city);
    });

    this.photoService.getPhotoForCity(city).subscribe((data) => {
      this.photo.set(data);
      this.photoLoading.set(false);
      this.checkAndAnimateCards(city);
    });
  }

  loadSong(withAnimation: boolean): void {
    const fetchAndSet = () => {
      this.localDataService.getRandomSong().subscribe((data) => {
        this.song.set(data);
        this.songLoading.set(false);
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

    this.videoLoaded = false;
    this.songLoading.set(true);

    if (withAnimation) {
      gsap.to('.music-card', {
        duration: 0.3,
        opacity: 0,
        y: 20,
        ease: 'power2.in',
        onComplete: fetchAndSet,
      });
    } else {
      fetchAndSet();
    }
  }

  loadQuote(withAnimation: boolean): void {
    const fetchAndSet = () => {
      this.localDataService.getRandomQuote().subscribe((data) => {
        this.quote.set(data);
        this.quoteLoading.set(false);
        if (withAnimation) {
          gsap.to('.quote-card', {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            delay: 0.1,
          });
        }
      });
    };
    this.quoteLoading.set(true);
    if (withAnimation) {
      gsap.to('.quote-card', {
        duration: 0.3,
        opacity: 0,
        y: 20,
        ease: 'power2.in',
        onComplete: fetchAndSet,
      });
    } else {
      fetchAndSet();
    }
  }

  private checkAndAnimateCards(city: string): void {
    this.dataLoadCounter++;
    if (this.dataLoadCounter === 3) {
      this.currentCity = city;
      localStorage.setItem('lastCity', city);
      this.isNewsReady.set(true);
      gsap.to('.dashboard-card', {
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
