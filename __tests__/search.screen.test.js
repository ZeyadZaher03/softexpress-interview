import React from 'react';
import renderer from 'react-test-renderer';
import SearchScreen from './../src/screens/search/search.screen';
import {View} from 'react-native';
import {fetchRecipesForSearchPage} from '../src/api/api';

jest.mock('../src/api/api', () => ({
  fetchRecipesForSearchPage: jest.fn(),
}));

// Mock a Recipe object for testing
const mockRecipe = {
  uri: '123',
  image: 'image-url',
  label: 'Recipe Label',
  source: 'Recipe Source',
};

test('renders initial elements', () => {
  const tree = renderer
    .create(<SearchScreen navigation={{navigate: jest.fn()}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveProperty('children');
});
