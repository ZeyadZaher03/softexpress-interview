import {StyleSheet} from 'react-native';
import {
  color_black,
  color_primary,
  color_white,
} from '../../constants/styles.constants';

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: color_white,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentWrapper: {
    padding: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 10,
  },

  buttonWrapper: {
    margin: 20,
  },
  button: {
    backgroundColor: color_primary,
    padding: 14,
  },
  buttonText: {
    color: color_black,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
  },
});
