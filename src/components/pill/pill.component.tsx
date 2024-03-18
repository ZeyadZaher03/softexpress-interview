import React, {Component} from 'react';
import {ViewStyle} from 'react-native';
import {styles} from './pill.styles';
import {
  color_black,
  color_primary,
  color_pure_white,
} from '../../constants/styles.constants';
import Text from '../text/text.component';

interface PillProps {
  selected: boolean;
  children: string;
  customStyle?: ViewStyle;
}

class Pill extends Component<PillProps> {
  render() {
    const {children, customStyle, selected = false} = this.props;
    const combinedStyles = {
      ...styles.pill,
      ...customStyle,
      backgroundColor: selected ? color_primary : color_pure_white,
      shadowColor: selected ? color_primary : color_black,
    };

    return <Text customStyles={combinedStyles}>{children}</Text>;
  }
}

export default Pill;
