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
import { FavouriteMovieService } from '../services/favourite-movie.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { Router } from '@angular/router';

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
  favoriteMovies: any[] = []; // Tady budou oblíbené filmy

  isToastOpen = false; // Stav toastu
  toastMessage = ''; // Zpráva toastu

  showToast() {
    this.setOpen(true);  // Nastavení toastu jako otevřeného
  }

  // Funkce pro nastavení stavu toastu
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  constructor(
    private favouriteMovieService: FavouriteMovieService,
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
