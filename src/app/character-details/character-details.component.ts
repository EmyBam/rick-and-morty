import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ResponseMapper } from '../services/response-mapper.service';
import { Character } from '../interfaces/character.interface';
import { CharacterEpisodesComponent } from '../character-episodes/character-episodes'

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private responseMapper: ResponseMapper,
    private location: Location,
    private modalService: NgbModal
  ) { }

  @Input() character: Character;
  isLoading = false;
  error: string = null;
  private id;
  private sub: any;

  ngOnInit(): void {
    this.getCharacter();
  }

  // todo: refactor this
  getCharacter(): void {
    this.isLoading = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.responseMapper.getCharacter(this.id).subscribe(
        character => {
          this.isLoading = false;
          this.character = character;
        },
        errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  openModal(id): void {
    const modalRef = this.modalService.open(CharacterEpisodesComponent);
    modalRef.componentInstance.characterId = id;
  }

}
