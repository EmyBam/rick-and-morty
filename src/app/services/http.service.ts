import { Injectable } from '@angular/core';
import { CharactersResponse, FetchedCharacter } from '../interfaces/character.interface';
import { EpisodesResponse, FetchedEpisode } from '../interfaces/episode.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, mergeMap, map } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';

// todo:  create an interface for data I'll set from server.
// todo: how to handle errors?
// todo: spinners


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://rickandmortyapi.com/api/';

  getCollectionInfo(): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}character`).pipe(
        tap(_ => console.log('fetched collection info')),
        catchError(this.handleError<CharactersResponse>('getCollectionInfo', )),
        );
  }

  getCharacters(page): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}character?page=${page}`).pipe(
        tap(_ => console.log('fetched all characters')),
        catchError(this.handleError<CharactersResponse>('getCharacters', )),
      );
  }

  getCharacter(id: number): Observable<FetchedCharacter> {
    return this.http.get<FetchedCharacter>(`${this.baseUrl}character/${id}`)
      .pipe(
        tap(_ => console.log('fetched character')),
        catchError(this.handleError<FetchedCharacter>('getCharacter'))
      );
  }

  // searchCharacter(term: string): Observable<Character[]> {
  //   return this.getCharacters()
  //     .pipe(
  //       tap(response => response.length ?
  //         console.log(`found characters matching "${term}"`) :
  //         console.log(`no characters matching "${term}"`)),
  //       catchError(this.handleError<[]>('searchCharacters', []))
  //     );
  // }

  getEpisodes() {
    return this.http.get<EpisodesResponse>(`${this.baseUrl}episode`)
      .pipe(
        tap(_ => console.log('fetched all episodes')),
        catchError(this.handleError<EpisodesResponse>('getEpisodes', )),
        mergeMap(response => {
            const pageCount = response.info.pages;
            const pages = [];
            for (let i = 1; i <= pageCount; i++) { pages.push(i); }
            return forkJoin(pages.map(pageIndex =>
              this.getOnePageEpisode(pageIndex)));
          }
        )
      );
  }

  private getOnePageEpisode(pageIndex): Observable<EpisodesResponse> {
    return this.http.get<EpisodesResponse>(`${this.baseUrl}episode?page=${pageIndex}`)
      .pipe(
        tap(_ => console.log(`fetched episodes from page ${pageIndex}`)),
        catchError(this.handleError<EpisodesResponse>('getEpisodes', ))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
