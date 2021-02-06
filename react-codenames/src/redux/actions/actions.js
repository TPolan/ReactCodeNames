import {projectFirestore} from "../../firebase/config";
import axios from 'axios'

const gameRef = projectFirestore.collection('Games')

export const createNewGame = payload => {
    const collectionReference = projectFirestore.collection('Games')
    return (dispatch, getState) => {
        const initialState = getState();
        const combineWordPool = () => {
            if (payload.customWords[0] !== '') {
                return [...initialState.words, ...payload.customWords]
            }
            return [...initialState.words]
        };
        const combinedWordPool = combineWordPool();
        const board = randomizeBoard(combinedWordPool);
        const updatedPayload =
            {
                ...initialState,
                words: combinedWordPool,
                gameCode: payload.gameCode,
                wordMap: board
            }

        collectionReference.add(updatedPayload)
            .then((docRef) => {
                    dispatch({
                        type: 'NEW_GAME',
                        payload: {
                            documentId: docRef.id,
                            redirect: '/game',
                            words: combinedWordPool,
                            gameCode: payload.gameCode,
                            gameOver: false,
                            gameOverTrigger: '',
                            wordMap: board,
                        }
                    });
                }
            );
    }
};

export const passTurn = () => {
    return (dispatch, getState) => {
        const {documentId, redTurn} = getState();
        gameRef.doc(documentId).update({redTurn: !redTurn});
    }

}

export const closeLobby = () => {
    return (dispatch, getState) => {
        const {documentId} = getState();
        gameRef.doc(documentId).delete()
            .then(dispatch({type: 'CLOSE_LOBBY'}));
    }
};

export const updateState = payload => {
    delete payload.spymaster
    delete payload.documentId
    delete payload.redirect

    return {
        type: 'UPDATE_STATE',
        payload: {
            ...payload
        }
    }
};

export const decrementCounter = payload => {
    return (dispatch, getState) => {
        const {documentId} = getState();
        gameRef.doc(documentId).update({
            cards: {
                ...getState().cards,
                [payload.color]: getState().cards[payload.color] - 1
            }
        });
    }
};

export const updateWordMap = payload => {
    return (dispatch, getState) => {
        const updateWord = () => {
            return getState().wordMap.map((word, index) => {
                if (index === payload.index) {
                    word.isShown = true
                }
                return word;
            })

        };
        const {documentId} = getState();
        gameRef.doc(documentId).update({
            wordMap: updateWord()
        });
    }
};

export const switchView = () => {
    return {
        type: 'SWITCH_VIEW'
    }
};

export const endGame = triggerType => {
    return (dispatch, getState) => {
        axios.patch(`https://reactcodenames-7a986.firebaseio.com/${getState().gameCode}.json`, {
            gameOverTrigger: triggerType,
            gameOver: true
        })
            .then(dispatch({
                type: 'END_GAME',
                payload: triggerType
            }))
    }
};

export const joinGame = payload => {
    return dispatch => {
        const {gameCode} = payload;
        axios.get(`https://reactcodenames-7a986.firebaseio.com/${gameCode}.json`)
            .then(response => {
                dispatch({
                    type: 'JOIN_GAME',
                    payload: {
                        ...response.data
                    }
                })
            })
    }
};

export const checkGameStatus = payload => {
    return (dispatch) => {
        axios.get(`https://reactcodenames-7a986.firebaseio.com/${payload.gameCode}.json`)
            .then(response => {
                    if (response.data) {
                        dispatch(joinGame(payload))
                    } else {
                        dispatch(createNewGame(payload))
                    }
                }
            )
            .catch(error => console.log(error))
    }
};

export const restartGame = () => {
    return (dispatch, getState) => {
        const {words, gameCode} = getState();
        const board = randomizeBoard(words);
        const updatedPayload =
            {
                gameOver: false,
                redTurn: true,
                gameOverTrigger: '',
                cards: {
                    red: 9,
                    blue: 8,
                    grey: 7,
                    black: 1
                },
                wordMap: board
            }
        axios.put(`https://reactcodenames-7a986.firebaseio.com/${gameCode}.json`, updatedPayload)
            .then(() => {
                    dispatch({
                        type: 'RESTART_GAME',
                        payload: {
                            wordMap: board,
                        }
                    });
                }
            );
    }
};
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
                word: randWord[0],
                color: wordColor,
                isShown: false
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
const randomizeBoard = words => {
    let randomWords = pickRandomWords([...words]);
    let randomizedColoredWords = [];
    randomizedColoredWords.push(colorRandomWords(randomWords, 9, 'red'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 8, 'blue'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 7, 'grey'));
    randomizedColoredWords.push(colorRandomWords(randomWords, 1, 'black'));
    return shuffleWords(randomizedColoredWords.reduce((previousValue, currentValue) => [...previousValue, ...currentValue]));
}
