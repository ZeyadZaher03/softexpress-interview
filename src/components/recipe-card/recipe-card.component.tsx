import React, {PureComponent, ReactElement} from 'react';
import {styles} from './recipe-card.styles';
import {Image, View, ViewStyle} from 'react-native';
import Card from '../card/card.component';
import Text from '../text/text.component';
import Heading from '../heading/heading.component';

interface RecipeCardProps {
  children?: ReactElement;
  customStyles: ViewStyle;
  heading: string;
  source: string;
  imgAlt: string;
  imgSrc: string;
  onPress: () => void;
}

class RecipeCard extends PureComponent<RecipeCardProps> {
  render() {
    const {imgSrc, imgAlt, heading, source, customStyles, onPress} = this.props;
    return (
      <Card
        onPress={onPress}
        customStyle={{...styles.wrapper, ...customStyles}}>
        <>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: imgSrc}} alt={imgAlt} />
          </View>
          <View style={styles.content}>
            <Heading customStyles={styles.heading}>{heading}</Heading>
            <Text customStyles={styles.source}>{source}</Text>
          </View>
        </>
      </Card>
    );
  }
}

export default RecipeCard;
