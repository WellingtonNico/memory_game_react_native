import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function AnimatedPressable({
  children, onPressIn, onPressOut, feedbackDuration = 300, pressedScale = .9, notPressedScale = 1
  , ...rest
}) {

  const PRESSED = pressedScale
  const NOT_PRESSED = notPressedScale
  const isPressed = useSharedValue(NOT_PRESSED)

  const pressedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(
            isPressed.value,
            { duration: feedbackDuration, easing: Easing.bounce }
          )
        }
      ],
      height: '100%',
      width: '100%'
    }
  })

  return (
    <Pressable
      onPressIn={() => {
        isPressed.value = PRESSED
      }}
      onPressOut={() => {
        isPressed.value = NOT_PRESSED
      }}
      style={{ 
        justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' 
      }}
    {...rest}
    >
      <Animated.View style={pressedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  )
}