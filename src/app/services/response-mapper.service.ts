import {Injectable} from '@angular/core';
import {RickAndMortyService} from './rick-and-morty.service';
import {Character, FetchedCharacter, CollectionInfo} from '../interfaces/character.interface';
import {Episode, FetchedEpisode} from '../interfaces/episode.interface';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseMapper {

  constructor(private rickAndMortyService: RickAndMortyService) { }

  getOnePageCharacters(page): Observable<Character[]> {
    return this.rickAndMortyService.getOnePageCharacters(page)
      .pipe(
        map(({results} ) => {
          const characters: Character[] = results.map((fetchedCharacter: FetchedCharacter) => {
            return this.createCharacter(fetchedCharacter);
          });
          return characters;
        })
      );
  }

  getCharacter(id: number): Observable<Character> {
    return this.rickAndMortyService.getCharacter(id)
      .pipe(
        map((fetchedCharacter: FetchedCharacter) => this.createCharacter(fetchedCharacter))
      );
  }

  getCharacterInfo(): Observable<CollectionInfo> {
    return this.rickAndMortyService.getCharactersInfo().pipe(
      map(({results, info}) => {
          const pageSize = results.length;
          return {
            collectionSize: info.count,
            pageSize,
          };
        }
      )
    );
  }

  getEpisodes(): Observable<Episode[]> {
    return this.rickAndMortyService.getEpisodes()
      .pipe(
        map(fetchedEpisodes => {
          const formattedResults: FetchedEpisode[] = this.formatResults(fetchedEpisodes);
          const episodes: Episode[] = formattedResults.map((fetchedEpisode: FetchedEpisode) => {
            return this.createEpisode(fetchedEpisode);
          });
          return episodes;
        }));
  }

  searchCharacter(term: string): Observable<Character[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.rickAndMortyService.searchCharacter(term).pipe(
        map((response) => {
          if (!response) {
            return [];
          }
          const characters: Character[] = response.results.map((fetchedCharacter: FetchedCharacter) => {
            return this.createCharacter(fetchedCharacter);
          });
          return characters;
        })
      );
  }

  private formatResults(fetchedItems): [] {
    const fetchedResults = fetchedItems.map(fetchedItem => fetchedItem.results);
    const formattedResults: [] = fetchedResults.reduce((acc, val) => [...acc, ...val]);
    return formattedResults;
  }

  private createCharacter(fetchedCharacter: FetchedCharacter): Character {
    const character: Character = {
      id: fetchedCharacter.id,
      name: fetchedCharacter.name,
      gender: fetchedCharacter.gender,
      status: fetchedCharacter.status,
      episode: fetchedCharacter.episode,
      numberOfEpisodes: fetchedCharacter.episode.length,
      origin: fetchedCharacter.origin.name,
      image: fetchedCharacter.image
    };
    return character;
  }

  private createEpisode(fetchedEpisode: FetchedEpisode): Episode {
    const episode: Episode = {
      id: fetchedEpisode.id,
      name: fetchedEpisode.name,
      airDate: fetchedEpisode.air_date,
      episodeName: fetchedEpisode.episode,
      url: fetchedEpisode.url
    };
    return episode;
  }
}
