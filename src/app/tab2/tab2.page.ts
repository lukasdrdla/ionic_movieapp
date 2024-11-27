import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { MovieServiceService } from '../services/movie-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonTitle, IonContent, IonSearchbar, IonList, IonItem,
    CommonModule, IonThumbnail, IonLabel, FormsModule, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class Tab2Page implements OnInit {
  private movieService = inject(MovieServiceService);
  private router = inject(Router);
  
  public searchQuery: string = '';
  public movies: any[] = [];
  currentPage = 1;
  pageSize = 10;
  hasMorePages = true;
  isSearchMode = false; // Určuje, zda je aktivní vyhledávání nebo zobrazení populárních filmů

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(event?: any) {
    // Vybereme zdroj dat podle režimu (vyhledávání nebo populární filmy)
    const dataObservable = this.isSearchMode 
      ? this.movieService.searchMovies(this.searchQuery)
      : this.movieService.getPagedMovies(this.currentPage);

    dataObservable.subscribe((data: any) => {
      const newMovies = data.results.slice(0, this.pageSize);

      // Pokud je to první načtení, nahradíme celý seznam
      if (this.currentPage === 1) {
        this.movies = newMovies;
      } else {
        // Jinak přidáme nové filmy do seznamu
        this.movies.push(...newMovies);
      }

      // Kontrola, zda existují další stránky
      this.hasMorePages = newMovies.length === this.pageSize;

      // Pokud je nekonečný scroll aktivní, ukončíme ho
      if (event) {
        event.target.complete();
      }

      // Posun na další stránku
      if (this.hasMorePages && !this.isSearchMode) {
        this.currentPage++;
      }
    });
  }

  searchMovies() {
    // Přepnutí do režimu vyhledávání
    this.isSearchMode = !!this.searchQuery.trim();
    this.currentPage = 1;
    this.hasMorePages = false; // Vyhledávání nevyužívá stránkování
    this.loadMovies();
  }

  clearSearch() {
    // Resetování vyhledávání
    this.searchQuery = '';
    this.isSearchMode = false;
    this.resetPagination();
    this.loadMovies();
  }

  resetPagination() {
    this.currentPage = 1;
    this.hasMorePages = true;
    this.movies = [];
  }

  goToMovieDetail(id: number) {
    this.router.navigate(['/tabs/movie-detail', id]);
  }
}
