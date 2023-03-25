import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import colors from '../../theme/colors';
import DoublePressable from '../DoublePressable/intex';

interface ICarousel {
  images: string[];
  onDoublePress?: () => void;
}

const Carousel: FC<ICarousel> = ({images, onDoublePress = () => {}}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const {width} = useWindowDimensions();
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    },
    [],
  );
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <DoublePressable {...{onDoublePress}}>
            <Image source={{uri: item}} style={{width, aspectRatio: 1}} />
          </DoublePressable>
        )}
        keyExtractor={(item, index) => `${item}.${index}`}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              aspectRatio: 1,
              backgroundColor:
                activeImageIndex === index ? colors.primary : colors.white,
              borderRadius: 5,
              marginHorizontal: 5,
              marginVertical: 10,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
