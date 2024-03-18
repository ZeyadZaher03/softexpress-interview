// Presentational Component

import React, {PureComponent, ReactElement} from 'react';
import {styles} from './card.styles';
import {TouchableOpacity, ViewStyle} from 'react-native';

interface CardProps {
  children: ReactElement;
  customStyle?: ViewStyle;
  onPress?: () => void;
}

class Card extends PureComponent<CardProps> {
  render() {
    const {customStyle, children, onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{...styles.wrapper, ...customStyle}}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default Card;
