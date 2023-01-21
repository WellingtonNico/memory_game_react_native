import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { 
  Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming
 } from 'react-native-reanimated'


export default function AnimatedFlip({
  frontContent, backContent, afterFlip, isFlipped = false, flipDuration = 250
}) {
  const flipDegree = useSharedValue(0)

  const flipStyle = useAnimatedStyle(() => {
    return {
      position: 'relative',
      transform: [
        { rotateY: `${interpolate(flipDegree.value, [0, 180], [0, 180])}deg` }
      ],
    }
  })

  const flipBackStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      opacity: interpolate(flipDegree.value, [0, 90, 91, 180], [0, 0, 1, 1], Extrapolate.CLAMP)
    }
  })

  const flipFrontStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      opacity: interpolate(flipDegree.value, [0, 90, 91, 180], [1, 1, 0, 0], Extrapolate.CLAMP)
    }
  })

  useEffect(() => {
    flipDegree.value = withTiming(
      isFlipped ? 180 : 0,
      { duration: flipDuration, easing: Easing.bounce },
      () => {
        if (afterFlip) {
          afterFlip()
        }
      }
    )
  }, [isFlipped])

  return (
    <Animated.View style={[styles.internal, flipStyle]}>
      <Animated.View style={[styles.internal, styles.backSide, flipBackStyle]}>
        {backContent}
      </Animated.View>
      <Animated.View style={[styles.internal, flipFrontStyle]}>
        {frontContent}
      </Animated.View>
      <Animated.View></Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  internal: { height: '100%', width: '100%' },
  backSide: {
    transform: [
      { rotateY: '180deg' }
    ],
  }
})