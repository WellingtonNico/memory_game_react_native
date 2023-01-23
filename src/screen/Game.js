import React, { useCallback, useEffect, useState } from 'react'
import { View, Alert, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Row } from '../components/layout/bootstrap_like'
import { C_CARDS_LIST, S_CARDS_LIST, H_CARDS_LIST, D_CARDS_LIST } from '../constants'
import { getScreenHeight, shuffleArray } from '../utils/utils'
import FlipCard from '../components/FlipCard'


const AVAILABLE_DECKS = {
  C: C_CARDS_LIST,
  S: S_CARDS_LIST,
  H: H_CARDS_LIST,
  D: D_CARDS_LIST,
}

const Game = ({ navigation, route }) => {
  const initialFlipDuration = 100
  const [flipDuration, setFlipDuration] = useState(initialFlipDuration)
  const [startAnimationFinished, setStartAnimationFinished] = useState(false)
  const [alreadyAnimated, setAlreadyAnimated] = useState(null)
  const [firstSelectedCard, setFirstSelectedCard] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [matches, setMatches] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const currentDeck = (AVAILABLE_DECKS[route.params?.deckLetter] ?? []).slice(0, (route.params.dificultyLevel ?? 26) / 2)
  const [displayDeck, setDisplayDeck] = useState([])

  console.log('parent re-render')

  const setUpGame = () => {
    setAttempts(0)
    setMatches(0)
    setSelectedIndex(null)
    setAlreadyAnimated(false)
    setFlipDuration(initialFlipDuration)
    if (currentDeck.length == 0) {
      return
    }
    const deck = [...currentDeck, ...currentDeck]
    const shuffledDeck = shuffleArray(deck)
    setDisplayDeck(shuffledDeck.map((source, index) => ({
      source,
      isFound: false,
      isFlipped: false,
      key: index
    })))
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


  const animateStartGame = async (incomingIndex) => {
    var index = incomingIndex
    flipCard(index)
    setTimeout(() => {
      index++
      if (index <= displayDeck.length) {
        animateStartGame(index)
      } else {
        setStartAnimationFinished(true)
        setFlipDuration(700)
      }
    }, flipDuration)
  }

  /**
   * @param {Integer} index indice da carta para flipar
   * @returns uma nova lista de cartas com a carta específica flipada
   */
  const flipCard = (index) => {
    const newDeck = displayDeck.map(
      (card, cardIndex) => index == cardIndex
        ? { ...card, isFlipped: true }
        : card
    )
    setDisplayDeck(newDeck)
    return newDeck
  }


  // responsável por setar as cartas selecionadas
  const handleCardSelected = (index) => {
    const selectedCard = { cardData: displayDeck[index], index }
    if (firstSelectedCard == null) {
      setFirstSelectedCard(selectedCard)
      flipCard(index)
      setTimeout(() => { setSelectedIndex(null) }, 500)
    } else if (selectedCard.cardData.key != firstSelectedCard.cardData.key) {
      const newDeck = flipCard(index)
      verifyMatch(firstSelectedCard, selectedCard, newDeck)
    }
  }


  const markSelectedCardsAsFoundAndUnflipNotFoundCards = (deck, foundIndexes) => {
    setDisplayDeck(deck.map(
      (card, index) =>
        foundIndexes.includes(index)
          ? { ...card, isFound: true }
          : { ...card, isFlipped: card.isFound }
    ))
    setTimeout(() => {
      setSelectedIndex(null)
    }, flipDuration)
  }


  // este é reponsável por verificar se houve match nas cartas selecionadas
  const verifyMatch = (iFirstSelectedCard, currentSelectedCard, newDeck) => {
    setAttempts(p => p + 1)
    if (iFirstSelectedCard.cardData.source == currentSelectedCard.cardData.source) {
      setMatches(p => p + 1)
      markSelectedCardsAsFoundAndUnflipNotFoundCards(
        newDeck, [iFirstSelectedCard.index, currentSelectedCard.index]
      )
    } else {
      setTimeout(() => {
        markSelectedCardsAsFoundAndUnflipNotFoundCards(newDeck, [])
      }, 500)
    }
    setFirstSelectedCard(null)
  }


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
            { text: 'Escolher Naipe', onPress: () => navigation.goBack('Escolher Naipe') }
          ]
        )
      }, 500)
    }
  }, [matches])


  const handleSelected = (index)=>{
    console.log('clicado' ,index)
    // if (selectedIndex != null && startAnimationFinished) {
    //   return
    // }
    setSelectedIndex(index)
    handleCardSelected(index)
  }


  const handleClickCallback = useCallback((index) => {
    handleSelected(index)
  }, [displayDeck])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View>
        <Row flexWrap='wrap'>
          {displayDeck?.map((card, index) => (
            <FlipCard
              isFlipped={card.isFlipped == true || card.isFound == true}
              source={card.source}
              key={card.key}
              index={index}
              flipDuration={flipDuration}
              onPress={handleClickCallback}
            />
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