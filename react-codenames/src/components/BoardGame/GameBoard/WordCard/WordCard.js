import React from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {decrementCounter, passTurn, updateWordMap} from "../../../../redux/actions/actions";


const useStyles = makeStyles({
    root: {
        width: '20%',
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
        borderColor: props => props.color,
        borderWidth: 4,
        color: "black",
    },
    card_shown: {
        width: 150,
        backgroundColor: "lightgray",
        borderStyle: "solid",
        borderColor: props => props.color,
        borderWidth: 4,
        '& p': {
            color: props => props.color
        },
    },


});

const WordCard = props => {
    const dispatch = useDispatch();
    const {word, index, color} = props;
    const classes = useStyles(props);
    const {gameOver, spymaster, redTurn} = useSelector(state => state);
    const handleWordClick = () => {
        dispatch(decrementCounter({
            color: color,
        }));
        dispatch(updateWordMap(
            {index: index}
        ));
        if (redTurn && (color === 'blue' || color === 'grey')) {
            dispatch(passTurn());
        }
        if (!redTurn && (color === 'red' || color === 'grey')) {
            dispatch(passTurn());
        }
    };

    const shown = props.isShown || gameOver;
    const switchVisuals = () => {
        if (shown) {
            return classes.card_shown;
        }
        if (spymaster) {
            return classes.card_spymaster;
        }
        return classes.card_hidden;


    };
    return (
        <Grid item key={index} className={classes.root}>
            <Button disabled={shown || spymaster} onClick={handleWordClick}>
                <Card className={switchVisuals()} variant="outlined">
                    <CardContent>
                        <Typography
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