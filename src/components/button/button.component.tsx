import React, {Component} from 'react';
import {styles} from './button.styles';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import Text from '../text/text.component';

interface ButtonProps {
  children: string;
  customStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  onPress?: () => void;
}

class Button extends Component<ButtonProps> {
  render() {
    const {onPress, children, customStyle, customTextStyle} = this.props;

    return (
      <TouchableOpacity
        style={{...styles.button, ...customStyle}}
        onPress={onPress}>
        <Text customStyles={customTextStyle}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
