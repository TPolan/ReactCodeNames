import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import GameEndDialog from "./GameEndDialog/GameEndDialog";
import {useDispatch, useSelector} from "react-redux";
import {endGame} from "../../../redux/actions/actions";

const useStyles = makeStyles({
    root: {
        width: '80%',
        height: '70%'

    }
});

const GameBoard = props => {
    const classes = useStyles();



    return (
        <Grid className={classes.root} direction={"row"} container justify={"space-between"}>
            {props.board}
            <GameEndDialog/>
        </Grid>
    )
}

export default GameBoard;