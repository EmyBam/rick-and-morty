import {Injectable} from "@angular/core";
import {HttpService} from "./http.service"
import {Character} from "./character";
import {Episode} from "./episode";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResponseMapper {

  getCharacters(): Observable<Character[]> {
    return this.httpService.getCharacters()
      .pipe(
        map((fetchedCharacters: []) => {
          const formattedResults: [] = this.formatResults(fetchedCharacters);
          const characters: Character[] = formattedResults.map((fetchedCharacter: {}) => {
            return this.createCharacter(fetchedCharacter)
          });
          return characters
        })
      )
  }

  getCharacter(id: number): Observable<Character> {
    return this.httpService.getCharacter(id)
      .pipe(
        map((fetchedCharacter: {}) => this.createCharacter(fetchedCharacter))
      )
  }

  getEpisodes(): Observable<Episode[]> {
    return this.httpService.getEpisodes()
      .pipe(
        map((fetchedEpisodes: []) => {
          const formattedResults: [] = this.formatResults(fetchedEpisodes);
          const episodes: Episode[] = formattedResults.map((fetchedEpisode: {}) => {
            return this.createEpisode(fetchedEpisode)
          });
          return episodes;
        }))
  }

  searchCharacter(term: string) {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpService.searchCharacter(term)
      .pipe(
        map((fetchedCharacters: []) => {
          const formattedResults: [] = this.formatResults(fetchedCharacters);
          const characters: Character[] = formattedResults.map((fetchedCharacter: {}) => {
            return this.createCharacter(fetchedCharacter)
          });
          return characters
        })
      )
  }

  private formatResults(fetchedItems) {
    const fetchedResults = fetchedItems.map(fetchedItem => fetchedItem.results);
    const formattedResults: [] = fetchedResults.reduce((acc, val) => [...acc, ...val]);
    return formattedResults
  }

  private createCharacter (fetchedCharacter: any): Character {
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
  };

  private createEpisode(fetchedEpisode: any): Episode {
    const episode: Episode = {
      id: fetchedEpisode.id,
      name: fetchedEpisode.name,
      airDate: fetchedEpisode.air_date,
      episodeName: fetchedEpisode.episode,
      url: fetchedEpisode.url
    };
    return episode;
  };

  constructor(private httpService: HttpService) { }
}
