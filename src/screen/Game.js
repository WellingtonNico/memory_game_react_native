import React, { useEffect, useState } from 'react'
import { View, Alert, StyleSheet, Image, SafeAreaView } from 'react-native'
import AnimatedFlip from "../components/animated/AnimatedFlip"
import AnimatedPressable from "../components/animated/AnimatedPressable"
import { Col, Row } from '../components/layout/bootstrap_like'
import { C_CARDS_LIST, S_CARDS_LIST, H_CARDS_LIST, D_CARDS_LIST } from '../constants'
import global from '../styles/global'
import { getScreenHeight, shuffleArray } from '../utils/utils'
import cardBack from '../../assets/back.png'
import AnimatedVerticalFade from '../components/animated/AnimatedVerticalFade'


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
  const initialFlipDuration = 100
  const [flipDuration, setFlipDuration] = useState(initialFlipDuration)
  const currentDeck = (AVAILABLE_DECKS[route.params?.deckLetter] ?? []).slice(0, (route.params.dificultyLevel ?? 26) / 2)
  const [displayDeck, setDisplayDeck] = useState([])
  const [startAnimationFinished, setStartAnimationFinished] = useState(false)
  const [isReadyToPlay, setIsReadyToPlay] = useState(false)
  const [alreadyAnimated, setAlreadyAnimated] = useState(null)
  const [firstSelectedCard, setFirstSelectedCard] = useState(null)
  const [secondSelectedCard, setSecondSelectedCard] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [matches, setMatches] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const setUpGame = () => {
    setAttempts(0)
    setMatches(0)
    setSelectedIndex(null)
    setAlreadyAnimated(false)
    setFlipDuration(initialFlipDuration)
    if (currentDeck.length > 0) {
      const deck = [...currentDeck, ...currentDeck]
      setDisplayDeck(deck.map((source,index) => ({
        source,
        isFound: false,
        isFlipped: false,
        id:index
      })))
    }
  }


  // este é responsável por montar a lista de cartas pura sem embaralhar
  useEffect(() => {
    setUpGame()
  }, [])

  // este é resonsável por disparar a animação
  useEffect(() => {
    if (!alreadyAnimated && displayDeck.length > 0) {
      setAlreadyAnimated(true)
      setTimeout(() => {
        setStartAnimationFinished(false)
        setFlipDuration(initialFlipDuration)
        animateStartGame(0)
      }, 500)
    }
  }, [displayDeck])


  // este é responsável por embaralhar as cartas após a animação inicial
  useEffect(() => {
    if (startAnimationFinished == true) {
      setDisplayDeck(shuffleArray(displayDeck))
    }
  }, [startAnimationFinished])


  const animateStartGame = async (incomingIndex) => {
    var index = incomingIndex
    flipCard(index)
    setTimeout(() => {
      index++
      if (index <= displayDeck.length) {
        animateStartGame(index)
      } else {
        setStartAnimationFinished(true)
        setIsReadyToPlay(true)
        setFlipDuration(700)
      }
    }, flipDuration)
  }


  const flipCard = (index) => {
    setDisplayDeck(displayDeck.map(
      (card, cardIndex) =>
        index == cardIndex ? { ...card, isFlipped: true } : card
    ))
  }


  // responsável por setar as cartas selecionadas
  useEffect(()=>{
    if(selectedIndex==null){
      return
    }
    if (firstSelectedCard == null || secondSelectedCard == null) {
      const selectedCard = { cardData: displayDeck[selectedIndex], index:selectedIndex }
      if (firstSelectedCard == null) {
        setFirstSelectedCard(selectedCard)
      } else if (secondSelectedCard == null && selectedCard.cardData.id != firstSelectedCard.cardData.id) {
        setSecondSelectedCard(selectedCard)
      }
      flipCard(selectedIndex)
    }

  },[selectedIndex])


  const markSelectedCardsAsFoundAndUnflipNotFoundCards = (foundIndexes) => {
    setDisplayDeck(
      displayDeck.map(
        (card, index) =>
          foundIndexes.includes(index)
            ? { ...card, isFound: true }
            : { ...card, isFlipped: card.isFound }
      )
    )
    setTimeout(() => {
      setSelectedIndex(null)
    }, flipDuration)
  }


  // este é reponsável por verificar se houve match nas cartas selecionadas
  useEffect(() => {
    if (firstSelectedCard != null && secondSelectedCard != null) {
      if (firstSelectedCard.cardData.source == secondSelectedCard.cardData.source) {
        setMatches(p => p + 1)
        markSelectedCardsAsFoundAndUnflipNotFoundCards(
          [firstSelectedCard.index, secondSelectedCard.index]
        )
      } else {
        setTimeout(() => {
          markSelectedCardsAsFoundAndUnflipNotFoundCards([])
        }, 500)
      }
      setFirstSelectedCard(null)
      setSecondSelectedCard(null)
      setAttempts(p => p + 1)
    } else {
      setTimeout(() => {
        setSelectedIndex(null)
      }, flipDuration)
    }
  }, [firstSelectedCard, secondSelectedCard])


  // responsável por verificar se ainda restam movimentos a serem feitos, contagem e display do resultado
  useEffect(() => {
    if (matches == displayDeck.length / 2 && matches > 0) {
      setTimeout(() => {
        Alert.alert(
          'Jogo Finalizado',
          `
Veja seus resultados abaixo\n
Tentativas: ${attempts}\n
Acertos: ${matches} = ${(matches * 100 / attempts).toFixed(2)}%
          `,
          [
            { text: 'Reiniciar', onPress: setUpGame },
            { text: 'Escolher Naipe', onPress: () => navigation.goBack('ChooseDeck') }
          ]
        )
      }, 500)
    }
  }, [matches])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View>
        <Row flexWrap='wrap'>
          {displayDeck?.map((card, index) => (
            <View key={index} style={styles.cardCol}>
              <AnimatedVerticalFade >
                <AnimatedPressable
                  pressedScale={.8}
                  onPress={() => setSelectedIndex(index)}
                  feedbackDuration={15}
                >
                  <AnimatedFlip
                    frontContent={<Image source={cardBack} style={[global.imageFit, styles.cardBack]} />}
                    backContent={<Image source={card.source} style={[global.imageFit]} />}
                    isFlipped={card.isFlipped == true || card.isFound == true}
                    flipDuration={flipDuration}
                  />
                  <Image source={card.source} style={global.imageFit} />
                </AnimatedPressable>
              </AnimatedVerticalFade>
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
  },
  text: {
    color: 'white',
    paddingLeft: 12,
    fontWeight: 'bold'
  }
});

export default Game