import React, {Component} from 'react';
import {TextStyle} from 'react-native';
import {styles} from './heading.styles';
import Text from '../text/text.component';

interface HeadingProps {
  children: string;
  fontSize?: number;
  color?: string;
  customStyles?: TextStyle;
}

class Heading extends Component<HeadingProps> {
  render() {
    const {children, customStyles} = this.props;
    const stylesCombined = {
      ...styles.heading,
      ...customStyles,
    };
    return <Text customStyles={stylesCombined}>{children}</Text>;
  }
}

export default Heading;
