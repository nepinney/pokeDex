import React from 'react'
import axios from 'axios'
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet } from 'react-native'

import { View, Text } from '@shared-components/Themed'
import { NamedAPIResource, PokemonDetails } from '@poke/types'
import { Colors, Outlines, Sizing, Typography } from '../styles'
import { capitalizeFirst } from '@shared/utils'
import { typeColors } from '@shared/styles/colors'

interface Props {
  pokemon: NamedAPIResource
  viewCard: (pokemon: PokemonDetails) => void
}

export default function PokeCard({ pokemon, viewCard }: Props) {


  const [cardDetails, setCardDetails] = React.useState<PokemonDetails | undefined>()

  React.useEffect(() => {
    const fetchCardDetails = async (): Promise<PokemonDetails | undefined> => {
      try {
        const response = await axios.get(pokemon.url)
        return response.data
      } catch (error) {
        Alert.alert('Error fetching pokemon details', String(error))
        return
      }
    }

    fetchCardDetails().then(data => {
      setCardDetails(data)
    })
  }, [pokemon.name])

  return (
    <Pressable style={{ backgroundColor: 'transparent' }} onPress={() => {
      if (cardDetails) {
        viewCard(cardDetails)
      }
    }}
    >
      <View style={styles.container} lightColor='black' darkColor='white'>
        {cardDetails !== undefined ?
          <>
            <Image style={styles.image} source={{ uri: cardDetails.sprites.front_default }} />
            <View style={styles.cardInformationContainer} lightColor='black' darkColor='white'>
              <Text style={styles.pokeName} lightColor='white' darkColor='black'>{capitalizeFirst(pokemon.name)}</Text>
              <View lightColor='black' darkColor='white' style={styles.typesContainer}>
                {cardDetails.types.map((type, index) => {
                  const pokeTypeColor = type.type.name.toLowerCase() as keyof typeof typeColors
                  return <Text key={index} style={[styles.pokeType, { color: Colors.typeColors[pokeTypeColor] }]} lightColor='white' darkColor='black'>{type.type.name.toUpperCase()}</Text>
                })}
              </View>
            </View>
            <Text style={styles.topRightText} lightColor='white' darkColor='black'>Exp {cardDetails.base_experience}</Text>
          </>
          :
          <ActivityIndicator size='small' color='black' />
        }
      </View >
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Outlines.borderRadius.base,
    padding: Sizing.x5,
    flexDirection: 'row',
    position: 'relative',
  },
  cardInformationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  typesContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  pokeName: {
    ...Typography.bold.x40,
  },
  pokeType: {
    ...Typography.regular.x20,
    marginRight: Sizing.x5,
  },
  topRightText: {
    ...Typography.regular.x20,
    position: 'absolute',
    top: Sizing.x5,
    right: Sizing.x10,
  },
})