import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
} from '@ionic/angular/standalone';
import { MovieServiceService } from '../services/movie-service.service';
import { CommonModule } from '@angular/common';
import { IonImg } from '@ionic/angular/standalone';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTitle,
    IonContent,
    IonSpinner,
    CommonModule,
    IonImg
  ],
})
export class Tab1Page implements OnInit {
  private movieService = inject(MovieServiceService);
  public topRatedmovies: any[] = [];
  public upComingMovies: any[] = [];
  public trendingMovies: any[] = [];

  public horrorMovies: any[] = [];
  public actionMovies: any[] = [];
  public comedyMovies: any[] = [];
  public romanceMovies: any[] = [];


  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getPopularMovies();
    this.getHorrorMovies();
    this.getActionMovies();
    this.getComedyMovies();
    this.getRomanceMovies();
  
  }

  getTopRatedMovies() {
    return this.movieService.getTopRatedMovies().subscribe((data: any) => {
      this.topRatedmovies = data.results.slice(0, 12);
    });
  }

  getUpcomingMovies() {
    return this.movieService.getUpcomingMovies().subscribe((data: any) => {
      this.upComingMovies = data.results.slice(0, 12);
    });
  }

  getPopularMovies() {
    return this.movieService.getPopularMovies().subscribe((data: any) => {
      this.trendingMovies = data.results.slice(0, 12);
    });
  }

  getHorrorMovies() {
    return this.movieService.getHorrorMovies().subscribe((data: any) => {
      this.horrorMovies = data.results.slice(0, 12);
    });
  }

  getActionMovies() {
    return this.movieService.getActionMovies().subscribe((data: any) => {
      this.actionMovies = data.results.slice(0, 12);
    });
  }

  getComedyMovies() {
    return this.movieService.getComedyMovies().subscribe((data: any) => {
      this.comedyMovies = data.results.slice(0, 12);
    });
  }

  getRomanceMovies() {
    return this.movieService.getRomanceMovies().subscribe((data: any) => {
      this.romanceMovies = data.results.slice(0, 12);
    });
  }

  goToMovieDetail(id: number) {
    this.router.navigate(['/tabs/movie-detail', id]);
  }

}
