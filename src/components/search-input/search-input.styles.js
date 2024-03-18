import {StyleSheet} from 'react-native';
import {color_light_grey} from '../../constants/styles.constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color_light_grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 500,
    shadowColor: '#0000007f',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 6,
  },
  textInput: {
    flex: 1,
    borderRadius: 500,
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 10,
  },
});
