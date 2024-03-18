import React, {Component} from 'react';
import {styles} from './search-input.styles';
import {View, ViewStyle} from 'react-native';
import TextInput from '../textInput/text-input.component';
import {color_input_placeholder} from '../../constants/styles.constants';

interface SearchInputProps {
  value: string;
  customStyle: ViewStyle;
  onChange: (text: string) => void;
}

class SearchInput extends Component<SearchInputProps> {
  render() {
    const {value, onChange, customStyle} = this.props;
    return (
      <View style={{...styles.container, ...customStyle}}>
        <TextInput
          customStyles={styles.textInput}
          placeholder="Search..."
          placeholderColor={color_input_placeholder}
          value={value}
          onChange={onChange}
        />
      </View>
    );
  }
}

export default SearchInput;
