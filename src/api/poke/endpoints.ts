const BASE_URL = 'https://pokeapi.co/api/v2';

export const endpoints = {
  pokemon: `${BASE_URL}/pokemon`,
  evolutionChain: `${BASE_URL}/evolution-chain`,
}

export const getSpecificPokemon = (name: string) =>
  String(endpoints.pokemon + '/' + name);

export const getCustomListOfPokemons = (offset: number, count: number) =>
  String(endpoints.pokemon + '/?offset=' + offset + '&limit=' + count);

export const getSpecificEvolutionChain = (id: number) =>
  String(endpoints.evolutionChain + '/' + id + '/');