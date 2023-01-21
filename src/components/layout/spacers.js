import { View, Text } from 'react-native'
import React from 'react'

export const VSpacer = ({size=10}) => {
  return (
    <View style={{height:size,backgroundColor:'#00000000'}}>
     
    </View>
  )
}

export const HSpacer = ({size=10}) => {
  return (
    <View style={{width:size,backgroundColor:'#00000000'}}>
     
    </View>
  )
}

