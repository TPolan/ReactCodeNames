import React from 'react';
import {Grid} from "@material-ui/core";
import WordCard from "./WordCard/WordCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {},
    title: {
        fontSize: 20,
    },
});

const GameBoard = () => {

    const words = ['Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder', 'Placeholder']
    const classes = useStyles();

    const wordsMap = words.map(
        (word, index) =>
            <WordCard
                word={word}
                wordColor={'red'}
                index={index}
            />
    )
    return (
        <Grid className={classes.root} container justify={"center"}>
            {wordsMap}
        </Grid>
    )
}

export default GameBoard;