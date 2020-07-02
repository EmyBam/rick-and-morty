import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ResponseMapper} from '../services/response-mapper.service';
import {Character} from '../interfaces/character.interface';
import {CharacterEpisodesComponent} from '../character-episodes/character-episodes';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  constructor(private responseMapper: ResponseMapper,
              private modalService: NgbModal) {
  }

  characters: Character[];
  page = 1;
  pageSize: number;
  collectionSize: number;
  isLoading = false;
  error: string = null;

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.isLoading = true;
    forkJoin([
      this.responseMapper.getCharacterInfo(),
      this.responseMapper.getOnePageCharacters(this.page)
    ]).subscribe(
      results => {
        this.isLoading = false;
        this.pageSize = results[0].pageSize;
        this.collectionSize = results[0].collectionSize;
        this.characters = results[1];
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
  }

  openModal(id): void {
    const modalRef = this.modalService.open(CharacterEpisodesComponent);
    modalRef.componentInstance.characterId = id;
  }

  onPageChange(page): void {
    this.page = page;
    this.getCharacters();
  }
}
