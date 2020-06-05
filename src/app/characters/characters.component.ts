import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMapper } from '../services/response-mapper.service';
import { Character } from '../interfaces/character.interface';
import { CharacterEpisodesComponent } from '../character-episodes/character-episodes';

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

  ngOnInit() {
    this.getCollectionInfo();
    this.getCharacters();
  }

  getCollectionInfo(): void {
    this.responseMapper.getCharacterInfo().subscribe(
      ({pageSize, collectionSize}) => {
        this.pageSize = pageSize;
        this.collectionSize = collectionSize;
      }
    );
  }

  getCharacters(): void {
    this.responseMapper.getOnePageCharacters(this.page)
      .subscribe(characters => {
        this.characters = characters;
      });
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
