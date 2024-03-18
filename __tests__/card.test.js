import React from 'react';
import {render} from '@testing-library/react-native';
import Card from './../src/components/card/card.component';
import {Text} from 'react-native';

describe('<Card />', () => {
  test('renders children', () => {
    const {getByTestId} = render(
      <Card>
        <Text testID="child">Child Component</Text>
      </Card>,
    );
    const childElement = getByTestId('child');
    expect(childElement).toBeDefined();
  });
});
