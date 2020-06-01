export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  episode: string[];
  numberOfEpisodes: number;
  origin: string;
  image: string;
}

export interface CollectionInfo {
  collectionSize: number;
  pageSize: number;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }[];
}

export interface FetchedCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
