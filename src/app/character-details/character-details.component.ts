import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ResponseMapper} from '../services/response-mapper.service';
import {Character} from '../interfaces/character.interface';
import {CharacterEpisodesComponent} from '../character-episodes/character-episodes';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

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
  ) {}


  @Input() character: Character;
  isLoading = false;
  error: string = null;
  private sub: any;

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
      this.isLoading = true;
      this.sub = this.route.params.pipe(
        switchMap(params => {
            if (!params || !params.id) {
              this.isLoading = false;
              return of(undefined);
            }
            const id = +params.id;
            return this.responseMapper.getCharacter(id);
          }
        )
      ).subscribe(
        character => {
          console.log(character);
          this.isLoading = false;
          this.character = character;
        },
        errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        });
    }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openModal(id): void {
    const modalRef = this.modalService.open(CharacterEpisodesComponent);
    modalRef.componentInstance.characterId = id;
  }

}
