import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Linking} from 'react-native';
import Details from './../src/screens/details/details.screen';

const mockRecipe = {
  calories: 300,
  image: 'https://example.com/food.jpg',
  label: 'Test Recipe',
  source: 'Test Source',
  totalTime: 45,
  totalWeight: 200,
  uri: 'recipe-uri',
  url: 'https://example.com/recipe',
};

const mockRouteParams = {
  params: {
    recipe: {
      index: 0,
      item: mockRecipe,
    },
  },
};
const mockRouteNavigationParams = {
  setOptions: () => {},
};

describe('<Details />', () => {
  test('displays recipe details', () => {
    const {getByText} = render(
      <Details
        route={mockRouteParams}
        navigation={mockRouteNavigationParams}
      />,
    );
    expect(getByText('Test Recipe')).toBeDefined();
  });
});
