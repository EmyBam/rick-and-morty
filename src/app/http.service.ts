import {Injectable} from '@angular/core';
import {Character} from './character';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, mergeMap, map} from 'rxjs/operators';
import {Observable, of, forkJoin} from 'rxjs';

// todo:  create an interface for data I'll set from server.
// todo: split for two services for character anf episodes.
// todo: what to do with mapper?
// todo: how to handle errors?
// todo: spinners


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }



  private baseUrl = 'https://rickandmortyapi.com/api/';


  getCollectionInfo() {
    return this.http.get(`${this.baseUrl}character`)
      .pipe(
        tap(_ => console.log('fetched character info')),
        catchError(this.handleError<[]>('getCollectionSize', [])),
        map(({info}: any) => {
          return {
            collectionSize: info.count,
            pageSize: Math.ceil(info.count / info.pages / 10) * 10};
        }
      ));
  }

  getCharacters(page): Observable<any> {
    return this.http.get(`${this.baseUrl}character?page=${page}`)
      .pipe(
        tap(_ => console.log('fetched all characters')),
        catchError(this.handleError<[]>('getCharacters', [])),
        mergeMap((response: any) => this.getAllPagesData(response, 'character'))
      );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}character/${id}`)
      .pipe(
        tap(_ => console.log('fetched character')),
        catchError(this.handleError<Character>('getCharacter'))
      );
  }

  getEpisodes(): Observable<any> {
    return this.http.get(`${this.baseUrl}episode`)
      .pipe(
        tap(_ => console.log('fetched all episodes')),
        catchError(this.handleError<[]>('getEpisodes', [])),
        mergeMap((response: any) => this.getAllPagesData(response, 'episode'))
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
