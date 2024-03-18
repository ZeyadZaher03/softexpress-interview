import React, {Component, ReactElement} from 'react';
import {ActivityIndicator, FlatList, View, ViewStyle} from 'react-native';
import {styles} from './list.styles';
import {color_black} from '../../constants/styles.constants';

interface ListState {
  hasScrolled: boolean;
}
interface MetaParams {
  to: number;
  from: number;
}

interface ListProps {
  data: [];
  renderItem: (item: any) => ReactElement;
  listHeaderComponent: ReactElement;
  disableInitialFetch: boolean;
  loading: boolean;
  fetchData: ({to, from}: MetaParams) => Promise<void>;
  meta: {
    from: number;
    to: number;
  };
  listStyles?: ViewStyle;
  listEmptyComponent: ReactElement;
  keyExtractor: ((item: never, index: number) => string) | undefined;
}

class List extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      hasScrolled: false,
    };
  }

  onScroll = () => this.setState({hasScrolled: true});
  fetchMore = (init = false) => {
    const {fetchData, loading, disableInitialFetch, meta} = this.props;
    if ((init && disableInitialFetch) || loading || !meta || !fetch) return;
    const params = {from: meta.from + 10, to: meta.to + 10};
    fetchData(params);
  };

  componentDidMount() {
    this.fetchMore(true);
  }

  onEndReached = () => {
    console.log('END REACHED');
    const {hasScrolled} = this.state;
    if (!hasScrolled) return;
    this.setState({hasScrolled: false}, () => this.fetchMore());
  };

  renderSpinner = () => {
    const {loading} = this.props;
    if (loading) {
      return (
        <View>
          <ActivityIndicator color={color_black} />
        </View>
      );
    }
    return null;
  };

  render() {
    const {
      data,
      renderItem,
      listHeaderComponent,
      listStyles,
      keyExtractor,
      listEmptyComponent,
    } = this.props;

    return (
      <View style={styles.flatListView}>
        <FlatList
          data={data}
          renderItem={renderItem}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0.5}
          onScrollBeginDrag={this.onScroll}
          ListHeaderComponent={listHeaderComponent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={listStyles}
          initialNumToRender={10}
          keyExtractor={keyExtractor}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    );
  }
}

export default List;
