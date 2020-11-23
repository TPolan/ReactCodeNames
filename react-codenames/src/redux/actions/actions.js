import axios from "axios";
import WordCard from "../../components/BoardGame/GameBoard/WordCard/WordCard";
import React from "react";

const pickRandomWords = (wordPool) => {
    const randomWords = [];
    for (let i = 0; i < 25; i++) {
        const randomIndex = Math.floor(Math.random() * wordPool.length);
        let randomWord = wordPool.splice(randomIndex, 1)
        randomWords.push(...randomWord)
    }
    return randomWords;
};

const createWordMap = () => {
    let wordMap = [];
    for (let i = 0; i < 25; i++) {
        wordMap.push({
            index: i,
            isShown: false
        })
    }
    return wordMap;
};

const colorRandomWords = (words, wordCount, wordColor) => {
    let coloredWords = [];
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        let randWord = words.splice(randomIndex, 1)
        coloredWords.push(
            <WordCard
                word={randWord[0]}
                wordColor={wordColor}
                index={randomIndex}
            />)
    }
    return coloredWords;
}

const shuffleWords = (words) => {
    for (let i = words.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = words[i];
        words[i] = words[j];
        words[j] = temp;
    }
    return words;
};

const randomizeBoard = (words) => {
    let randomWords = pickRandomWords(words)
    let randomizedColoredWords = [];
    randomizedColoredWords.push(colorRandomWords(randomWords, 9, 'red'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 8, 'blue'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 7, 'grey'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 1, 'black'));
    return shuffleWords(randomizedColoredWords.reduce((previousValue, currentValue) => [...previousValue, ...currentValue]));
};

export const decrementCounter = cardType => {
    return {
        type: 'DECREMENT_COUNTER',
        payload: cardType
    }
};

export const switchView = () => {
    return {
        type: 'SWITCH_VIEW'
    }
};

export const endGame = triggerType => {
    return {
        type: 'END_GAME',
        payload: triggerType
    }
};


export const newGame = (payload) => {
    return {
        type: 'NEW_GAME',
        payload: {
            gameOver: false,
            gameOverTrigger: '',
            gameCode: payload.gameCode,
            randomizedGameBoard: randomizeBoard(payload.words),
            words: payload.words,
            wordMap: createWordMap(),
        }
    }
};

export const createNewGame = (payload) => {
    return (dispatch, getState) => {
        const initialState = getState();
        const updatedPayload =
            {
                ...initialState,
                words: [...initialState.words, ...payload.customWords],
                gameCode: payload.gameCode,
                wordMap: createWordMap()

            }
        axios.put(`https://reactcodenames-7a986.firebaseio.com/${payload.gameCode}.json`, updatedPayload)
            .then(response => {
                    console.log(response);
                    dispatch(newGame({
                        words: [...initialState.words, ...payload.customWords],
                        gameCode: payload.gameCode,
                    }));
                }
            );
    }
};

export const passTurn = () => {
    return (dispatch, getState) => {
        axios.patch(`https://reactcodenames-7a986.firebaseio.com/${getState().gameCode}.json`, {redTurn: !getState().redTurn})
            .then(dispatch({type: 'PASS_TURN'}))
    }

}
export const closeLobby = () => {
    return (dispatch, getState) => {
        axios.delete(`https://reactcodenames-7a986.firebaseio.com/${getState().gameCode}.json`,)
            .then(dispatch({type: 'CLOSE_LOBBY'}))
    }
};
