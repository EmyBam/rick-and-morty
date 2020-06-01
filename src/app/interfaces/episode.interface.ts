export interface Episode {
  id: number;
  name: string;
  airDate: string;
  episodeName: string;
  url: string;
}

export interface EpisodesResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
  }[];
}

export interface FetchedEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
