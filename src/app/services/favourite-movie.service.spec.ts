import { TestBed } from '@angular/core/testing';

import { FavouriteMovieService } from './favourite-movie.service';

describe('FavouriteMovieService', () => {
  let service: FavouriteMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
