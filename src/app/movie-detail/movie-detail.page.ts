import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonChip, IonCardSubtitle, IonGrid, IonRow, IonCol, IonIcon, IonToast } 
  from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playCircle, heart, trash } from 'ionicons/icons';
import { MovieServiceService } from '../services/movie-service.service';
import { FavouriteMovieService } from '../services/favourite-movie.service';

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
  private favouritesService = inject(FavouriteMovieService);

  // Public properties
  public movie: any = {};
  public videos: any[] = [];
  public images: any[] = [];
  public watchProviders: any[] = [];
  public isFavorite = false;
  public isToastOpen = false;
  public toastMessage = '';

  // Trailer key for watchTrailer method
  public trailerKey = '';

  // Input decorator to accept movie ID
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

  /**
   * Fetch detailed movie information, including videos, images, and watch providers.
   * @param id Movie ID
   */
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

  /**
   * Fetch trailers for the movie.
   * @param id Movie ID
   */
  private getMovieVideos(id: number): void {
    this.movieService.getMovieVideos(id).subscribe((data: any) => {
      this.videos = data.results.filter((video: any) => video.type === 'Trailer').slice(0, 1);
    });
  }

  /**
   * Fetch and randomize movie images.
   * @param id Movie ID
   */
  private getMovieImages(id: number): void {
    this.movieService.getMovieImages(id).subscribe((data: any) => {
      this.images = data.backdrops.sort(() => Math.random() - 0.5).slice(0, 4);
    });
  }

  /**
   * Fetch watch providers for the movie in the Czech Republic.
   * @param id Movie ID
   */
  private getWatchProviders(id: number): void {
    this.movieService.getWatchProviders(id).subscribe((data: any) => {
      this.watchProviders = data.results?.CZ?.flatrate || [];
    });
  }

  /**
   * Check if the current movie is marked as favorite.
   */
  private async checkIfMovieIsFavorite(): Promise<void> {
    try {
      this.isFavorite = await this.favouritesService.isMovieInFavorites(this.movie.id);
    } catch (error) {
      console.error('Error checking if movie is favorite:', error);
    }
  }

  /**
   * Add the current movie to the user's favorites.
   */
  public async addToFavorites(): Promise<void> {
    try {
      await this.favouritesService.addFavoriteMovie(this.movie);
      this.updateToast('Movie added to favorites', true);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  }

  /**
   * Remove the current movie from the user's favorites.
   */
  public async removeFromFavorites(): Promise<void> {
    try {
      await this.favouritesService.removeFavoriteMovie(this.movie.id);
      this.updateToast('Movie removed from favorites', false);
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  }

  /**
   * Open a new tab to watch the movie trailer on YouTube.
   * @param key Trailer key
   */
  public watchTrailer(key: string): void {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }

  /**
   * Display a toast message.
   * @param message Toast message
   * @param isFavorite Updated favorite status
   */
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


