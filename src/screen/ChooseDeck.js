import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { Col, Row, Title } from '../components/layout/bootstrap_like'
import cCard from '../../assets/cards/AC.png'
import hCard from '../../assets/cards/AH.png'
import sCard from '../../assets/cards/AS.png'
import dCard from '../../assets/cards/AD.png'
import AnimatedPressable from '../components/animated/AnimatedPressable'
import { getScreenHeight } from '../utils/utils'
import { VSpacer } from '../components/layout/spacers'
import global from '../styles/global'
import AnimatedVerticalFade from '../components/animated/AnimatedVerticalFade'
import { Picker } from '@react-native-picker/picker';


const ChooseDeck = ({ navigation }) => {

  const deckCards = [
    { deckLetter: 'C', source: cCard },
    { deckLetter: 'H', source: hCard },
    { deckLetter: 'D', source: dCard },
    { deckLetter: 'S', source: sCard },
  ]

  const dificultyLevels = [
    { value: 26, label: 'Difícil' },
    { value: 14, label: 'Médio' },
    { value: 8, label: 'Fácil' },
  ]

  const [dificultyLevel, setDificultyLevel] = useState(dificultyLevels[0].value)

  const chooseDeck = (deckLetter) => {
    console.log('nav param', { deckLetter })
    navigation.navigate('Jogo da Memória', { deckLetter, dificultyLevel })
  }

  return (
    <Col flex={1} justifyContent='center'>
      <View>
        <Row >
          <Title>Escolha um Naipe</Title>
        </Row>
      </View>
      <VSpacer size={20} />
      <View>
        <Row flexWrap='wrap' >
          {deckCards.slice(0, 2).map(card => (
            <View key={card.deckLetter} style={styles.cardCol}>
              <AnimatedVerticalFade >
                <AnimatedPressable onPress={() => chooseDeck(card.deckLetter)}>
                  <Image source={card.source} style={global.imageFit} />
                </AnimatedPressable>
              </AnimatedVerticalFade>
            </View>
          ))}
        </Row>
        <Row flexWrap='wrap' >
          {deckCards.slice(2, 4).map(card => (
            <View key={card.deckLetter} style={styles.cardCol}>
              <AnimatedVerticalFade >
                <AnimatedPressable onPress={() => chooseDeck(card.deckLetter)}>
                  <Image source={card.source} style={global.imageFit} />
                </AnimatedPressable>
              </AnimatedVerticalFade>
            </View>
          ))}
        </Row>
        <VSpacer size={15}/>
        <Row >
          <Col width='100%' alignItems='center'>
            <Text style={{fontSize:20,marginBottom:0}}>Dificuldade</Text>
            <Picker
              numberOfLines={2}
              style={{ width: '50%', height: 40 }}
              selectedValue={dificultyLevel}
              onValueChange={(itemValue) => {
                setDificultyLevel(itemValue)
              }}
            >
              {dificultyLevels.map(level => (
                <Picker.Item itemValue={level.value} value={level.value} key={level.value} label={level.label} />
              ))}
            </Picker>
          </Col>
        </Row>
      </View>
    </Col>
  )
}

const styles = StyleSheet.create({
  cardCol: {
    margin: 10,
    aspectRatio: 3 / 4.6,
    height: getScreenHeight() / 4
  },
})


export default ChooseDeck