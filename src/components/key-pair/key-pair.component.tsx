import React, {Component} from 'react';
import {styles} from './key-pair-card.styles';
import {View} from 'react-native';
import Text from '../text/text.component';

interface KeyPairProps {
  label: string;
  value: string;
}

class KeyPair extends Component<KeyPairProps> {
  render() {
    const {value, label} = this.props;

    return (
      <View style={styles.wrapper}>
        <>
          <Text customStyles={styles.label}>{label}:</Text>
          <Text customStyles={styles.value}>{value}.</Text>
        </>
      </View>
    );
  }
}
export default KeyPair;
