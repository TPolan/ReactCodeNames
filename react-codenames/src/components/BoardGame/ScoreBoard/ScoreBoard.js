import React, {useEffect} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {endGame} from "../../../redux/actions/actions";


const ScoreBoard = () => {
    const {gameCode, redTurn} = useSelector(state => state)
    const {red, blue, grey, black} = useSelector(state => state.cards);
    const dispatch = useDispatch();


    // const combineClasses = (colorClass, highlight) => `classes.root classes.${colorClass} classes.${highlight}`;

    useEffect(() => {
        if (red === 0) {
            dispatch(endGame('red'));
        }
        if (blue === 0) {
            dispatch(endGame('blue'));
        }
        if (black === 0) {
            dispatch(endGame('black'));
        }
        if (redTurn) {

        }

    }, [red, blue, black, dispatch])


    return (
        <Grid container justify={"center"}>
            <Typography variant={'h2'} >Game code: {gameCode}</Typography>
            <Grid item container justify={"space-around"}>
                <Typography item style={{color: 'red'}} variant={"h2"}>
                    {red}
                </Typography>
                <Typography item style={{color: 'grey'}} variant={"h2"}>
                    {grey}
                </Typography>
                <Typography item style={{color: 'blue'}} variant={"h2"}>
                    {blue}
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
