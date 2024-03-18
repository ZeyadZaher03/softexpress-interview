import {StyleSheet} from 'react-native';
import {color_black, color_pure_white} from '../../constants/styles.constants';

export const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 1000,
    backgroundColor: color_pure_white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 9,
    marginBottom: 20,
  },
});
