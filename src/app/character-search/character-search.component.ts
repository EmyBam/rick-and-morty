import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ResponseMapper} from '../response-mapper.service';
import {Character} from '../character';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.scss']
})
export class CharacterSearchComponent implements OnInit {

  characters: Observable<Character[]>;
  private searchTerms = new Subject<string>();

  constructor(private responseMapper: ResponseMapper) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
  //  this.setCharacters();
  }

  // setCharacters(): void {
  //   this.characters = this.searchTerms
  //     .pipe(
  //       debounceTime(250),
  //       distinctUntilChanged(),
  //       switchMap((term: string) => this.responseMapper.searchCharacter(term)),
  //     );
  // }
}
