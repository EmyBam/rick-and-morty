import {Injectable} from '@angular/core';
import {CharactersResponse, CharacterResponse} from '../interfaces/character.interface';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, mergeMap, map} from 'rxjs/operators';
import {Observable, of, forkJoin} from 'rxjs';

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

  getCharacter(id: number): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.baseUrl}character/${id}`)
      .pipe(
        tap(_ => console.log('fetched character')),
        catchError(this.handleError<CharacterResponse>('getCharacter'))
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

  getEpisodes(): Observable<any> {
    return this.http.get(`${this.baseUrl}episode`)
      .pipe(
        tap(_ => console.log('fetched all episodes')),
        catchError(this.handleError<[]>('getEpisodes', [])),
        mergeMap((response: any) => this.getAllPagesData(response, 'episode'))
      );
  }

  private getAllPagesData(response: any, endpoint: string): Observable<[]> {
    const pagesNumber: number = response.info.pages;
    const allPages: [] = [];
    for (let pageIndex = 1; pageIndex <= pagesNumber; pageIndex++) {
      const page: Observable<[]> = this.http.get<[]>(`${this.baseUrl}${endpoint}?page=${pageIndex}`)
        .pipe(
          tap(_ => console.log(`fetched ${endpoint} on page ${pageIndex}`)),
          catchError(this.handleError<[]>(`can't get ${endpoint} on page ${pageIndex}`, []))
        );
      // @ts-ignore
      allPages.push(page);
    }
    // @ts-ignore
    return forkJoin(allPages);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
