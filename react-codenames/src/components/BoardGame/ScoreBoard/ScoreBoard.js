import React, {useEffect} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {endGame} from "../../../redux/actions/actions";

const ScoreBoard = () => {
    const {gameCode, redTurn} = useSelector(state => state)
    const {red, blue, grey, black} = useSelector(state => state.cards);
    const dispatch = useDispatch();

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
    }, [red, blue, black, dispatch, redTurn])


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
                    <Grid container >
                        <Typography item style={{color:'red',padding:8}} variant={"h3"}>
                             Red Turn
                        </Typography>
                        <Typography item style={{color:'blue',padding:8}} variant={"h6"}>
                             Blue Turn
                        </Typography>
                    </Grid> :
                    <Grid container>
                        <Typography item style={{color:'red',padding:8}} variant={"h6"}>
                            Red Turn
                        </Typography>
                        <Typography item style={{color:'blue',padding:8}} variant={"h3"}>
                            Blue Turn
                        </Typography>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

export default ScoreBoard;
