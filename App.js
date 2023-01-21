

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Pressable
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, Extrapolate
} from 'react-native-reanimated';
import { useEffect } from 'react';
import cardImage from './assets/AS.png'
import cardBack from './assets/back.png'
import AnimatedPressable from './src/components/AnimatedPressable';
import AnimatedFlip from './src/components/AnimatedFlip';


function App() {
  const [isFlipped, setIsFlipped] = useState(false)

  const flip = () => {
    setIsFlipped(p => !p)
  }

  return (
    <View style={styles.body}>
      <AnimatedPressable
        onPress={flip}
        style={[styles.cardContainer]}
      >
        <AnimatedFlip
          frontContent={<Image source={cardBack} style={[styles.card, styles.cardBack]} />}
          backContent={<Image source={cardImage} style={[styles.card]} />}
          isFlipped={isFlipped}
          flipDuration={1000}
        />
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({

  body: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  cardContainer: {
    height: 300,
    aspectRatio: 3 / 4.5,
  },
  card: {
    width: '100%',
    height: '100%',
  },
  cardBack: {
    borderRadius: 10
  },
});

export default App;
