import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function AnimatedVerticalFade({ children,style, initialPosition = 2000, duration=500,...rest }) {

  const verticalPosition = useSharedValue(initialPosition)

  const verticalAnimationStyle = useAnimatedStyle(() => {
    return {
      flex:1,
      height: '100%',
      width: '100%',
      opacity: interpolate(verticalPosition.value, [0, initialPosition], [1, 0]),
      transform: [
        { translateY: interpolate(verticalPosition.value, [0, initialPosition], [0, initialPosition]) }
      ]
    }
  })

  useEffect(() => {
    verticalPosition.value = withTiming(0, { 'duration':duration })
    console.log('aplicado')
  }, [])

  return (
    <Animated.View style={[verticalAnimationStyle]}>
      {children}
    </Animated.View>
  )
}