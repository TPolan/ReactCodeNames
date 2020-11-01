import React, {useEffect} from 'react';
import {Container} from "@material-ui/core";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import ControlPanel from "./ControlPanel/ControlPanel";
import WordCard from "./GameBoard/WordCard/WordCard";
import {useSelector} from "react-redux";

const BoardGame = () => {
    const {customWords, defaultWords} = useSelector(state => state);
    const pickRandomWords = (wordPool) => {
        const randomWords = [];
        for (let i = 0; i < 25; i++) {
            const randomIndex = Math.floor(Math.random() * wordPool.length);
            let randomWord = wordPool.splice(randomIndex, 1)
            randomWords.push(randomWord)
        }
        return randomWords;
    };
    const words = pickRandomWords([...customWords, ...defaultWords]);

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

    const gameBoard = randomizeBoard(words);

    return (
        <Container fixed>
            <ScoreBoard/>
            <GameBoard board={gameBoard}/>
            <ControlPanel/>
        </Container>
    )
};

export default BoardGame;