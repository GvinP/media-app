import {FlatList} from 'react-native';
import {FC} from 'react';
import FeedGridItem from './FeedGridItem';
import {Post} from '../../API';

interface IFeedGridView {
  data: Post[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const FeedGridView: FC<IFeedGridView> = ({data, ListHeaderComponent}) => {
  return (
    <FlatList
      data={data}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({item}) => <FeedGridItem post={item} />}
      keyExtractor={item => item.id}
      numColumns={3}
      style={{marginHorizontal: -1}}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FeedGridView;
