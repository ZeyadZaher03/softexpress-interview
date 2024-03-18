import {StyleSheet} from 'react-native';
import {color_light_grey} from '../../constants/styles.constants';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color_light_grey,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#959da5',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 24,
    shadowOpacity: 0.1,
    elevation: 5,
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    borderRadius: 500,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 0,
    borderRadius: 10,
  },
});
