import { View, Text } from 'react-native'
import React from 'react'

export  const Row = ({children,...rest}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'center',...rest}}>
      {children}
    </View>
  )
}

export const Col =({children,...rest}) =>{
  return (
    <View style={{flexDirection:'column',...rest}}>
      {children}
    </View>
  )
}

export const Title= ({children})=>{
  return <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>
    {children}
  </Text>
}