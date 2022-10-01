import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeckScreen from '@screens/DeckScreen';
import { RootStackParamList } from '@navigation/types';
import LinkingConfiguration from './LinkingConfiguration';
import CardDetails from '@/screens/CardDetailsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Deck" component={DeckScreen} options={{ title: 'Deck' }} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
    </Stack.Navigator>
  );
}