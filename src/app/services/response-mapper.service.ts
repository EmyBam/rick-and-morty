import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Character, FetchedCharacter, CollectionInfo} from '../interfaces/character.interface';
import {Episode, EpisodesResponse, FetchedEpisode} from '../interfaces/episode.interface';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseMapper {

  getCharacters(page): Observable<Character[]> {
    return this.httpService.getCharacters(page)
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
    return this.httpService.getCharacter(id)
      .pipe(
        map((fetchedCharacter: FetchedCharacter) => this.createCharacter(fetchedCharacter))
      );
  }

  getCollectionInfo(): Observable<CollectionInfo> {
    return this.httpService.getCollectionInfo().pipe(
      map((response) => {
          const pageSize = response.results.length;
          return {
            collectionSize: response.info.count,
            pageSize,
          };
        }
      )
    );
  }

  getEpisodes(): Observable<Episode[]> {
    return this.httpService.getEpisodes()
      .pipe(
        map(fetchedEpisodes => {
          const formattedResults: FetchedEpisode[] = this.formatResults(fetchedEpisodes);
          const episodes: Episode[] = formattedResults.map((fetchedEpisode: FetchedEpisode) => {
            return this.createEpisode(fetchedEpisode);
          });
          return episodes;
        }));
  }

  // searchCharacter(term: string) {
  //   if (!term.trim()) {
  //     return of([]);
  //   }
  //   return this.httpService.searchCharacter(term)
  //     .pipe(
  //       map((fetchedCharacters: []) => {
  //         const formattedResults: [] = this.formatResults(fetchedCharacters);
  //         const characters: Character[] = formattedResults.map((fetchedCharacter: {}) => {
  //           return this.createCharacter(fetchedCharacter);
  //         });
  //         return characters;
  //       })
  //     );
  // }

  private formatResults(fetchedItems): FetchedEpisode[] {
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

  constructor(private httpService: HttpService) { }
}
