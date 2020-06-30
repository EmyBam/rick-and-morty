import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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

  characters: Character[];
  term: string;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.term = term;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
   this.setCharacters();
  }

  setCharacters(): void {
    this.searchTerms.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((term: string) => this.responseMapper.searchCharacter(term))
    ).subscribe(
      characters => {
        this.characters = characters;
      }
    );
  }
}


