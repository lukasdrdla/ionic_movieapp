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
  isSearchMode = false;

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(event?: any) {
    const dataObservable = this.isSearchMode 
      ? this.movieService.searchMovies(this.searchQuery)
      : this.movieService.getPagedMovies(this.currentPage);

    dataObservable.subscribe((data: any) => {
      const newMovies = data.results.slice(0, this.pageSize);

      if (this.currentPage === 1) {
        this.movies = newMovies;
      } else {
        this.movies.push(...newMovies);
      }

      this.hasMorePages = newMovies.length === this.pageSize;

      if (event) {
        event.target.complete();
      }

      if (this.hasMorePages && !this.isSearchMode) {
        this.currentPage++;
      }
    });
  }

  searchMovies() {
    this.isSearchMode = !!this.searchQuery.trim();
    this.currentPage = 1;
    this.hasMorePages = false;
    this.loadMovies();
  }

  clearSearch() {
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
