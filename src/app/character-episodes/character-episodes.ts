import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMapper } from '../services/response-mapper.service';
import { Observable, forkJoin } from 'rxjs';
import { Episode } from '../interfaces/episode';
import { CharacterInterface } from '../interfaces/character.interface';

@Component({
  selector: 'app-episode-details',
  templateUrl: 'character-episodes.html',
  styleUrls: ['character-episodes.scss']
})
export class CharacterEpisodesComponent implements OnInit {

  @Input() characterId;
  character: CharacterInterface;
  characterEpisodes: Episode[];

  ngOnInit() {
    this.getCharacterEpisodes();
  }

  getCharacterEpisodes(): void {
    const allEpisodes: Observable<Episode[]> = this.responseMapper.getEpisodes();
    const character: Observable<CharacterInterface> = this.responseMapper.getCharacter(this.characterId);
    forkJoin([allEpisodes, character])
      .subscribe(results => {
        const allEpisodes = results[0];
        const character = results[1];
        const characterEpisodesSet = new Set;
        character.episode.forEach(url => characterEpisodesSet.add(url));
        this.characterEpisodes = allEpisodes.filter(episode => characterEpisodesSet.has(episode.url));
        this.character = character;
      });
  }

  constructor(public activeModal: NgbActiveModal,
              private responseMapper: ResponseMapper) {}

}
