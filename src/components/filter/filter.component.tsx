import React, {Component} from 'react';

import {ViewStyle} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native';
import Pill from '../pill/pill.component';

interface List {
  label: string;
  id: number;
  selected: boolean;
  value: string | null;
}

interface FilterProps {
  list: List[];
  onPress: (item: List) => void;
  customStyles?: ViewStyle;
}

interface FilterState {}

class Filter extends Component<FilterProps, FilterState> {
  render() {
    const {list, onPress, customStyles} = this.props;

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={customStyles}
        horizontal={true}>
        {list.map(item => (
          <TouchableOpacity key={item.id} onPress={() => onPress(item)}>
            <Pill selected={item.selected}>{item.label}</Pill>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Filter;
