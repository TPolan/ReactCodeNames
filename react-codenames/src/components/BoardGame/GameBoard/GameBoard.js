import React from 'react';
import {Grid} from "@material-ui/core";
import WordCard from "./WordCard/WordCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '80%',
        height: '70%'

    }
});

const GameBoard = () => {

    const classes = useStyles();
    const words = ['Placeholder1', 'Placeholder2', 'Placeholder3', 'Placeholder4', 'Placeholder5', 'Placeholder6', 'Placeholder7', 'Placeholder8', 'Placeholder9', 'Placeholder10', 'Placeholder11', 'Placeholder12', 'Placeholder13', 'Placeholder14', 'Placeholder15', 'Placeholder16', 'Placeholder17', 'Placeholder18', 'Placeholder19', 'Placeholder20', 'Placeholder21', 'Placeholder22', 'Placeholder23', 'Placeholder24', 'Placeholder25']
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
    }

    const randomizeBoard = (words) => {
        let randomizedWords = [];
        randomizedWords.push(colorRandomWords(words, 9, 'red'));
        randomizedWords.push(colorRandomWords(words, 8, 'blue'));
        randomizedWords.push(colorRandomWords(words, 7, 'grey'));
        randomizedWords.push(colorRandomWords(words, 1, 'purple'));
        return shuffleWords(randomizedWords.reduce((previousValue, currentValue) => [...previousValue, ...currentValue]));
    }
    const gameBoard = randomizeBoard(words);
    return (
        <Grid className={classes.root} direction={"row"} container justify={"space-between"}>
            {gameBoard}
        </Grid>
    )
}

export default GameBoard;