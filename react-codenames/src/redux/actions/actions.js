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

const colorRandomWords = (words, wordCount, wordColor) => {
    let coloredWords = [];
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        let randWord = words.splice(randomIndex, 1)
        coloredWords.push(
            {
                wordIndex: randomIndex,
                component: <WordCard
                    word={randWord[0]}
                    wordColor={wordColor}
                    index={randomIndex}
                />
            }
        )
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
    let randomWords = pickRandomWords(words);
    let randomizedColoredWords = [];
    randomizedColoredWords.push(colorRandomWords(randomWords, 9, 'red'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 8, 'blue'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 7, 'grey'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 1, 'black'));
    const shuffledRandColoredWords = shuffleWords(randomizedColoredWords.reduce((previousValue, currentValue) => [...previousValue, ...currentValue]));
    const wordMap = shuffledRandColoredWords.map((item, index) => {
        return {
            boardIndex: index,
            isShown: false
        }
    });
    const board = shuffledRandColoredWords.map(item => {
        return item.component
    });
    return {wordMap, board};
};

export const decrementCounter = payload => {
    return (dispatch, getState) => {
        const updatedCardCount = {
            cards: {
                ...getState().cards,
                [payload.color]: getState().cards[payload.color] -1
            }
        }
        axios.patch(`https://reactcodenames-7a986.firebaseio.com/${getState().gameCode}.json`, updatedCardCount)
            .then(dispatch(    {
                type: 'DECREMENT_COUNTER',
                payload: {...updatedCardCount}
            }))
    }
};

export const updateWordMap = payload => {
    return (dispatch, getState) => {
        const updatedWordMap = {
            wordMap: [
                ...getState().wordMap,

            ],
        }
        axios.patch(`https://reactcodenames-7a986.firebaseio.com/${getState().gameCode}/wordMap/${1}.json`, true)
            .then(dispatch(    {
                type: 'UPDATE_WORDMAP',
                payload: {...updatedWordMap}
            }))
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

export const createNewGame = (payload = {}) => {
    return (dispatch, getState) => {
        const initialState = getState();
        const combineWordPool = () => {
            if (payload.customWords) {
                return [...initialState.words, ...payload.customWords]
            }
            return [...initialState.words]
        };
        const combinedWordPool = combineWordPool();
        const {wordMap, board} = randomizeBoard(combinedWordPool);
        const updatedPayload =
            {
                ...initialState,
                words:combinedWordPool,
                gameCode: payload.gameCode,
                wordMap: wordMap

            }
        axios.put(`https://reactcodenames-7a986.firebaseio.com/${payload.gameCode}.json`, updatedPayload)
            .then(response => {
                    console.log(response);
                    dispatch({
                        type: 'NEW_GAME',
                        payload: {
                            words: combinedWordPool,
                            gameCode: payload.gameCode,
                            gameOver: false,
                            gameOverTrigger: '',
                            board: board,
                            wordMap: wordMap,
                        }
                    });
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
