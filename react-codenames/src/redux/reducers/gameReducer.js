import WordCard from "../../components/BoardGame/GameBoard/WordCard/WordCard";
import React from "react";
import {useDispatch} from "react-redux";

const initialState = {
    cards: {
        red: 9,
        blue: 8,
        grey: 7,
        black: 1
    },
    gameOver: false,
    gameOverTrigger: '',
    redTurn: true,
    spymaster: false,
    gameCode: '',
    words: [
        'Anglie', 'Nemecko', 'Francie', 'Amerika', 'Afrika',
        'Pilot', 'Psycholog', 'Podkova', 'Boty', 'Rukavice',
        'Šála', 'Stůl', 'Židle', 'Skříň', 'Svetr',
        'Postel', 'Vlk', 'Slon', 'Pes', 'Kočka',
        'Tank', 'Hora', 'Pošta', 'Karta', 'Planeta'
    ],
}
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
    let randomizedWords = [];
    randomizedWords.push(colorRandomWords(words, 9, 'red'));
    randomizedWords.push(colorRandomWords(words, 8, 'blue'));
    randomizedWords.push(colorRandomWords(words, 7, 'grey'));
    randomizedWords.push(colorRandomWords(words, 1, 'black'));
    return shuffleWords(randomizedWords.reduce((previousValue, currentValue) => [...previousValue, ...currentValue]));
};

const randomizeGameBoard = (customWords, baseWords) => {
    return  randomizeBoard(pickRandomWords([...baseWords,...customWords]));
};

const gameReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case 'DECREMENT_COUNTER':
            return {
                ...state,
                cards: {
                    ...state.cards,
                [payload]: state.cards[payload] - 1
                }
            }
        case 'PASS_TURN':
            return {
                ...state,
                redTurn: !state.redTurn
            }
        case 'END_GAME':
            return {
                ...state,
                gameOver: true,
                gameOverTrigger: action.payload
            }
        case 'NEW_GAME':
            return {
                ...state,
                gameOver: false,
                words: [...state.words,...payload.customWords],
                gameCode: payload.gameCode
                /*
                    heres gonna be thunk getting basic words from firebase
                 */
            }
        case 'SWITCH_VIEW':
            return {
                ...state,
                spymaster: !state.spymaster
            }
        default:
            return state
    }
}
export default gameReducer;