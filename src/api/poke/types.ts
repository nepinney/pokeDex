export type PokemonList = {
  count: number
  next: string
  previous: string
  results: NamedAPIResource[]
}

export type PokemonDetails = {
  abilities: PokemonAbility[]
  base_experience: number
  forms: NamedAPIResource[]
  game_indices: VersionGameIndex[]
  height: number
  held_items: PokemonHeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: PokemonMove[]
  name: string
  order: number
  past_types: PokemonPastType[]
  species: NamedAPIResource
  sprites: PokemonSprites
  stats: PokemonStat[]
  types: PokemonType[]
  weight: number
}

export type PokemonAbility = {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export type VersionGameIndex = {
  game_index: number
  version: NamedAPIResource
}

export type PokemonHeldItem = {
  item: NamedAPIResource
  version_details: PokemonHeldItemVersion[]
}

export type PokemonMove = {
  move: NamedAPIResource
  version_group_details: PokemonMoveVersion[]
}

export type PokemonPastType = {
  generation: NamedAPIResource
  types: PokemonType[]
}

export type PokemonSprites = {
  front_default: string
  front_shiny: string
  front_female: string
  front_shiny_female: string
  back_default: string
  back_shiny: string
  back_female: string
  back_shiny_female: string
}

export type PokemonStat = {
  stat: NamedAPIResource
  effort: number
  base_stat: number
}

export type PokemonType = {
  slot: number
  type: NamedAPIResource
}

export type NamedAPIResource = {
  name: string
  url: string
}

export type PokemonHeldItemVersion = {
  version: NamedAPIResource
  rarity: number
}

export type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource
  version_group: NamedAPIResource
  level_learned_at: number
}

export type EvolutionChain = {
  id: number
  baby_trigger_item: NamedAPIResource
  chain: ChainLink
}

export type ChainLink = {
  is_baby: boolean
  species: NamedAPIResource
  evolution_details: EvolutionDetail[]
  evolves_to: ChainLink[]
}

export type EvolutionDetail = {
  item: NamedAPIResource
  trigger: NamedAPIResource
  gender: number
  held_item: NamedAPIResource
  known_move: NamedAPIResource
  known_move_type: NamedAPIResource
  location: NamedAPIResource
  min_level: number
  min_happiness: number
  min_beauty: number
  min_affection: number
  needs_overworld_rain: boolean
  party_species: NamedAPIResource
  party_type: NamedAPIResource
  relative_physical_stats: number
  time_of_day: string
  trade_species: NamedAPIResource
  turn_upside_down: boolean
}