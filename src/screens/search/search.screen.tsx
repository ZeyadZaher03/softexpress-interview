import React, {Component} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {fetchRecipesForSearchPage} from '../../api/api.ts';

import RecipeCard from '../../components/recipe-card/recipe-card.component.tsx';
import List from '../../components/list/list.component.tsx';
import SearchInput from '../../components/search-input/search-input.component.tsx';
import Filter from '../../components/filter/filter.component.tsx';
import Heading from '../../components/heading/heading.component.tsx';
import Text from '../../components/text/text.component.tsx';

import {styles} from './search.screen.styles.js';

const FILTERS_LIST = [
  {
    label: 'All',
    value: 'all',
    id: 0,
  },
  {
    label: 'low sugar',
    value: 'low-sugar',
    id: 1,
  },
  {
    label: 'keto',
    value: 'keto-friendly',
    id: 2,
  },
  {
    label: 'vegan',
    value: 'vegan',
    id: 3,
  },
];

interface SearchProps {
  navigation: {
    navigate: (screenName: string, params: any) => void;
  };
}

interface SearchState {
  searchText: string;
  healthFilter: string;
  recipesResults: any;
  from: number;
  to: number;
  error: string;
  shouldFetchMore: boolean;
  loading: boolean;
}

interface Recipe {
  label: string;
  source: string;
  image: string;
  uri: string;
}

interface MetaParams {
  to: number;
  init?: boolean;
  from: number;
  hasMore?: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  debounceTimer: null | ReturnType<typeof setTimeout>;
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchText: '',
      from: 0,
      to: 0,
      healthFilter: FILTERS_LIST[0].value, // All
      recipesResults: [],
      loading: false,
      shouldFetchMore: false,
      error: '',
    };
    this.debounceTimer = null;
  }

  fetchRecipes = async ({to, from, init}: MetaParams) => {
    const {searchText, recipesResults, shouldFetchMore, healthFilter} =
      this.state;
    const string = searchText.trim().toLowerCase();
    if (!string) return;
    if (!shouldFetchMore && !init) {
      return;
    }

    try {
      const {data, more} = await fetchRecipesForSearchPage({
        string,
        healthFilter,
        params: {
          to,
          from,
        },
      });

      const newRecipesData = init ? data : [...recipesResults, ...data];

      this.setState({
        recipesResults: newRecipesData,
        to,
        from,
        shouldFetchMore: more,
        loading: false,
      });
    } catch (error: any) {
      console.error(error.message);
      this.setState({
        error: error.message,
      });
    }
  };

  onSearchChange = (text: string) => {
    this.setState({
      searchText: text,
      shouldFetchMore: false,
      error: '',
      loading: true,
    });

    const cleanText = text.trim().toLowerCase();
    if (!cleanText) {
      this.setState({
        recipesResults: [],
        loading: false,
      });
      return;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(
      () =>
        this.fetchRecipes({
          to: 9,
          from: 0,
          init: true,
        }),
      1000,
    );
  };

  onPressFilter = (clickedItem: {
    selected: boolean;
    id: number;
    label: string;
    value: string;
  }) => {
    this.setState(
      {error: '', healthFilter: clickedItem.value, shouldFetchMore: false},
      () => {
        this.fetchRecipes({from: 0, to: 9, init: true});
      },
    );
  };

  renderItem = (item: {index: number; item: Recipe}) => {
    return (
      <RecipeCard
        onPress={() =>
          console.log(this.props.navigation.navigate('Details', {recipe: item}))
        }
        key={item.item.image}
        customStyles={styles.recipeCard}
        imgSrc={item.item.image}
        imgAlt={item.item.label}
        heading={item.item.label}
        source={item.item.source}
      />
    );
  };

  renderListHeader = () => {
    const {searchText, healthFilter} = this.state;

    const filters = FILTERS_LIST.map(filter => ({
      ...filter,
      selected: filter.value === healthFilter,
    }));

    return (
      <>
        <Heading customStyles={styles.heading}>
          What would you like to Cook?
        </Heading>
        <SearchInput
          value={searchText}
          onChange={this.onSearchChange}
          customStyle={styles.searchInput}
        />
        <Filter
          customStyles={styles.filterList}
          onPress={this.onPressFilter}
          list={filters}
        />
      </>
    );
  };

  renderListEmpty = () => {
    const {searchText, loading} = this.state;

    if (loading) {
      return (
        <View style={styles.emptyWrapper}>
          <Text customStyles={styles.emptyText}>loading...</Text>
        </View>
      );
    }
    if (!searchText) {
      return (
        <View style={styles.emptyWrapper}>
          <Text customStyles={styles.emptyText}>
            Try to type something on the search input
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyWrapper}>
        <Text customStyles={styles.emptyText}>
          No results, try typing something else on the search input
        </Text>
      </View>
    );
  };

  render() {
    const {loading, to, from} = this.state;

    const meta = {to, from};

    return (
      <SafeAreaView style={styles.screenWrapper}>
        <List
          keyExtractor={(item: Recipe) => item.uri}
          meta={meta}
          fetchData={this.fetchRecipes}
          disableInitialFetch={true}
          loading={loading}
          listStyles={styles.list}
          listHeaderComponent={this.renderListHeader()}
          listEmptyComponent={this.renderListEmpty()}
          data={this.state.recipesResults}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

export default Search;
