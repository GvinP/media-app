import {View, FlatList, Image, useWindowDimensions} from 'react-native';
import React, {FC, useState} from 'react';
import colors from '../../theme/colors';

interface ICarousel {
  images: string[];
}

const Carousel: FC<ICarousel> = ({images}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const {width} = useWindowDimensions();
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={{width, aspectRatio: 1}} />
        )}
        keyExtractor={(item, index) => `${item}.${index}`}
        horizontal
        pagingEnabled
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
