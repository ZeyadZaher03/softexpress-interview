import {StyleSheet} from 'react-native';
import {color_primary_text} from '../../constants/styles.constants';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 15,
  },
  imageContainer: {
    width: '100%',
    flex: 1,
    height: 200,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
  source: {
    fontSize: 14,
    fontWeight: '500',
    color: color_primary_text,
  },
});
