// Presentational Component

import React, {Component, ReactElement} from 'react';
import {Text as RNText, TextStyle} from 'react-native';

import {styles} from './text.component.styles.js';

interface TextProps {
  children:
    | string
    | string[]
    | number
    | number[]
    | (string | number)[]
    | ReactElement;
  customStyles?: TextStyle;
  fontSize?: number;
  color?: string;
}

class Text extends Component<TextProps> {
  render() {
    const {children, customStyles} = this.props;

    const stylesCombined = {
      ...styles.text,
      ...customStyles,
    };
    return <RNText style={stylesCombined}>{children}</RNText>;
  }
}

export default Text;
