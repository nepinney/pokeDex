import axios from 'axios'
import { getCustomListOfPokemons } from './endpoints'
import { PokemonDetails, PokemonList } from './types'

export const getPokemonUrls = async (): Promise<PokemonList> => {
  const response = await axios.get(getCustomListOfPokemons(0, 160))
  return response.data
}

export const getPokemon = async (url: string): Promise<PokemonDetails> => {
  const response = await axios.get(url)
  return response.data
}