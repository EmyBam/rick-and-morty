import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResponseMapper } from '../services/response-mapper.service';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.scss']
})
export class CharacterSearchComponent implements OnInit {

  constructor(private responseMapper: ResponseMapper) {
  }

  characters: Observable<Character[]>;
  isNoMatching = false;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    console.log(`Input ${term}`);
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
   this.setCharacters();
  }

  setCharacters() {
    this.characters = this.searchTerms.pipe(
        debounceTime(250),
        distinctUntilChanged(),
       // catchError(_ => this.isNoMatching = true),
        switchMap((term: string) => this.responseMapper.searchCharacter(term))
      );
  }
}
