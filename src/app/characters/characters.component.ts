import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMapper } from '../response-mapper.service';
import { Character } from '../character';
import { CharacterEpisodesComponent } from '../character-episodes/character-episodes';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Character[];
  page = 1;
  pageSize: number;
  collectionSize: number;

  ngOnInit() {
    this.getCollectionSize();
    this.getAllCharacters();
  }

  getCollectionSize() {
    return this.httpService.getCollectionInfo().subscribe(
      res => {
        this.collectionSize = res.collectionSize;
        this.pageSize = res.pageSize;
      }
    );
  }

  getAllCharacters(): void {
    this.responseMapper.getCharacters(this.page)
      .subscribe(characters => {
        this.characters = characters;
      });
  }

  openModal(id): void {
    const modalRef = this.modalService.open(CharacterEpisodesComponent);
    modalRef.componentInstance.characterId = id;
  }

  constructor(private responseMapper: ResponseMapper,
              private httpService: HttpService,
              private modalService: NgbModal) {
  }

  onPageChange(page) {
    this.page = page;
  }
}
