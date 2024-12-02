import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonToast
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AppStorageService } from '../services/app-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonToast
  ]
})
export class Tab3Page {
  favoriteMovies: any[] = [];

  isToastOpen = false;
  toastMessage = '';

  showToast() {
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  constructor(
    private favouriteMovieService: AppStorageService,
    private router: Router
  ) {
    addIcons({ trash });
  }

  async ionViewDidEnter() {
    const data = await this.favouriteMovieService.get('favoriteMovies')
    if (data) {
      this.favoriteMovies = data
    }
  }

  async removeFavoriteMovie(movieId: number) {
    try {
      await this.favouriteMovieService.removeFavoriteMovie(movieId);
      this.toastMessage = 'Movie removed from favorites';
      this.showToast();
      this.favoriteMovies = this.favoriteMovies.filter((m: any) => m.id !== movieId);
    } catch (error) {
      console.error('Error removing movie from favorites', error);
    }

  }

  goToMovieDetail(id: number) {
    this.router.navigate(['/tabs/movie-detail', id]);
  }

}
