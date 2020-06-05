import {Injectable} from '@angular/core';
import {CharactersResponse, FetchedCharacter} from '../interfaces/character.interface';
import {EpisodesResponse, FetchedEpisode} from '../interfaces/episode.interface';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, mergeMap, map, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, of, forkJoin, Subject, BehaviorSubject} from 'rxjs';

// todo: how to handle errors?
// todo: fix search
// todo: spinners


@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'https://rickandmortyapi.com/api/';

  getCharactersInfo(): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}character`).pipe(
      tap(_ => console.log('fetched character info')),
      catchError(this.handleError<CharactersResponse>('getCharactersInfo', )),
    );
  }

  getOnePageCharacters(page): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}character?page=${page}`).pipe(
      tap(_ => console.log('fetched all characters')),
      catchError(this.handleError<CharactersResponse>('getCharacters', )),
    );
  }

  getCharacter(id: number): Observable<FetchedCharacter> {
    return this.http.get<FetchedCharacter>(`${this.baseUrl}character/${id}`).pipe(
      tap(_ => console.log('fetched character')),
      catchError(this.handleError<FetchedCharacter>('getCharacter'))
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
        catchError(this.handleError<EpisodesResponse>('getEpisodesInfo', )),
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
        catchError(this.handleError<EpisodesResponse>('getEpisodes', ))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
