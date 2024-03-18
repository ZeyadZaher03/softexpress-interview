import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SearchScreen from './src/screens/search/search.screen';
import Details from './src/screens/details/details.screen';

type RootStackParamList = {
  Search: {
    component: any;
  };
  Details: {};
};

class App extends Component {
  render() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
