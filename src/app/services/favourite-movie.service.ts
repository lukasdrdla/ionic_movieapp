import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FavouriteMovieService {
  private _storage: Storage | null = null;
  private readonly FAVORITES_KEY = environment.favoritesKey;
  

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create()
    this._storage = storage
  }

  public async get(key: string) {
    return this._storage?.get(key)
  }

  public async set(key: string, value: any) {
    return this._storage?.set(key, value)
  }

  public async addFavoriteMovie(movie: any) {
    const favoriteMovies = await this.get(this.FAVORITES_KEY) || [];
    const existingMovie = favoriteMovies.find((m: any) => m.id === movie.id);

    if (!existingMovie) {
      favoriteMovies.push(movie);
      await this.set(this.FAVORITES_KEY, favoriteMovies);
    }
    else {
      console.log('Movie already exists in favorites');
    }
  }

  public async removeFavoriteMovie(movieId: number) {
    const favoriteMovies = await this.get(this.FAVORITES_KEY) || [];
    const updatedMovies = favoriteMovies.filter((m: any) => m.id !== movieId);
    await this.set(this.FAVORITES_KEY, updatedMovies);
  }

public async isMovieInFavorites(movieId: number): Promise<boolean> {
  const favoriteMovies = (await this.get(this.FAVORITES_KEY)) || [];
  return favoriteMovies.some((m: any) => m.id === movieId);
}

  


  
}