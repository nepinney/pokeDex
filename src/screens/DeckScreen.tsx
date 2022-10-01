import React from 'react'
import { FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { View, Text } from '@shared-components/Themed'
import { RootStackScreenProps } from '@navigation/types'

import { Sizing, Typography } from '@styles'
import { PokemonDetails, PokemonList } from '@poke/types'
import PokeCard from '@shared-components/PokeCard'
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import { getPokemonUrlsList, nextPage, previousPage } from '@/redux/slices/pokeCardsSlice';
import useColorScheme from '@hooks/useColorScheme';

export default function DeckScreen({ navigation }: RootStackScreenProps<'Deck'>) {

  const POKEMONS_PER_PAGE = 20
  const PAGE_COUNT = 160 / 20

  const dispatch = useAppDispatch()
  const activePage = useAppSelector(state => state.pokeCards.activePage)
  const pokeList = useAppSelector(state => state.pokeCards.pokeList) as PokemonList

  const color = useColorScheme()

  React.useEffect(() => {
    const fetchInitialList = async () => {
      try {
        await dispatch(getPokemonUrlsList())
      } catch (error) {
        Alert.alert('Error', 'Something went wrong')
      }
    }
    if (pokeList === null) fetchInitialList()
  }, [])

  const navigateToCardDetails = (pokemon: PokemonDetails) => {
    navigation.navigate('CardDetails', { cardDetails: pokemon })
  }

  return (
    <View style={styles.container}>
      <View style={styles.changePageContainer}>
        {activePage > 1 &&
          (<Pressable style={styles.buttonContainer} onPress={() => dispatch(previousPage())}>
            <AntDesign name="arrowleft" size={24} color={color === 'dark' ? 'white' : 'dark'} />
          </Pressable>)
        }
        <Text style={styles.pageCount}>Page {activePage} of {PAGE_COUNT}</Text>
        {activePage < PAGE_COUNT &&
          (<Pressable style={styles.buttonContainer} onPress={() => dispatch(nextPage())}>
            <AntDesign name="arrowright" size={24} color={color === 'dark' ? 'white' : 'dark'} />
          </Pressable>)
        }
      </View>

      {pokeList &&
        <FlatList
          data={pokeList.results.slice((POKEMONS_PER_PAGE * activePage) - 20, (activePage) * 20)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <PokeCard pokemon={item} viewCard={navigateToCardDetails} />}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Sizing.x5,
    paddingHorizontal: Sizing.x10,
  },
  changePageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    width: Sizing.x60,
    height: Sizing.x60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: Sizing.x10,
  },
  pageCount: {
    ...Typography.regular.x20,
  },
})
