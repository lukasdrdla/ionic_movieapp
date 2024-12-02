import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonChip, IonCardSubtitle, IonGrid, IonRow, IonCol, IonIcon, IonToast } 
  from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playCircle, heart, trash } from 'ionicons/icons';
import { MovieServiceService } from '../services/movie-service.service';
import { AppStorageService } from '../services/app-storage.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: 'movie-detail.page.html',
  styleUrls: ['movie-detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonLabel, FormsModule, IonButton, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonCardSubtitle, IonGrid, 
    IonRow, IonCol, IonIcon, IonToast
  ],
})
export class MovieDetailPage implements OnInit {
  private movieService = inject(MovieServiceService);
  private favouritesService = inject(AppStorageService);

  // Public properties
  public movie: any = {};
  public videos: any[] = [];
  public images: any[] = [];
  public watchProviders: any[] = [];
  public isFavorite = false;
  public isToastOpen = false;
  public toastMessage = '';
  public trailerKey = '';

  @Input()
  set id(id: number) {
    if (id) {
      this.fetchMovieDetails(id);
    }
  }

  constructor() {
    addIcons({ playCircle, heart, trash });
  }

  ngOnInit(): void {}

  private async fetchMovieDetails(id: number): Promise<void> {
    try {
      this.movie = await this.movieService.getMovieDetail(id).toPromise();
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getWatchProviders(id);
      await this.checkIfMovieIsFavorite();
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }

  private getMovieVideos(id: number): void {
    this.movieService.getMovieVideos(id).subscribe((data: any) => {
      this.videos = data.results.filter((video: any) => video.type === 'Trailer').slice(0, 1);
    });
  }


  private getMovieImages(id: number): void {
    this.movieService.getMovieImages(id).subscribe((data: any) => {
      this.images = data.backdrops.sort(() => Math.random() - 0.5).slice(0, 4);
    });
  }

  private getWatchProviders(id: number): void {
    this.movieService.getWatchProviders(id).subscribe((data: any) => {
      this.watchProviders = data.results?.CZ?.flatrate || [];
    });
  }

  private async checkIfMovieIsFavorite(): Promise<void> {
    try {
      this.isFavorite = await this.favouritesService.isMovieInFavorites(this.movie.id);
    } catch (error) {
      console.error('Error checking if movie is favorite:', error);
    }
  }

  public async addToFavorites(): Promise<void> {
    try {
      await this.favouritesService.addFavoriteMovie(this.movie);
      this.updateToast('Movie added to favorites', true);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  }

  public async removeFromFavorites(): Promise<void> {
    try {
      await this.favouritesService.removeFavoriteMovie(this.movie.id);
      this.updateToast('Movie removed from favorites', false);
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  }

  public watchTrailer(key: string): void {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }

  private updateToast(message: string, isFavorite: boolean): void {
    this.toastMessage = message;
    this.isToastOpen = true;
    this.isFavorite = isFavorite;
  }

  setToastOpen(isOpen: boolean): void {
    this.isToastOpen = isOpen;
  }
  
  setOpen(isOpen: boolean): void {
    this.isToastOpen = isOpen;
  }
}


