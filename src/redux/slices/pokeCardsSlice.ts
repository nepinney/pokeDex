import { PokemonList } from "@/api/poke/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as PokeAPIFunctions from "@/api/poke/functions";

export const getPokemonUrlsList = createAsyncThunk(
  'cards/pokemonUrlsList',
  async (thunkAPI) => {
    const response = await PokeAPIFunctions.getPokemonUrls()
    return response
  }
)

type PokeCardsInitialState = {
  pokeList: PokemonList | null
  activePage: number
}

const initialState: PokeCardsInitialState = {
  pokeList: null,
  activePage: 1,
}

const pokeCardsSlice = createSlice({
  name: "pokeCards",
  initialState,
  reducers: {
    nextPage(state) {
      state.activePage++
    },
    previousPage(state) {
      state.activePage--
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getPokemonUrlsList.fulfilled, (state, action) => {
        state.pokeList = action.payload;
      })
      .addCase(getPokemonUrlsList.rejected, (state, action) => {
        throw (action.error.message)
      })
  }
});

export const { nextPage, previousPage } = pokeCardsSlice.actions;

export default pokeCardsSlice.reducer;
