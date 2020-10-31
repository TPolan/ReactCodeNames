import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {decrementCounter} from "../../../../redux/actions/actions";

const useStyles = makeStyles({
    root: {
        width: '18%',
        Height: 65,
        flexGrow: 1
    },
    border_hidden: {
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundColor: 'rgb(217,202,202)'
    },
    border_shown: {
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: props => props.wordColor,
        backgroundColor: "brown"
    },

    title_hidden: {
        fontSize: '0.8rem',
        color: "black"
    },
    title_shown: {
        fontSize: 20,
        color: props => props.wordColor
    },
});

const WordCard = props => {

    const dispatch = useDispatch();

    const {word, index} = props;
    const classes = useStyles(props);
    const [clicked, setShown] = useState(false);
    const gameOver = useSelector(state => state.gameOver);
    const spymasterViewOn = useSelector(state => state.spymaster);
    const handleWordClick = () => {
        setShown(true);
        dispatch(decrementCounter(props.wordColor))
    };
    useEffect(() => {
        if (gameOver) {
            setShown(true);
        }
    }, [gameOver, setShown]);
    const shown = clicked || gameOver || spymasterViewOn;
    return (
        <Grid item className={classes.root} key={`${word + index}`}>
            <Button disabled={shown} onClick={handleWordClick}>
                <Card className={shown ? classes.border_shown : classes.border_hidden} variant="outlined">
                    <CardContent>
                        <Typography
                            className={shown ? classes.title_shown : classes.title_hidden}
                            color="textSecondary"
                            gutterBottom
                        >
                            {word}
                        </Typography>
                    </CardContent>
                </Card>
            </Button>
        </Grid>
    )
};

export default WordCard;