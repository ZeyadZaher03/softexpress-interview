import React, {Component} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import RecipeCard from '../../components/recipe-card/recipe-card.component.tsx';
import List from '../../components/list/list.component.tsx';
import SearchInput from '../../components/search-input/search-input.component.tsx';
import Filter from '../../components/filter/filter.component.tsx';
import Heading from '../../components/heading/heading.component.tsx';
import Text from '../../components/text/text.component.tsx';
import LoadingIndicator from '../../components/loading-indicator/loading-indicator.component.tsx';

import {fetchRecipesForSearchPage} from '../../api/api.ts';
import {FILTERS_LIST} from './filter.ts';

import {Recipe} from '../details/details.screen.tsx';

import {styles} from './search.screen.styles.js';

export interface SearchScreenProps {
  navigation: {
    navigate: (screenName: string, params: any) => void;
  };
}

interface SearchScreenState {
  searchText: string;
  healthFilter: string | null;
  recipesResults: any;
  from: number;
  to: number;
  error: string;
  shouldFetchMore: boolean;
  loading: boolean;
}

export interface FetchRecipesParams {
  to: number;
  init?: boolean;
  from: number;
  healthFilter?: string | null;
  keyword?: string;
}

class SearchScreen extends Component<SearchScreenProps, SearchScreenState> {
  debounceTimer: null | ReturnType<typeof setTimeout>;
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = {
      searchText: '',
      from: 0,
      to: 0,
      healthFilter: FILTERS_LIST[0].value,
      recipesResults: [],
      loading: false,
      shouldFetchMore: false,
      error: '',
    };
    this.debounceTimer = null;
  }

  fetchRecipes = async ({
    to,
    from,
    init,
    healthFilter,
    keyword,
  }: FetchRecipesParams) => {
    const {recipesResults, shouldFetchMore} = this.state;
    const params = {
      string: keyword || this.state.searchText,
      healthFilter: healthFilter || this.state.healthFilter,
      params: {
        to,
        from,
      },
    };

    this.setState({loading: true});

    if (!keyword || (!shouldFetchMore && !init)) return;
    try {
      const {data, more} = await fetchRecipesForSearchPage(params);
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
    const {healthFilter} = this.state;

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
          healthFilter: healthFilter || '',
          keyword: cleanText,
        }),
      1000,
    );
  };

  onPressFilter = (clickedItem: {
    selected: boolean;
    id: number;
    label: string;
    value: string | null;
  }) => {
    const {searchText} = this.state;
    const cleanText = searchText.trim().toLowerCase();
    this.setState(
      {
        error: '',
        healthFilter: clickedItem.value,
        shouldFetchMore: false,
        recipesResults: [],
      },
      () => {
        this.fetchRecipes({
          from: 0,
          to: 9,
          init: true,
          keyword: cleanText,
          healthFilter: clickedItem.value,
        });
      },
    );
  };

  renderItem = (item: {index: number; item: Recipe}) => {
    const {navigation} = this.props;
    return (
      <RecipeCard
        onPress={() => navigation.navigate('Details', {recipe: item})}
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
      return <></>;
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

export default SearchScreen;
