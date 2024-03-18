import React, {Component} from 'react';
import Search from './src/screens/search/search.screen';
import Details from './src/screens/details/details.screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

interface AppProps {}

interface AppState {
  isDarkMode: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
