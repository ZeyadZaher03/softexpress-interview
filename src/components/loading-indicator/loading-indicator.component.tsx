// Presentational Component

import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {styles} from './loading-indicator.component.styles';
import {color_primary} from '../../constants/styles.constants';

interface LoadingIndicatorProps {}

class LoadingIndicator extends Component<LoadingIndicatorProps> {
  render() {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator color={color_primary} />
      </View>
    );
  }
}

export default LoadingIndicator;
