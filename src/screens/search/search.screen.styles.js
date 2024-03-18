import {StyleSheet} from 'react-native';
import {color_white} from '../../constants/styles.constants';

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: color_white,
  },
  heading: {
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '80%',
    lineHeight: 32 * 1.5,
    fontSize: 32,
    marginBottom: 20,
  },
  searchInput: {
    marginHorizontal: 20,
  },
  list: {
    gap: 20,
  },
  filterList: {
    padding: 20,
    gap: 15,
  },
  recipeCard: {
    marginHorizontal: 20,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {},
});
