import {StyleSheet} from 'react-native';
import {color_black} from '../../constants/styles.constants';

export const styles = StyleSheet.create({
  pill: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: color_black,
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 500,
    textAlign: 'center',

    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 10,
  },
});
