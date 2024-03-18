import React, {Component} from 'react';
import {TextInput as RNTextInput, TextStyle} from 'react-native';

import {color_input_placeholder} from '../../constants/styles.constants';
import {styles} from './text-input.styles';

interface TextInputProps {
  value: string;
  customStyles?: TextStyle;
  placeholder?: string;
  placeholderColor?: string;
  onChange: (text: string) => void;
}

class TextInput extends Component<TextInputProps> {
  render() {
    const {value, onChange, placeholder, placeholderColor, customStyles} =
      this.props;

    return (
      <RNTextInput
        style={{...styles.textInput, ...customStyles}}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={placeholderColor || color_input_placeholder}
        onChangeText={onChange}
      />
    );
  }
}

export default TextInput;
