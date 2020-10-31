import React from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import GameEndDialog from "./GameEndDialog/GameEndDialog";

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