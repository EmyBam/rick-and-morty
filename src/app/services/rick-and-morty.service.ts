import { Injectable } from '@angular/core';
import { CharactersResponse, FetchedCharacter } from '../interfaces/character.interface';
import { EpisodesResponse } from '../interfaces/episode.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { Observable, of, forkJoin, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'https://rickandmortyapi.com/api/';

  getCharactersInfo(): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}character`).pipe(
      tap(_ => console.log('fetched character info')),
      catchError(error => this.handleError('getCharactersInfo', error)),
    );
  }

  getOnePageCharacters(page): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}character?page=${page}`).pipe(
      tap(_ => console.log(`fetched characters from ${page} page`)),
      catchError(error => this.handleError('getOnePageCharacters', error)),
    );
  }

  getCharacter(id: number): Observable<FetchedCharacter> {
    return this.http.get<FetchedCharacter>(`${this.baseUrl}character/${id}`).pipe(
      tap(_ => console.log('fetched character')),
      catchError(error => this.handleError('getCharacter', error)),
    );
  }

  searchCharacter(term: string): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}character/?name=${term}`).pipe(
      tap(_ =>  console.log(`found characters matching "${term}"`)),
      catchError(err => of(undefined))
    );
  }

  getEpisodes() {
    return this.http.get<EpisodesResponse>(`${this.baseUrl}episode`)
      .pipe(
        tap(_ => console.log('fetched episodes info')),
        catchError(error => this.handleError('getEpisodes', error)),
        mergeMap(({info}) => {
            const pageCount = info.pages;
            const pages = [];
            for (let i = 1; i <= pageCount; i++) {
              pages.push(i);
            }
            return forkJoin(pages.map(pageIndex =>
              this.getOnePageEpisodes(pageIndex)));
          }
        )
      );
  }

  private getOnePageEpisodes(pageIndex): Observable<EpisodesResponse> {
    return this.http.get<EpisodesResponse>(`${this.baseUrl}episode?page=${pageIndex}`)
      .pipe(
        tap(_ => console.log(`fetched episodes from page ${pageIndex}`)),
        catchError(error => this.handleError('getOnePageEpisodes', error)),
      );
  }

  private handleError(operation = 'operation', error) {
    if (!error.message || !error.error.error ) {
      const errorMessage = 'An unknown error occurred!';
      console.error(`${operation} failed: ${errorMessage}`);
      return throwError(errorMessage);
    }
    console.error(`${operation} failed: ${error.message}`);
    return throwError(error.error.error);
  }
}
