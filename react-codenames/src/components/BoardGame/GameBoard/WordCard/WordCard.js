import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {decrementCounter, passTurn} from "../../../../redux/actions/actions";


const useStyles = makeStyles({
    root:{
        width:'20%',
        height: 'auto',
    },
    card_hidden: {
        width: 150,
        backgroundColor: "whitesmoke",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        color: "black",
    },
    card_spymaster: {
        width: 150,
        backgroundColor: "whitesmoke",
        borderStyle: "dashed",
        borderColor: props => props.wordColor,
        borderWidth: 4,
        color: "black",
    },
    card_shown: {
        width: 150,
        backgroundColor: "lightgray",
        borderStyle: "solid",
        borderColor: props => props.wordColor,
        borderWidth: 4,
        '& p': {
        color: props => props.wordColor
        },
    },


});

const WordCard = props => {
    const dispatch = useDispatch();
    const {word, index} = props;
    const classes = useStyles(props);
    const [clicked, setShown] = useState(false);
    const {gameOver,spymaster, redTurn} = useSelector(state => state);
    const handleWordClick = () => {
        setShown(true);
        dispatch(decrementCounter(props.wordColor))
        if (redTurn && (props.wordColor === 'blue' || props.wordColor === 'grey')) {
            dispatch(passTurn());
        }
        if (!redTurn && (props.wordColor === 'red' || props.wordColor === 'grey')) {
            dispatch(passTurn());
        }
    };
    useEffect(() => {
        if (gameOver) {
            setShown(true);
        }
    }, [gameOver, setShown]);

    const switchVisuals = () => {
       if (shown) {
           return classes.card_shown;
       }
       if (spymaster) {
           return classes.card_spymaster;
       }
       return classes.card_hidden;
    };


    const shown = clicked || gameOver;
    return (
        <Grid item key={index} className={classes.root}>
            <Button disabled={shown} onClick={handleWordClick}>
                <Card className={switchVisuals()} variant="outlined">
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