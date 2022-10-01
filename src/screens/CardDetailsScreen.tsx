import React from 'react'
import axios from 'axios'
import { StyleSheet, Image, ScrollView, Alert } from 'react-native'

import { View, Text } from '@shared-components/Themed'
import { RootStackScreenProps } from '@navigation/types'
import { capitalizeFirst } from '@shared/utils'
import { Colors, Outlines, Sizing, Typography } from '@styles'
import { typeColors } from '@shared/styles/colors'
import { EvolutionChain, PokemonDetails } from '@poke/types'
import MiniPokeCard from '@shared-components/MiniPokeCard'

export default function CardDetails({ route, navigation }: RootStackScreenProps<'CardDetails'>) {
  const cardDetails = route.params.cardDetails

  const [evolutionChain, setEvolutionChain] = React.useState<EvolutionChain | undefined>()
  const [loadingEvolution, setLoadingEvolution] = React.useState<boolean>(true)

  React.useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const speciesResponse = await axios.get(cardDetails.species.url)
        const pokemonSpecies = speciesResponse.data

        const evolutionResponse = await axios.get(pokemonSpecies.evolution_chain.url)
        const evolutionChain: EvolutionChain = evolutionResponse.data

        setEvolutionChain(evolutionChain)
        setLoadingEvolution(false)
      } catch (error) {
        Alert.alert('Error fetching evolution', String(error))
      }
    }

    navigation.setOptions({
      headerTitleAlign: 'center',
      title: capitalizeFirst(route.params.cardDetails.name),
    })
    fetchEvolutionChain()
  }, [])

  const goToDetails = (pokemon: PokemonDetails) => {
    if (cardDetails.name !== pokemon.name) {
      navigation.navigate('CardDetails', { cardDetails: pokemon })
      navigation.setOptions({
        headerTitleAlign: 'center',
        title: capitalizeFirst(pokemon.name),
      })
    }
  }

  return (
    <View style={styles.container}>
      {cardDetails && (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: cardDetails.sprites.front_default }} />
          </View>
          <View style={styles.typesContainer}>
            {cardDetails.types.map((type, index) => {
              const pokeTypeColor = type.type.name.toLowerCase() as keyof typeof typeColors
              return (
                <Text
                  key={index}
                  style={[styles.pokeType, { color: Colors.typeColors[pokeTypeColor] }]}
                  lightColor='white'
                  darkColor='black'>
                  {type.type.name.toUpperCase()}
                </Text>
              )
            })}
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
            <View
              lightColor='black'
              darkColor='white'
              style={[styles.smallInfoContainer, { marginRight: Sizing.x5 }]}>
              <Text style={styles.propertyTitle} lightColor='white' darkColor='black'>
                Weight
              </Text>
              <Text lightColor='white' darkColor='black'>
                {cardDetails.weight}
              </Text>
            </View>
            <View
              lightColor='black'
              darkColor='white'
              style={[styles.smallInfoContainer, { marginLeft: Sizing.x5 }]}>
              <Text style={styles.propertyTitle} lightColor='white' darkColor='black'>
                Height
              </Text>
              <Text lightColor='white' darkColor='black'>
                {cardDetails.height}
              </Text>
            </View>
          </View>
          <View lightColor='black' darkColor='white' style={styles.informationContainer}>
            <Text style={styles.boxTitle} lightColor='white' darkColor='black'>
              Stats
            </Text>
            {cardDetails.stats.map((stat, index) => {
              return (
                <View
                  lightColor='black'
                  darkColor='white'
                  key={index}
                  style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <Text lightColor='white' darkColor='black'>
                    {stat.stat.name}
                  </Text>
                  <Text lightColor='white' darkColor='black'>
                    {stat.base_stat}
                  </Text>
                </View>
              )
            })}
          </View>
          <View lightColor='black' darkColor='white' style={styles.informationContainer}>
            <Text style={styles.boxTitle} lightColor='white' darkColor='black'>
              Evolution
            </Text>
            {loadingEvolution ? (
              <Text lightColor='white' darkColor='black'>
                Loading...
              </Text>
            ) : evolutionChain &&
              evolutionChain.chain &&
              evolutionChain.chain.evolves_to.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                }}>
                <MiniPokeCard name={evolutionChain.chain.species.name} goToDetails={goToDetails} />
                <MiniPokeCard
                  name={evolutionChain.chain.evolves_to[0].species.name}
                  goToDetails={goToDetails}
                />

                {evolutionChain.chain.evolves_to[0].evolves_to[0] && (
                  <MiniPokeCard
                    name={evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}
                    goToDetails={goToDetails}
                  />
                )}
              </View>
            ) : (
              <Text lightColor='white' darkColor='black'>
                No Evolution
              </Text>
            )}
          </View>
          <Text style={styles.baseExp}>Experience gained: {cardDetails.base_experience}</Text>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizing.x10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertiesContainer: {
    flexDirection: 'row',
  },
  smallInfoContainer: {
    flex: 1,
    padding: Sizing.x5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Outlines.borderRadius.base,
    marginBottom: Sizing.x20,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: Sizing.x40,
    backgroundColor: 'transparent',
  },
  propertyTitle: {
    ...Typography.bold.x30,
  },
  image: {
    height: Sizing.x140,
    width: Sizing.x140,
  },
  informationContainer: {
    padding: Sizing.x20,
    borderRadius: Outlines.borderRadius.base,
    marginBottom: Sizing.x20,
  },
  boxTitle: {
    ...Typography.bold.x30,
  },
  pokeType: {
    ...Typography.regular.x20,
  },
  baseExp: {
    textAlign: 'center',
    ...Typography.regular.x20,
  },
})
