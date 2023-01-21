import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function AnimatedPressable({
  children, onPressIn, onPressOut, feedbackDuration = 20, ...rest
}) {

  const PRESSED = true
  const NOT_PRESSED = false
  const isPressed = useSharedValue(NOT_PRESSED)

  const pressedStyle = useAnimatedStyle(() => {
    return {

      height: `${interpolate(isPressed.value, [NOT_PRESSED, PRESSED], [100, 95])}%`,
      width: `${interpolate(isPressed.value, [NOT_PRESSED, PRESSED], [100, 95])}%`,
    }
  })

  return (
    <Pressable
      onPressIn={() => {
        isPressed.value = withTiming(
          PRESSED,
          { duration: feedbackDuration,easing:Easing.ease },
          () => {
            if (onPressIn) {
              onPressIn()
            }
          }
        )
      }}
      onPressOut={() => {
        isPressed.value = withTiming(
          NOT_PRESSED,
          { duration: feedbackDuration,easing:Easing.ease },
          () => {
            if (onPressOut) {
              onPressOut()
            }

          }
        )
      }}
      style={{justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}
      {...rest}
    >
      <Animated.View style={pressedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  )
}