import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMapper } from '../services/response-mapper.service';
import { forkJoin } from 'rxjs';
import { Episode } from '../interfaces/episode.interface';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-episode-details',
  templateUrl: 'character-episodes.html',
  styleUrls: ['character-episodes.scss']
})
export class CharacterEpisodesComponent implements OnInit {

  @Input() characterId;
  character: Character;
  characterEpisodes: Episode[];
  page = 1;
  pageSize = 5;
  collectionSize: number;

  ngOnInit() {
    this.getCharacterEpisodes();
  }

  getCharacterEpisodes(): void {
    forkJoin([
      this.responseMapper.getEpisodes(),
      this.responseMapper.getCharacter(this.characterId)
    ])
      .subscribe(results => {
        const allEpisodes = results[0];
        const character = results[1];
        const characterEpisodesSet = new Set();
        character.episode.forEach(url => characterEpisodesSet.add(url));
        this.characterEpisodes = allEpisodes.filter(episode => characterEpisodesSet.has(episode.url));
        this.character = character;
        this.collectionSize = this.characterEpisodes.length;
      });
  }

  constructor(public activeModal: NgbActiveModal,
              private responseMapper: ResponseMapper) {}

}
