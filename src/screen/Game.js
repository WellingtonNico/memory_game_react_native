import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import AnimatedFlip from "../components/animated/AnimatedFlip"
import AnimatedPressable from "../components/animated/AnimatedPressable"
import { Col, Row } from '../components/layout/bootstrap_like'
import { C_CARDS_LIST, S_CARDS_LIST, H_CARDS_LIST, D_CARDS_LIST } from '../constants'
import global from '../styles/global'
import { getScreenHeight, shuffleArray } from '../utils/utils'
import cardBack from '../../assets/back.png'


{/* <AnimatedPressable
onPress={flip}
style={[styles.cardContainer]}
>
<AnimatedFlip
  frontContent={<Image source={cardBack} style={[styles.card, styles.cardBack]} />}
  backContent={<Image source={cardImage} style={[styles.card]} />}
  isFlipped={isFlipped}
  flipDuration={1000}
/>
</AnimatedPressable> */}

const AVAILABLE_DECKS = {
  C: C_CARDS_LIST,
  S: S_CARDS_LIST,
  H: H_CARDS_LIST,
  D: D_CARDS_LIST,
}

const Game = ({ navigation, route }) => {

  const currentDeck = (AVAILABLE_DECKS[route.params?.deckLetter] ?? []).slice(0, (route.params.cardsQuantity ?? 26) / 2)
  // const [currentCardsList, setCurrentCardsList] = useState(currentDeck ? [...currentDeck, ...currentDeck] : [])
  const [displayDeck, setDisplayDeck] = useState([])
  const [alreadyAnimated, setAlreadyAnimated] = useState(false)
  const [firstSelectedCard, setFirstSelectedCard] = useState(null)
  const [secondSelectedCard, setSecondSelectedCard] = useState(null)


  useEffect(() => {
    console.log(route.params)
  }, [route])

  useEffect(() => {
    if (currentDeck.length > 0) {
      const deck = [...currentDeck, ...currentDeck]
      setDisplayDeck(deck.map(source => ({
        source,
        isFound: false,
        isFlipped: false
      })))

    }
  }, [])

  useEffect(()=>{
    if(!alreadyAnimated&&displayDeck.length>0){
      setAlreadyAnimated(true)
      setTimeout(() => {
        animateStartGame(0)
      }, 500)
    }
  },[displayDeck])

  const animateStartGame = async (incomingIndex) => {
    var index = incomingIndex
    flipCard(index)
    setTimeout(() => {
      index++
      if (index <= displayDeck.length) {
        animateStartGame(index)
      } else if (displayDeck.length > 0) {
        setDisplayDeck(shuffleArray(displayDeck))
      }
    }, 150)
  }


  const flipCard = (index) => {
    setDisplayDeck(displayDeck.map((card, cardIndex) => index == cardIndex ? { ...card, isFlipped: true } : card))
  }

  const unFlipSelectedCards = ([selectedCardIndexes]) => {
    setDisplayDeck(displayDeck.map((card, cardIndex) => selectedCardIndexes.contains(cardIndex) ? { ...card, isFlipped: false } : card))
    setFirstSelectedCard(null)
    setSecondSelectedCard(null)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
      <View>
        <Row flexWrap='wrap'>
          {displayDeck?.map((card, index) => (
            <View key={index} style={styles.cardCol}>
              <AnimatedPressable onPress={() => flipCard(index)}>
                <AnimatedFlip
                  frontContent={<Image source={cardBack} style={[global.imageFit, styles.cardBack]} />}
                  backContent={<Image source={card.source} style={[global.imageFit]} />}
                  isFlipped={card.isFlipped}
                  flipDuration={500}
                />
                <Image source={card.source} style={global.imageFit} />
              </AnimatedPressable>
            </View>
          ))}
        </Row>
      </View>
    </SafeAreaView>
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
  }
});

export default Game