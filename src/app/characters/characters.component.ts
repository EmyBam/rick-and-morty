import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMapper } from '../response-mapper.service';
import { Character } from '../character';
import { CharacterEpisodesComponent } from '../character-episodes/character-episodes';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Character[];

  ngOnInit() {
    this.getAllCharacters();
    console.log('hi');
  }

  getAllCharacters(): void {
    this.responseMapper.getCharacters()
      .subscribe(characters => {
        this.characters = characters;
      });
  }

  openModal(id): void {
    const modalRef = this.modalService.open(CharacterEpisodesComponent);
    modalRef.componentInstance.characterId = id;
  }

  constructor(private responseMapper: ResponseMapper,
              private modalService: NgbModal) {
  }

}
