import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {endGame} from "../../../redux/actions/actions";

const useStyles = makeStyles({
    Teams: {

    }
});


const ScoreBoard = props => {

    const redCounter = useSelector(state => state.cards.red);
    const blueCounter = useSelector(state => state.cards.blue);
    const citizenCounter = useSelector(state => state.cards.grey);
    const blackCounter = useSelector(state => state.cards.black);
    const dispatch = useDispatch();
    const redTurn = useSelector(state => state.redTurn);

    // const combineClasses = (colorClass, highlight) => `classes.root classes.${colorClass} classes.${highlight}`;

    useEffect(() => {

        const openDialog = triggerType => {
            dispatch(endGame(triggerType));
        }
        if (redCounter === 0) {
            openDialog('red');
        }
        if (blueCounter === 0) {
            openDialog('blue');
        }
        if (blackCounter === 0) {
            openDialog('black');
        }

    }, [redCounter, blueCounter, blackCounter])


    return (
        <Grid container justify={"center"}>
            <Grid item container justify={"space-around"}>
                <Typography item style={{color: 'red'}} variant={"h2"}>
                    {redCounter}
                </Typography>
                <Typography item style={{color: 'grey'}} variant={"h2"}>
                    {citizenCounter}
                </Typography>
                <Typography item style={{color: 'blue'}} variant={"h2"}>
                    {blueCounter}
                </Typography>
            </Grid>
            <Grid item>
                {redTurn ?
                    <>
                        <Typography style={{color:'red'}} variant={"h3"}>
                            Team Red
                        </Typography>
                        <Typography style={{color:'blue'}} variant={"h6"}>
                            Team Blue
                        </Typography>
                    </> :
                    <>
                        <Typography style={{color:'red'}} variant={"h6"}>
                            Team Red
                        </Typography>
                        <Typography style={{color:'blue'}} variant={"h3"}>
                            Team Blue
                        </Typography>
                    </>
                }
            </Grid>
        </Grid>
    )
}

export default ScoreBoard;