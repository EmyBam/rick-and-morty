import {Injectable} from "@angular/core";
import {Character} from "./character";
import {HttpClient} from "@angular/common/http";
import {catchError, tap, mergeMap} from "rxjs/operators";
import {Observable, of, forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  getCharacters(): Observable<Character[]> {
    return this.http.get(`${this.baseUrl}character`)
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
      )
  }

  getEpisodes(): Observable<any> {
    return this.http.get(`${this.baseUrl}episode`)
      .pipe(
        tap(_ => console.log('fetched all episodes')),
        catchError(this.handleError<[]>('getEpisodes', [])),
        mergeMap((response: any) => this.getAllPagesData(response, 'episode'))
      );
  }

  searchCharacter(term: string): Observable<Character[]> {
    return this.getCharacters()
      .pipe(
        tap(response => response.length ?
          console.log(`found characters matching "${term}"`) :
          console.log(`no characters matching "${term}"`)),
        catchError(this.handleError<[]>('searchCharacters', []))
      );
  }

  private getAllPagesData(response: any, endpoint: string): Observable<[]> {
    const pagesNumber: number = response.info.pages;
    let allPages: [] = [];
    for (let pageIndex: number = 1; pageIndex <= pagesNumber; pageIndex++) {
      let page: Observable<[]> = this.http.get<[]>(`${this.baseUrl}${endpoint}?page=${pageIndex}`)
        .pipe(
          tap(_ => console.log(`fetched ${endpoint} on page ${pageIndex}`)),
          catchError(this.handleError<[]>(`can't get ${endpoint} on page ${pageIndex}`, []))
        );
      allPages.push(page);
    }
    return forkJoin(allPages);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  //todo: how to handle errors?

  private baseUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }
}
