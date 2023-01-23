import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React,{memo} from 'react'
import AnimatedVerticalFade from './animated/AnimatedVerticalFade'
import AnimatedPressable from './animated/AnimatedPressable'
import global from '../styles/global'
import { getScreenHeight } from '../utils/utils'
import AnimatedFlip from './animated/AnimatedFlip'
import cardBack from '../../assets/back.png'

const FlipCard = ({ source, onPress,index,isFlipped, flipDuration }) => {

  console.log('renderizada ',index)

  return (
    <View style={styles.cardCol}>
      <AnimatedVerticalFade >
        {/* <AnimatedPressable
          pressedScale={.8}
          onPress={()=>onPress(index)}
          feedbackDuration={10}
        > */}
        <Pressable onPress={()=>onPress(index)}>
          <AnimatedFlip
            frontContent={<Image source={cardBack} style={[global.imageFit, styles.cardBack]} />}
            backContent={<Image source={source} style={[global.imageFit]} />}
            isFlipped={isFlipped}
            flipDuration={flipDuration}
          />
        </Pressable>
        {/* </AnimatedPressable> */}
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

export default memo(FlipCard)