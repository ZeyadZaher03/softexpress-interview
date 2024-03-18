import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SearchScreen from './src/screens/search/search.screen';
import Details from './src/screens/details/details.screen';
import {color_black, color_primary} from './src/constants/styles.constants';

type RootStackParamList = {
  Search: {};
  Details: {};
};

class App extends Component {
  render() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: color_black,
            },
            headerTintColor: color_primary,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Search"
            component={SearchScreen as React.ComponentType<any>}
          />
          <Stack.Screen
            name="Details"
            component={Details as React.ComponentType<any>}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
