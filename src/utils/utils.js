import { Dimensions } from "react-native"

export const getScreenHeight = ()=>{
  const {width,height} = Dimensions('window')
  return height>width?height:width
}