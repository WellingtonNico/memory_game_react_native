import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
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

const ChooseDeck = ({ navigation }) => {

  const deckCards = [
    { deckLetter: 'C', source: cCard },
    { deckLetter: 'H', source: hCard },
    { deckLetter: 'D', source: dCard },
    { deckLetter: 'S', source: sCard },
  ]

  const chooseDeck = (deckLetter) => {
    console.log('nav param', { deckLetter })
    navigation.navigate('Jogo da Memória', { deckLetter })
  }

  return (
    <Col backgroundColor='black' flex={1} justifyContent='center'>
      <View>
        <Row >
          <Title>Escolha um Naipe</Title>
        </Row>
      </View>
      <VSpacer size={20} />
      <View>
        <Row flexWrap='wrap' >
          {deckCards.map(card => (
            <View key={card.deckLetter} style={styles.cardCol}>
              <AnimatedVerticalFade >
                <AnimatedPressable onPress={() => chooseDeck(card.deckLetter)}>
                  <Image source={card.source} style={global.imageFit} />
                </AnimatedPressable>
              </AnimatedVerticalFade>
            </View>
          ))}
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