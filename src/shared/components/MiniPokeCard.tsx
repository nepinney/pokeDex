import React from 'react'
import axios from 'axios'
import { Pressable, StyleSheet, Image, Alert } from 'react-native'

import { View, Text } from '@shared-components/Themed'
import { PokemonDetails } from '@poke/types'
import { getSpecificPokemon } from '@poke/endpoints'
import { capitalizeFirst } from '@shared/utils'

interface Props {
  name: string
  goToDetails: (ppokemon: PokemonDetails) => void
}

export default function MiniPokeCard({ name, goToDetails }: Props) {
  const [pokeDetails, setPokeDetails] = React.useState<PokemonDetails | undefined>()

  React.useEffect(() => {
    const fetchPokeDetails = async (name: string) => {
      try {
        const response = await axios.get(getSpecificPokemon(name))
        setPokeDetails(response.data)
      } catch (error) {
        Alert.alert('Error fetching pokemon details', String(error))
      }
    }
    fetchPokeDetails(name)
  }, [])

  return (
    <Pressable
      onPress={() => {
        if (pokeDetails) goToDetails(pokeDetails)
      }}>
      <View style={styles.container}>
        {pokeDetails && (
          <Image style={styles.image} source={{ uri: pokeDetails.sprites.front_default }} />
        )}
        <Text style={styles.textCenter} lightColor='white' darkColor='black'>
          {capitalizeFirst(name)}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
  },
  textCenter: {
    textAlign: 'center',
  }
})
