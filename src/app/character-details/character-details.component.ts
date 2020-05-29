import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ResponseMapper } from '../services/response-mapper.service';
import { CharacterInterface } from '../interfaces/character.interface';
import { CharacterEpisodesComponent } from '../character-episodes/character-episodes'

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  @Input() character: CharacterInterface;

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.responseMapper.getCharacter(id)
      .subscribe(character => {
        this.character = character;
      });
  }

  goBack(): void {
    this.location.back();
  }

  openModal(id): void {
    const modalRef = this.modalService.open(CharacterEpisodesComponent);
    modalRef.componentInstance.characterId = id;
  }

  constructor(
    private route: ActivatedRoute,
    private responseMapper: ResponseMapper,
    private location: Location,
    private modalService: NgbModal
  ) { }
}
