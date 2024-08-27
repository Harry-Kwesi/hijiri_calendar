import React from 'react';
import { View, Image, Text,StyleSheet, Dimensions } from 'react-native';
import Pinar from 'pinar';

const { width, height } = Dimensions.get('window');

interface ImageItem {
    name: string;
    img: any;
}

interface CarouselProps {
  images: ImageItem[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <View style={styles.container}>
      <Pinar
        loop
        showsControls
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image
              key={image.name}
              source={image.img}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.text}>{image.name}</Text>
          </View>
        ))}
      </Pinar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: width,
    height: height/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height/2,
  },
  text: {
    position: 'absolute',
    top: 10, 
    left: 5, 
    bottom: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

export default Carousel;
