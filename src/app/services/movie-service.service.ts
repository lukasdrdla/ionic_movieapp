import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private http = inject(HttpClient);
  constructor() { }

  searchMovies(query: string) {
    return this.http.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }

  getTopRatedMovies() {
    return this.http.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  }

  getMovieDetail(id: number) {
    return this.http.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  }

  getUpcomingMovies() {
    return this.http.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  }

  getPopularMovies() {
    return this.http.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  }

  getHorrorMovies() {
    return this.http.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`);
  }

  getActionMovies() {
    return this.http.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
  }

  getComedyMovies() {
    return this.http.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`);
  }

  getRomanceMovies() {
    return this.http.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`);
  }

  getMovieVideos(id: number) {
    return this.http.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  }

  getPagedMovies(page: number) {
    return this.http.get<{ results: any[]; total_pages: number }>(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
  }

  getMovieImages(id: number) {
    return this.http.get(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
  }

  getWatchProviders(id: number) {
    return this.http.get(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`);
  }
  
}
