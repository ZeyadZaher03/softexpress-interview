import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, Linking, View} from 'react-native';

import Heading from '../../components/heading/heading.component.tsx';
import Button from '../../components/button/button.component.tsx';
import KeyPair from '../../components/key-pair/key-pair.component.tsx';

import {weighFormatter} from '../../utils/utils.ts';

import {styles} from './details.screen.styles.js';

export interface Recipe {
  calories: number;
  image: string;
  label: string;
  source: string;
  totalTime: number;
  totalWeight: number;
  uri: string;
  url: string;
}

interface DetailsNavigationParams {
  recipe: {
    index: number;
    item: Recipe;
  };
}

interface DetailsProps {
  route: {
    params: DetailsNavigationParams;
  };
}

class Details extends Component<DetailsProps> {
  onPressWebsiteButton = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Error opening website:', err),
    );
  };

  render() {
    const recipe = this.props.route.params.recipe;
    const {calories, image, label, source, totalTime, totalWeight, url} =
      recipe.item;

    const formattedCalories = `${Math.round(calories)} Cal`;
    const formattedTime = `${totalTime} Minute${totalTime >= 1 ? 's' : ''}`;
    const formattedWeight = `${weighFormatter(totalWeight)}`;

    return (
      <SafeAreaView style={styles.screenWrapper}>
        <View>
          <Image style={styles.image} source={{uri: image}} alt={label} />
          <View style={styles.contentWrapper}>
            <Heading customStyles={styles.heading}>{label}</Heading>
            <KeyPair label={'Source'} value={source} />
            <KeyPair label={'Calories'} value={formattedCalories} />
            <KeyPair label={'Prep Time'} value={formattedTime} />
            <KeyPair label={'Total Weight'} value={formattedWeight} />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={() => {
              this.onPressWebsiteButton(url);
            }}
            customStyle={styles.button}
            customTextStyle={styles.buttonText}>
            Recipe Website
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default Details;
