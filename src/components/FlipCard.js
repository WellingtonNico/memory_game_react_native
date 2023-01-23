import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import AnimatedVerticalFade from './animated/AnimatedVerticalFade'
import AnimatedPressable from './animated/AnimatedPressable'
import global from '../styles/global'
import { getScreenHeight } from '../utils/utils'
import AnimatedFlip from './animated/AnimatedFlip'
import cardBack from '../../assets/back.png'

export default function FlipCard({ card, onPress, flipDuration }) {

  return (
    <View key={card.id} style={styles.cardCol}>
      <AnimatedVerticalFade >
        <AnimatedPressable
          pressedScale={.8}
          onPress={() => onPress(index)}
          feedbackDuration={10}
        >
          <AnimatedFlip
            frontContent={<Image source={cardBack} style={[global.imageFit, styles.cardBack]} />}
            backContent={<Image source={card.source} style={[global.imageFit]} />}
            isFlipped={card.isFlipped == true || card.isFound == true}
            flipDuration={flipDuration}
          />
          <Image source={card.source} style={global.imageFit} />
        </AnimatedPressable>
      </AnimatedVerticalFade>
    </View>
  )
}

const styles = StyleSheet.create({
  cardCol: {
    height: getScreenHeight() / 8,
    aspectRatio: 3 / 4.5,
    margin: 2,
  },
  cardBack: {
    borderRadius: 5
  },
});